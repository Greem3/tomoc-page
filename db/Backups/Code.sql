--FULL—

EXECUTE dbo.DatabaseBackup
		@Databases   = 'TomocDb',
		@Directory   = ' C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\Backup Automaticos TOMOC\1-Lunes',
		@BackupType  = 'FULL',
		@Verify      = 'Y',
		@Compress    = 'Y',
		@CheckSum    = 'Y',
		@CleanupTime = 168



--TRANSACCIONAL—

SET LANGUAGE SPANISH;
SET DATEFORMAT DMY;
DECLARE @DIA NVARCHAR(150)

SELECT @DIA=N' C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\Backup Automaticos TOMOC\'+
CASE DATEPART(dw,GETDATE())
	WHEN 1 THEN '1-LUNES'
	WHEN 2 THEN '2-MARTES'
	WHEN 3 THEN '3-MIERCOLES'
	WHEN 4 THEN '4-JUEVES'
	WHEN 5 THEN '5-VIERNES'
END

If DATEPART(dw,GETDATE())<6

EXECUTE dbo.DatabaseBackup
		@Databases   = 'TomocDb',
		@Directory   = @DIA,
		@BackupType  = 'LOG',
		@Verify      = 'Y',
		@Compress    = 'Y',
		@CheckSum    = 'Y',
		@CleanupTime = 168





--DIFERENCIAL--

SET LANGUAGE SPANISH;
SET DATEFORMAT DMY;
DECLARE @DIA NVARCHAR(150)

SELECT @DIA=N' C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\Backup Automaticos TOMOC\'+
CASE DATEPART(dw,GETDATE())
	WHEN 1 THEN '1-LUNES'
	WHEN 2 THEN '2-MARTES'
	WHEN 3 THEN '3-MIERCOLES'
	WHEN 4 THEN '4-JUEVES'
	WHEN 5 THEN '5-VIERNES'
END


If DATEPART(dw,GETDATE())<6

EXECUTE dbo.DatabaseBackup
		@Databases   = 'TomocDb',
		@Directory   = @DIA,
		@BackupType  = 'DIFF',
		@Verify      = 'Y',
		@Compress    = 'Y',
		@CheckSum    = 'Y',
		@CleanupTime = 168
