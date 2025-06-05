

EXEC sp_MonitorDiskAndDataFiles
    @DiskThresholdPercent = 100, -- Esto fuerza el disparo (ajústalo para pruebas)
    @DataFileThresholdPercent = 100, -- También lo fuerza
    @Recipients = 'ian.pichardo1@estudiante.edu.do',
    @ProfileName = 'DBAOperador';