-- Script para crear alerta de fallos en el motor SQL Server
-- Creado por: Estudiante de Base de Datos
-- Fecha: 19/05/2025

USE msdb
GO

-- Primero voy a crear un operador para recibir las notificaciones
-- Este operador recibirá los mensajes cuando ocurra un error
PRINT 'Creando operador para recibir alertas...'
-- EXEC msdb.dbo.sp_add_operator
--     @name = N'OperadorAlerta',
--     @enabled = 1,
--     @email_address = N'estudiante@universidad.edu',  -- Cambiar por tu email
--     @category_name = N'[Uncategorized]'
-- GO

-- Ahora voy a crear la alerta para detectar errores del motor SQL
-- Voy a usar el error 823 que es un error de I/O crítico
-- También el 824 y 825 que son errores de página
PRINT 'Creando alerta para error 823 (Error de I/O)...'
EXEC msdb.dbo.sp_add_alert
    @name = N'Alerta_Error_Motor_823',
    @message_id = 823,
    @severity = 0,
    @enabled = 1,
    @delay_between_responses = 60, -- espera 60 segundos entre alertas
    @include_event_description_in = 1, -- incluye descripción en email
    @job_id = NULL
GO

-- Asocio la alerta con el operador
--TODO: Operador por si no existe
PRINT 'Asociando alerta con operador...'
EXEC msdb.dbo.sp_add_notification
    @alert_name = N'Alerta_Error_Motor_823',
    @operator_name = N'OperadorAlerta',
    @notification_method = 1  -- 1 = email
GO

-- Creo otra alerta para el error 824 (Error de página)
PRINT 'Creando alerta para error 824 (Error de página)...'
EXEC msdb.dbo.sp_add_alert
    @name = N'Alerta_Error_Motor_824',
    @message_id = 824,
    @severity = 0,
    @enabled = 1,
    @delay_between_responses = 60,
    @include_event_description_in = 1,
    @job_id = NULL
GO

-- Asocio la alerta con el operador
EXEC msdb.dbo.sp_add_notification
    @alert_name = N'Alerta_Error_Motor_824',
    @operator_name = N'OperadorAlerta',
    @notification_method = 1
GO

-- También voy a crear una alerta para errores de severidad alta (20-25)
-- Estos son errores fatales que pueden indicar problemas graves
PRINT 'Creando alerta para errores de severidad alta...'
EXEC msdb.dbo.sp_add_alert
    @name = N'Alerta_Severidad_Alta',
    @message_id = 0,  -- 0 significa que usamos severidad en lugar de message_id
    @severity = 20,   -- Severidad 20 (errores fatales)
    @enabled = 1,
    @delay_between_responses = 30, -- más rápido para errores graves
    @include_event_description_in = 1,
    @job_id = NULL
GO

-- Asocio la alerta con el operador
EXEC msdb.dbo.sp_add_notification
    @alert_name = N'Alerta_Severidad_Alta',
    @operator_name = N'OperadorAlerta',
    @notification_method = 1
GO

-- Voy a crear un trabajo (job) que se ejecute cuando ocurra un error
-- Este trabajo registrará el error en una tabla personalizada
PRINT 'Creando tabla para registrar errores...'
USE master
GO

-- Primero verifico si la tabla ya existe
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'RegistroErroresMotor')
BEGIN
    CREATE TABLE RegistroErroresMotor (
        ID INT IDENTITY(1,1) PRIMARY KEY,
        FechaError DATETIME DEFAULT GETDATE(),
        MensajeError NVARCHAR(MAX),
        Severidad INT,
        Estado INT,
        NumeroLinea INT,
        Procedimiento NVARCHAR(128)
    )
    PRINT 'Tabla creada correctamente'
END
ELSE
    PRINT 'La tabla ya existe'
GO

-- Ahora creo un procedimiento almacenado para registrar errores
PRINT 'Creando procedimiento para registrar errores...'
IF OBJECT_ID('RegistrarErrorMotor', 'P') IS NOT NULL
    DROP PROCEDURE RegistrarErrorMotor
GO

CREATE PROCEDURE RegistrarErrorMotor
    @MensajeError NVARCHAR(MAX),
    @Severidad INT,
    @Estado INT,
    @NumeroLinea INT,
    @Procedimiento NVARCHAR(128)
AS
BEGIN
    -- Inserto el error en la tabla
    INSERT INTO RegistroErroresMotor (MensajeError, Severidad, Estado, NumeroLinea, Procedimiento)
    VALUES (@MensajeError, @Severidad, @Estado, @NumeroLinea, @Procedimiento)

    -- También puedo hacer otras cosas como enviar un correo adicional
    -- o intentar reiniciar algún servicio si es necesario

    -- Esto es solo un ejemplo básico
    PRINT 'Error registrado en la tabla RegistroErroresMotor'
END
GO

PRINT 'Configuración de alertas completada!'
PRINT 'No olvides configurar Database Mail para que las notificaciones funcionen'
GO