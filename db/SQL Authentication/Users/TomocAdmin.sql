create user TomocAdmin for login ServerTomocAdmin;

exec sp_addrolemember 'db_owner', 'TomocAdmin'
exec sp_addrolemember 'db_datawriter', 'TomocAdmin'
exec sp_addrolemember 'db_ddladmin', 'TomocAdmin'
exec sp_addrolemember 'db_datareader', 'TomocAdmin'
exec sp_addrolemember 'db_securityadmin', 'TomocAdmin'
exec sp_addrolemember 'db_backupoperator', 'TomocAdmin'
exec sp_addrolemember 'db_accessadmin', 'TomocAdmin'