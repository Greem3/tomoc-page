USE [msdb]
GO

/****** Object:  Job [DiffBackupTomoc]    Script Date: 24/5/2025 7:25:32 a. m. ******/
BEGIN TRANSACTION
DECLARE @ReturnCode INT
SELECT @ReturnCode = 0
/****** Object:  JobCategory [[Uncategorized (Local)]]    Script Date: 24/5/2025 7:25:32 a. m. ******/
IF NOT EXISTS (SELECT name FROM msdb.dbo.syscategories WHERE name=N'[Uncategorized (Local)]' AND category_class=1)
BEGIN
EXEC @ReturnCode = msdb.dbo.sp_add_category @class=N'JOB', @type=N'LOCAL', @name=N'[Uncategorized (Local)]'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback

END

DECLARE @jobId BINARY(16)
EXEC @ReturnCode =  msdb.dbo.sp_add_job @job_name=N'DiffBackupTomoc',
		@enabled=1,
		@notify_level_eventlog=0,
		@notify_level_email=2,
		@notify_level_netsend=0,
		@notify_level_page=0,
		@delete_level=0,
		@description=N'No description available.',
		@category_name=N'[Uncategorized (Local)]',
		@owner_login_name=N'sa',
		@notify_email_operator_name=N'DBAOperador', @job_id = @jobId OUTPUT
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
/****** Object:  Step [DiffBackupTomoc]    Script Date: 24/5/2025 7:25:32 a. m. ******/
EXEC @ReturnCode = msdb.dbo.sp_add_jobstep @job_id=@jobId, @step_name=N'DiffBackupTomoc',
		@step_id=1,
		@cmdexec_success_code=0,
		@on_success_action=1,
		@on_success_step_id=0,
		@on_fail_action=2,
		@on_fail_step_id=0,
		@retry_attempts=0,
		@retry_interval=0,
		@os_run_priority=0, @subsystem=N'TSQL',
		@command=N'--DIFERENCIAL--

SET LANGUAGE SPANISH;
SET DATEFORMAT DMY;
DECLARE @DIA NVARCHAR(150)

SELECT @DIA=N''C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\Backup Automaticos TOMOC\''+
CASE DATEPART(dw,GETDATE())
	WHEN 1 THEN ''1-LUNES''
	WHEN 2 THEN ''2-MARTES''
	WHEN 3 THEN ''3-MIERCOLES''
	WHEN 4 THEN ''4-JUEVES''
	WHEN 5 THEN ''5-VIERNES''
END


If DATEPART(dw,GETDATE())<6

EXECUTE dbo.DatabaseBackup
		@Databases   = ''TomocDb'',
		@Directory   = @DIA,
		@BackupType  = ''DIFF'',
		@Verify      = ''Y'',
		@Compress    = ''Y'',
		@CheckSum    = ''Y'',
		@CleanupTime = 168',
		@database_name=N'master',
		@flags=0
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_update_job @job_id = @jobId, @start_step_id = 1
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_add_jobschedule @job_id=@jobId, @name=N'DiffBackupTomoc',
		@enabled=1,
		@freq_type=8,
		@freq_interval=60,
		@freq_subday_type=1,
		@freq_subday_interval=0,
		@freq_relative_interval=0,
		@freq_recurrence_factor=1,
		@active_start_date=20250519,
		@active_end_date=99991231,
		@active_start_time=120000,
		@active_end_time=235959,
		@schedule_uid=N'fef4eda5-ad78-4079-b096-5b8b9553d392'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
EXEC @ReturnCode = msdb.dbo.sp_add_jobserver @job_id = @jobId, @server_name = N'(local)'
IF (@@ERROR <> 0 OR @ReturnCode <> 0) GOTO QuitWithRollback
COMMIT TRANSACTION
GOTO EndSave
QuitWithRollback:
    IF (@@TRANCOUNT > 0) ROLLBACK TRANSACTION
EndSave:
GO


