create login AnonymousLogin WITH PASSWORD = 'TomocAnom@27.25',
    CHECK_EXPIRATION = ON,
    CHECK_POLICY = ON,
    DEFAULT_DATABASE = TomocDb;

create login NormalLogin WITH PASSWORD = 'TomocNorm@04.25',
    CHECK_EXPIRATION = ON,
    CHECK_POLICY = ON,
    DEFAULT_DATABASE = TomocDb;

create login ServerTomocAdmin WITH PASSWORD = 'Tomoc@Db.2025',
    CHECK_EXPIRATION = ON,
    CHECK_POLICY = ON

create login Test with password = '12345678Ae' MUST_CHANGE,
CHECK_POLICY = ON,
CHECK_EXPIRATION = ON

alter login Test with password = 'Qwertyui.'