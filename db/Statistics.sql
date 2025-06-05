
SELECT
    OBJECT_NAME(s.object_id) AS Tabla,
    s.name AS Estadistica,
    STATS_DATE(s.object_id, s.stats_id) AS FechaUltimaActualizacion
FROM sys.stats AS s
ORDER BY FechaUltimaActualizacion DESC;

USE TomocDb;
GO

EXEC sp_updatestats;
