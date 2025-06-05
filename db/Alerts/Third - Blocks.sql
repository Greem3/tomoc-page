

--Alerta para Bloqueos Prolongados

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
IF EXISTS (SELECT * FROM sys.messages WHERE message_id = 911423)
BEGIN
    EXEC sp_dropmessage @msgnum = 911423;
END
GO

-- Crear mensaje de error personalizado
EXEC sp_addmessage
    @msgnum = 911423,
    @severity = 1,
    @msgtext = N'Se detectaron bloqueos prolongados en la base de datos %s. Detalles: %s.',
    @lang = 'us_english'
GO

-- Crear procedimiento almacenado para monitorear bloqueos prolongados
CREATE OR ALTER PROCEDURE sp_MonitorProlongedBlocks
    @BlockThresholdSeconds INT = 30,  -- Umbral para considerar un bloqueo prolongado (segundos)
    @Recipients NVARCHAR(255) = 'christopher.robles@estudiante.edu.do',  -- Cambia el correo
    @ProfileName NVARCHAR(255) = 'SQLServerProfile'  -- Nombre del perfil de Database Mail
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @AlertMessage NVARCHAR(MAX) = '';
    DECLARE @MailSubject NVARCHAR(255);
    DECLARE @DatabaseName NVARCHAR(128);
    DECLARE @BlockingSessionID INT;
    DECLARE @BlockedSessionID INT;
    DECLARE @WaitTimeSeconds INT;
    DECLARE @ErrorLog NVARCHAR(MAX) = '';

    -- Tabla temporal para almacenar información de bloqueos
    CREATE TABLE #BlockingInfo (
        DatabaseName NVARCHAR(128),
        BlockingSessionID INT,
        BlockedSessionID INT,
        WaitTimeSeconds INT,
        BlockingSQL NVARCHAR(MAX),
        BlockedSQL NVARCHAR(MAX)
    );

    -- Detectar bloqueos prolongados
    INSERT INTO #BlockingInfo (DatabaseName, BlockingSessionID, BlockedSessionID, WaitTimeSeconds, BlockingSQL, BlockedSQL)
    SELECT
        DB_NAME(er.database_id) AS DatabaseName,
        er.blocking_session_id AS BlockingSessionID,
        er.session_id AS BlockedSessionID,
        er.wait_time / 1000 AS WaitTimeSeconds,  -- Convertir milisegundos a segundos
        OBJECT_NAME(st1.objectid, st1.dbid) AS BlockingSQL,
        OBJECT_NAME(st2.objectid, st2.dbid) AS BlockedSQL
    FROM sys.dm_exec_requests er
    CROSS APPLY sys.dm_exec_sql_text(er.sql_handle) st1
    CROSS APPLY sys.dm_exec_sql_text((SELECT sql_handle FROM sys.dm_exec_requests WHERE session_id = er.blocking_session_id)) st2
    WHERE er.blocking_session_id > 0
    AND er.wait_time / 1000 >= @BlockThresholdSeconds;

    -- Generar mensaje de alerta si se encuentran bloqueos
    DECLARE BlockCursor CURSOR LOCAL FAST_FORWARD FOR
    SELECT DatabaseName, BlockingSessionID, BlockedSessionID, WaitTimeSeconds
    FROM #BlockingInfo;

    OPEN BlockCursor;
    FETCH NEXT FROM BlockCursor INTO @DatabaseName, @BlockingSessionID, @BlockedSessionID, @WaitTimeSeconds;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @AlertMessage += 'Bloqueo detectado en la base de datos ' + @DatabaseName + ': ' +
                            'Sesión bloqueante ID ' + CAST(@BlockingSessionID AS NVARCHAR(10)) +
                            ' está bloqueando la sesión ID ' + CAST(@BlockedSessionID AS NVARCHAR(10)) +
                            ' durante ' + CAST(@WaitTimeSeconds AS NVARCHAR(10)) + ' segundos. ';
        FETCH NEXT FROM BlockCursor INTO @DatabaseName, @BlockingSessionID, @BlockedSessionID, @WaitTimeSeconds;
    END;

    CLOSE BlockCursor;
    DEALLOCATE BlockCursor;

    DROP TABLE #BlockingInfo;

    -- Si hay bloqueos prolongados, generar alerta
    IF @AlertMessage <> ''
    BEGIN
        SET @MailSubject = 'Alerta: Bloqueos prolongados detectados en ' + @@SERVERNAME;
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

        -- Generar error para disparar la alerta
        BEGIN TRY
            RAISERROR (911423, 1, 1, @DatabaseName, @AlertMessage);
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
IF NOT EXISTS (SELECT * FROM msdb.dbo.sysalerts WHERE name = N'ProlongedBlocksAlert')
BEGIN
    EXEC msdb.dbo.sp_add_alert
        @name = N'ProlongedBlocksAlert',
        @message_id = 911423,
        @severity = 0,
        @enabled = 1,
        @delay_between_responses = 1800,  -- 30 minutos entre notificaciones
        @include_event_description_in = 0,
        @notification_message = N'Revisa los bloqueos prolongados en el servidor.'
END
GO

-- Asociar la alerta con el operador
IF NOT EXISTS (
    SELECT 1
    FROM msdb.dbo.sysnotifications n
    JOIN msdb.dbo.sysalerts a ON n.alert_id = a.id
    WHERE a.name = N'ProlongedBlocksAlert'
)
BEGIN
    EXEC msdb.dbo.sp_add_notification
        @alert_name = N'ProlongedBlocksAlert',
        @operator_name = N'NotifyDBA',
        @notification_method = 1  -- Correo electrónico
END
GO