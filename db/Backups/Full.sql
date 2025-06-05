-- De carlos (no sirve)

USE msdb;
GO

EXEC sp_add_job
    @job_name = N'FullBackupTomoc';

EXEC sp_add_jobstep
    @job_name = N'FullBackupTomoc',
    @step_name = N'Paso 1 - Backup Completo',
    @subsystem = N'TSQL',
    @command = N'
        BACKUP DATABASE [TomocDb]
        TO DISK = N''C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\Backup Automaticos TOMOC\1-Lunes''
        WITH INIT, NAME = N''Backup Completo TomocDb''
    ',
    @retry_attempts = 1,
    @retry_interval = 5;

EXEC sp_add_schedule
    @schedule_name = N'Schedule_FullBackupTomoc',
    @freq_type = 8,                 -- Weekly
    @freq_interval = 1,            -- Monday
    @active_start_time = 070000;   -- 7:00 AM

EXEC sp_attach_schedule
    @job_name = N'FullBackupTomoc',
    @schedule_name = N'Schedule_FullBackupTomoc';

EXEC sp_add_jobserver
    @job_name = N'FullBackupTomoc';
