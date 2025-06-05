--De Carlos (no sirve)

USE msdb;
GO

EXEC sp_add_job
    @job_name = N'DiffBackupTomoc';

EXEC sp_add_jobstep
    @job_name = N'DiffBackupTomoc',
    @step_name = N'Paso 1 - Backup Diferencial',
    @subsystem = N'TSQL',
    @command = N'
        BACKUP DATABASE [TomocDb]
        TO DISK = N''C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\Backup Automaticos TOMOC''
        WITH DIFFERENTIAL, INIT, NAME = N''Backup Diferencial TomocDb''
    ',
    @retry_attempts = 1,
    @retry_interval = 5;

EXEC sp_add_schedule
    @schedule_name = N'Schedule_DiffBackupTomoc',
    @freq_type = 8,                 -- Weekly
    @freq_interval = 62,           -- Martes a Viernes (2+4+8+16+32 = 62)
    @active_start_time = 120000;   -- 12:00 PM

EXEC sp_attach_schedule
    @job_name = N'DiffBackupTomoc',
    @schedule_name = N'Schedule_DiffBackupTomoc';

EXEC sp_add_jobserver
    @job_name = N'DiffBackupTomoc';
