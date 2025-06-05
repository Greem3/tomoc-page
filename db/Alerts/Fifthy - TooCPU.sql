

-- Script para alerta de alta utilización de CPU y memoria en SQL Server con operador
-- Creado por un estudiante, sin usar jobs, con un procedimiento almacenado

USE msdb
GO

-- Crear un operador para recibir las alertas
--TODO: Operador por si no existe
-- EXEC msdb.dbo.sp_add_operator
--     @name=N'CPU_Operador',
--     @enabled=1,
--     @email_address=N'dba@empresa.com'; -- Cambiar por el correo real del administrador

USE [master]
GO

-- Crear o actualizar procedimiento almacenado para verificar CPU y memoria
CREATE OR ALTER PROCEDURE sp_CheckHighCPUMemory
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CPUUsagePercent float;
    DECLARE @MemoryUsagePercent float;
    DECLARE @Message nvarchar(max);

    -- Obtener uso de CPU (basado en el tiempo de CPU del sistema)
    SELECT @CPUUsagePercent = (SELECT
        100.0 * (1 - (SELECT SUM(1.0 * cntr_value)
                      FROM sys.dm_os_performance_counters
                      WHERE counter_name = 'Idle Time Per Sec'))
        / (SELECT SUM(1.0 * cntr_value)
           FROM sys.dm_os_performance_counters
           WHERE counter_name = 'Total Server CPU Time Per Sec'));

    -- Obtener uso de memoria (porcentaje del total disponible)
    SELECT @MemoryUsagePercent = (SELECT
        100.0 * (total_physical_memory_kb - available_physical_memory_kb)
        / total_physical_memory_kb
        FROM sys.dm_os_sys_memory);

    -- Verificar si los valores superan los umbrales
    IF (@CPUUsagePercent > 80 OR @MemoryUsagePercent > 90)
    BEGIN
        SET @Message = 'Alerta: ¡Alta utilización en el servidor SQL!' + CHAR(13) +
                       'Uso de CPU: ' + CAST(@CPUUsagePercent AS nvarchar(10)) + '%' + CHAR(13) +
                       'Uso de Memoria: ' + CAST(@MemoryUsagePercent AS nvarchar(10)) + '%' + CHAR(13) +
                       'Hora: ' + CONVERT(nvarchar(20), GETDATE(), 120);

        -- Enviar correo de alerta al operador
        EXEC msdb.dbo.sp_notify_operator
            @profile_name = 'SQLMail', -- Cambiar por el nombre del perfil de correo configurado
            @name = 'DBA_Operator', -- Usar el operador creado
            @subject = 'Alerta: Alta Utilización de CPU o Memoria en SQL Server',
            @body = @Message;
    END
END
GO