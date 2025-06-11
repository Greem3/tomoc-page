use [master];

SELECT
    dbschemas.[name] AS SchemaName,
    dbtables.[name] AS TableName,
    dbindexes.[name] AS IndexName,
    indexstats.avg_fragmentation_in_percent,
    indexstats.page_count
FROM sys.dm_db_index_physical_stats (DB_ID(), NULL, NULL, NULL, 'LIMITED') AS indexstats
INNER JOIN sys.tables dbtables ON indexstats.object_id = dbtables.object_id
INNER JOIN sys.schemas dbschemas ON dbtables.schema_id = dbschemas.schema_id
INNER JOIN sys.indexes AS dbindexes ON indexstats.object_id = dbindexes.object_id
    AND indexstats.index_id = dbindexes.index_id
WHERE dbindexes.[name] IS NOT NULL
ORDER BY indexstats.avg_fragmentation_in_percent DESC;

--ALTER INDEX PK_Clientes_COD_ID ON tblClientes REBUILD
--ALTER INDEX PK_Clientes_COD_ID ON tblClientes REORGANIZE

DBCC CHECKFILEGROUP WITH ALL_ERRORMSGS;

--para verificar las tablas
DBCC CHECKDB

exec sp_who2

use TomocDb
exec sp_updatestats

-- exec sp_statistics 'Solutions'
--
-- exec dbo.IndexOptimize
--     @Databases = 'USER_DATABASES',
--     @FragmentationLow = NULL,
--     @FragmentationMedium = NULL,
--     @FragmentationHigh = NULL,
--     @UpdateStatistics = 'ALL'