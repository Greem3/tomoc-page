use [master];

--Revisa los bloqueos actuales
SELECT
    request_session_id AS spid,
    resource_type,
    resource_description,
    request_mode,
    request_status
FROM sys.dm_tran_locks
WHERE resource_database_id = DB_ID();