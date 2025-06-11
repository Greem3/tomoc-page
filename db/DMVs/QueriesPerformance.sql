use [master];

--Mira el rendimiento de los Querys
SELECT TOP 10
    query_stats.query_hash,
    query_stats.total_worker_time/1000 AS CPU_ms,
    query_stats.total_logical_reads AS Logical_Reads,
    query_stats.execution_count,
    SUBSTRING(st.text, (query_stats.statement_start_offset/2)+1,
        ((CASE query_stats.statement_end_offset
          WHEN -1 THEN DATALENGTH(st.text)
          ELSE query_stats.statement_end_offset
         END - query_stats.statement_start_offset)/2) + 1) AS query_text
FROM sys.dm_exec_query_stats AS query_stats
CROSS APPLY sys.dm_exec_sql_text(query_stats.sql_handle) AS st
ORDER BY CPU_ms DESC;