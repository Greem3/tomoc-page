-- Execute 1
use master;

CREATE DATABASE TomocDb


--AVISO: Esto crea un archivo en la ruta principal del disco C:
DECLARE @FolderPath NVARCHAR(500) = 'C:\SQLAudits';
DECLARE @FolderExists INT;
DECLARE @FileResults TABLE (FileExists INT, FileIsADirectory INT, ParentDirectoryExists INT);

INSERT INTO @FileResults (FileExists, FileIsADirectory, ParentDirectoryExists)
EXEC master.dbo.xp_fileexist @FolderPath;

SELECT @FolderExists = FileIsADirectory FROM @FileResults;

IF @FolderExists = 0
BEGIN
    DECLARE @Command NVARCHAR(1000) = 'mkdir "' + @FolderPath + '"';
    EXEC master.dbo.xp_cmdshell @Command;
END