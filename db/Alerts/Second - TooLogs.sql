--Alerta para Crecimiento de log de Transacciones

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
IF EXISTS (SELECT * FROM sys.messages WHERE message_id = 911422)
BEGIN
    EXEC sp_dropmessage @msgnum = 911422;
END
GO

-- Crear mensaje de error personalizado
EXEC sp_addmessage
    @msgnum = 911422,
    @severity = 1,
    @msgtext = N'El log de transacciones en la base de datos %s está al %s%% de uso. Detalles: %s.',
    @lang = 'us_english'
GO

-- Crear procedimiento almacenado para monitorear el crecimiento del log de transacciones
CREATE OR ALTER PROCEDURE sp_MonitorTransactionLogGrowth2
    @LogUsageThresholdPercent INT = 80,  -- Umbral para uso del log (%)
    @Recipients NVARCHAR(255) = 'christopher.robles@estudiante.edu.do',  -- Cambia el correo
    @ProfileName NVARCHAR(255) = 'SQLServerProfile'  -- Nombre del perfil de Database Mail
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @AlertMessage NVARCHAR(MAX) = '';
    DECLARE @MailSubject NVARCHAR(255);
    DECLARE @DatabaseName NVARCHAR(128);
    DECLARE @LogUsagePercent DECIMAL(5,2);
    DECLARE @FreeSpaceMB DECIMAL(10,2);
    DECLARE @TotalSpaceMB DECIMAL(10,2);
    DECLARE @ErrorLog NVARCHAR(MAX) = '';

    -- Cursor para recorrer las bases de datos con logs de transacciones
    DECLARE LogCursor CURSOR LOCAL FAST_FORWARD FOR
    SELECT DB_NAME(database_id) AS DatabaseName,
           (CAST(FILEPROPERTY(name, 'SpaceUsed') AS DECIMAL(10,2)) * 8 / 1024) AS UsedMB,
           (CAST(size AS DECIMAL(10,2)) * 8 / 1024) AS TotalMB,
           (CAST(FILEPROPERTY(name, 'SpaceUsed') AS DECIMAL(10,2)) * 100.0 / size) AS LogUsagePercent
    FROM sys.master_files
    WHERE type_desc = 'LOG';  -- Solo archivos de log (.ldf)

    OPEN LogCursor;
    FETCH NEXT FROM LogCursor INTO @DatabaseName, @FreeSpaceMB, @TotalSpaceMB, @LogUsagePercent;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        IF @LogUsagePercent >= @LogUsageThresholdPercent
        BEGIN
            SET @AlertMessage += 'Base de datos ' + @DatabaseName +
                                ' tiene el log de transacciones al ' +
                                CAST(@LogUsagePercent AS NVARCHAR(10)) + '% (' +
                                CAST(@FreeSpaceMB AS NVARCHAR(20)) + ' MB usados de ' +
                                CAST(@TotalSpaceMB AS NVARCHAR(20)) + ' MB totales). ';
        END
        FETCH NEXT FROM LogCursor INTO @DatabaseName, @FreeSpaceMB, @TotalSpaceMB, @LogUsagePercent;
    END;

    CLOSE LogCursor;
    DEALLOCATE LogCursor;

    -- Si hay problemas, generar alerta
    IF @AlertMessage <> ''
    BEGIN
        SET @MailSubject = 'Alerta: Crecimiento excesivo del log de transacciones en ' + @@SERVERNAME;
        SET @AlertMessage = @AlertMessage + CHAR(13) + CHAR(10) +
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

        -- Generar error para disparar la alerta con conversión explícita
        BEGIN TRY
            DECLARE @LogUsagePercentStr NVARCHAR(10);
            SET @LogUsagePercentStr = CAST(@LogUsagePercent AS NVARCHAR(10));
            RAISERROR (911422, 1, 1, @DatabaseName, @LogUsagePercentStr, @AlertMessage);
        END TRY
        BEGIN CATCH
            SET @ErrorLog += 'Error en RAISERROR: ' + ERROR_MESSAGE() + CHAR(13) + CHAR(10);
            SET @AlertMessage += CHAR(13) + CHAR(10) + 'Error en la alerta: ' + ERROR_MESSAGE();
            -- Enviar correo de respaldo si falla RAISERROR
            EXEC msdb.dbo.sp_send_dbmail
                @profile_name = @ProfileName,
                @recipients = @Recipients,
                @subject = @MailSubject,
                @body = @AlertMessage;
        END CATCH
    END
END
GO

-- Crear operador para notificaciones
IF NOT EXISTS (SELECT * FROM msdb.dbo.sysoperators WHERE name = N'NotifyDBA')
BEGIN
    EXEC msdb.dbo.sp_add_operator
        @name = N'NotifyDBA',
        @enabled = 1,
        @email_address = N'christopher.robles@estudiante.edu.do'  -- cambia el correo
END
GO

-- Crear alerta basada en el mensaje de error
IF NOT EXISTS (SELECT * FROM msdb.dbo.sysalerts WHERE name = N'TransactionLogGrowthAlert')
BEGIN
    EXEC msdb.dbo.sp_add_alert
        @name = N'TransactionLogGrowthAlert',
        @message_id = 911422,
        @severity = 0,
        @enabled = 1,
        @delay_between_responses = 1800,  -- 30 minutos entre notificaciones
        @include_event_description_in = 0,
        @notification_message = N'Revisa el crecimiento del log de transacciones.'
END
GO

-- Asociar la alerta con el operador
IF NOT EXISTS (
    SELECT 1
    FROM msdb.dbo.sysnotifications n
    JOIN msdb.dbo.sysalerts a ON n.alert_id = a.id
    WHERE a.name = N'TransactionLogGrowthAlert'
)
BEGIN
    EXEC msdb.dbo.sp_add_notification
        @alert_name = N'TransactionLogGrowthAlert',
        @operator_name = N'NotifyDBA',
        @notification_method = 1  -- Correo electrónico
END
GO