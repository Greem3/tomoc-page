create role GeneralPermissions;

grant
    select on SCHEMA::content
to GeneralPermissions;

alter role GeneralPermissions add member AnonymousUser
alter role GeneralPermissions add member NormalUser
alter role GeneralPermissions add member TomocAdmin