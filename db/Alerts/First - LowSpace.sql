
--Alerta para bajo espacio en discos y archivos de datos

USE msdb
GO

-- Habilitar Database Mail si no está habilitado
IF NOT EXISTS (SELECT * FROM sys.configurations WHERE name = 'Database Mail XPs' AND value_in_use = 1)
BEGIN
    EXEC sp_configure 'show advanced options', 1;
    RECONFIGURE;
    EXEC sp_configure 'Database Mail XPs', 1;
    RECONFIGURE;
END
GO

-- Eliminar mensaje de error si ya existe
IF EXISTS (SELECT * FROM sys.messages WHERE message_id = 911421)
BEGIN
    EXEC sp_dropmessage @msgnum = 911421;
END
GO

-- Crear mensaje de error personalizado
EXEC sp_addmessage
    @msgnum = 911421,
    @severity = 1,
    @msgtext = N'El espacio en disco o archivos de datos está bajo en la base de datos %s. Detalles: %s.',
    @lang = 'us_english'
GO

-- Crear procedimiento almacenado para monitorear espacio en disco y archivos de datos
CREATE OR ALTER PROCEDURE sp_MonitorDiskAndDataFiles
    @DiskThresholdPercent INT = 10,  -- Umbral para espacio en disco (%)
    @DataFileThresholdPercent INT = 20,  -- Umbral para archivos de datos (%)
    @Recipients NVARCHAR(255) = 'chritopher.robles@estudiante.edu.do',  -- Reemplazar con correo real
    @ProfileName NVARCHAR(255) = 'SQLServerProfile'  -- Nombre del perfil de Database Mail
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @AlertMessage NVARCHAR(MAX) = '';
    DECLARE @MailSubject NVARCHAR(255);
    DECLARE @DatabaseName NVARCHAR(128);
    DECLARE @FreeSpaceDetails NVARCHAR(MAX) = '';
    DECLARE @DiskFreePercent DECIMAL(5,2);
    DECLARE @DataFileFreePercent DECIMAL(5,2);
    DECLARE @ErrorLog NVARCHAR(MAX) = '';
    DECLARE @DriveLetter NVARCHAR(10);
    DECLARE @FreeMB BIGINT;
    DECLARE @TotalMB BIGINT;

    -- Tabla temporal para almacenar información de espacio en disco
    CREATE TABLE #DiskSpace (
        DriveLetter NVARCHAR(10),
        TotalMB BIGINT,
        FreeMB BIGINT
    );

    -- Obtener espacio libre en disco usando sys.dm_os_volume_stats
    BEGIN TRY
        INSERT INTO #DiskSpace (DriveLetter, TotalMB, FreeMB)
        SELECT DISTINCT
            LEFT(volume_mount_point, 1) AS DriveLetter,
            total_bytes / 1024 / 1024 AS TotalMB,
            available_bytes / 1024 / 1024 AS FreeMB
        FROM sys.master_files AS f
        CROSS APPLY sys.dm_os_volume_stats(f.database_id, f.file_id)
        WHERE f.type_desc IN ('ROWS', 'LOG');
    END TRY
    BEGIN CATCH
        SET @ErrorLog += 'Error al obtener espacio en disco: ' + ERROR_MESSAGE() + CHAR(13) + CHAR(10);
    END CATCH

    -- Verificar espacio en disco
    DECLARE DiskCursor CURSOR LOCAL FAST_FORWARD FOR
    SELECT DriveLetter, FreeMB, TotalMB
    FROM #DiskSpace;

    OPEN DiskCursor;
    FETCH NEXT FROM DiskCursor INTO @DriveLetter, @FreeMB, @TotalMB;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @DiskFreePercent = (@FreeMB * 100.0) / @TotalMB;

        IF @DiskFreePercent < @DiskThresholdPercent
        BEGIN
            SET @FreeSpaceDetails += 'Disco ' + @DriveLetter + ' tiene solo ' +
                                    CAST(@FreeMB AS NVARCHAR(20)) + ' MB libres de ' +
                                    CAST(@TotalMB AS NVARCHAR(20)) + ' MB (' +
                                    CAST(@DiskFreePercent AS NVARCHAR(10)) + '%). ';
        END
        FETCH NEXT FROM DiskCursor INTO @DriveLetter, @FreeMB, @TotalMB;
    END;

    CLOSE DiskCursor;
    DEALLOCATE DiskCursor;
    DROP TABLE #DiskSpace;

    -- Verificar espacio en archivos de datos
    DECLARE DataFileCursor CURSOR LOCAL FAST_FORWARD FOR
    SELECT DB_NAME(database_id) AS DatabaseName,
           (size - FILEPROPERTY(name, 'SpaceUsed')) * 8.0 / size * 100 AS FreePercent
    FROM sys.master_files
    WHERE type_desc = 'ROWS';  -- Solo archivos de datos (.mdf, .ndf)

    OPEN DataFileCursor;
    FETCH NEXT FROM DataFileCursor INTO @DatabaseName, @DataFileFreePercent;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        IF @DataFileFreePercent < @DataFileThresholdPercent
        BEGIN
            SET @FreeSpaceDetails += 'Base de datos ' + @DatabaseName +
                                    ' tiene archivos de datos con ' +
                                    CAST(@DataFileFreePercent AS NVARCHAR(10)) + '% libre. ';
        END
        FETCH NEXT FROM DataFileCursor INTO @DatabaseName, @DataFileFreePercent;
    END;

    CLOSE DataFileCursor;
    DEALLOCATE DataFileCursor;

    -- Si hay problemas, generar alerta
    IF @FreeSpaceDetails <> '' OR @ErrorLog <> ''
    BEGIN
        SET @MailSubject = 'Alerta: Bajo espacio en disco o archivos de datos en ' + @@SERVERNAME;
        SET @AlertMessage = @FreeSpaceDetails + CHAR(13) + CHAR(10) +
                            CASE WHEN @ErrorLog <> '' THEN 'Errores detectados: ' + @ErrorLog ELSE '' END;

        -- Enviar correo
        BEGIN TRY
            EXEC msdb.dbo.sp_send_dbmail
                @profile_name = @ProfileName,
                @recipients = @Recipients,
                @subject = @MailSubject,
                @body = @AlertMessage;
        END TRY
        BEGIN CATCH
            SET @ErrorLog += 'Error al enviar correo: ' + ERROR_MESSAGE() + CHAR(13) + CHAR(10);
            SET @AlertMessage += CHAR(13) + CHAR(10) + 'No se pudo enviar el correo: ' + ERROR_MESSAGE();
        END CATCH

        -- Generar error para disparar la alerta
        RAISERROR (911421, 1, 1, @DatabaseName, @AlertMessage);
    END
END
GO

-- Crear operador para notificaciones
IF NOT EXISTS (SELECT * FROM msdb.dbo.sysoperators WHERE name = N'NotifyDBA')
BEGIN
    EXEC msdb.dbo.sp_add_operator
        @name = N'NotifyDBA',
        @enabled = 1,
        @email_address = N'christopher.robles@estudiante.edu.do'  -- Reemplazar con correo real
END
GO

-- Crear alerta basada en el mensaje de error
IF NOT EXISTS (SELECT * FROM msdb.dbo.sysalerts WHERE name = N'LowDiskAndDataFileSpaceAlert')
BEGIN
    EXEC msdb.dbo.sp_add_alert
        @name = N'LowDiskAndDataFileSpaceAlert',
        @message_id = 911421,
        @severity = 0,
        @enabled = 1,
        @delay_between_responses = 1800,  -- 30 minutos entre notificaciones
        @include_event_description_in = 0,
        @notification_message = N'Revisa el espacio en disco y archivos de datos.'
END
GO

-- Asociar la alerta con el operador
IF NOT EXISTS (
    SELECT 1
    FROM msdb.dbo.sysnotifications n
    JOIN msdb.dbo.sysalerts a ON n.alert_id = a.id
    WHERE a.name = N'LowDiskAndDataFileSpaceAlert'
)
BEGIN
    EXEC msdb.dbo.sp_add_notification
        @alert_name = N'LowDiskAndDataFileSpaceAlert',
        @operator_name = N'NotifyDBA',
        @notification_method = 1  -- Correo electrónico
END
GO