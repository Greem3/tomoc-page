--De Carlos (No sirve)

USE msdb;
GO

EXEC sp_add_job
    @job_name = N'LogBackupTomoc';

EXEC sp_add_jobstep
    @job_name = N'LogBackupTomoc',
    @step_name = N'Paso 1 - Backup de Log',
    @subsystem = N'TSQL',
    @command = N'
        BACKUP LOG [TomocDb]
        TO DISK = N''C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\Backup Automaticos TOMOC''
        WITH INIT, NAME = N''Backup Log TomocDb''
    ',
    @retry_attempts = 1,
    @retry_interval = 5;

EXEC sp_add_schedule
    @schedule_name = N'Schedule_LogBackupTomoc',
    @freq_type = 8,                 -- Weekly
    @freq_interval = 1,            -- Lunes
    @active_start_time = 090000;   -- 9:00 AM

EXEC sp_attach_schedule
    @job_name = N'LogBackupTomoc',
    @schedule_name = N'Schedule_LogBackupTomoc';

EXEC sp_add_jobserver
    @job_name = N'LogBackupTomoc';
