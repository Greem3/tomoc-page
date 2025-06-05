--Procedimientos para agregar permisos a los roles
create procedure dbo.sp_set_permissions_to
    @rol_id tinyint,
    @permissions_id varchar(max),
    @separator char(2) = ', '
as
begin
    set NOCOUNT on;

    insert into dbo.RolePermissions (role_id, permission_id)
    select
        @rol_id,
        CAST(value as smallint)
    from STRING_SPLIT(@permissions_id, @separator);
end
go

create procedure dbo.sp_add_rol_with_permissions
    @name varchar(50),
    @permissions_id varchar(max)
with execute as owner
as
begin
    set NOCOUNT on;

    insert into dbo.Roles (name) values
    (@name)

    declare @rol_id tinyint = SCOPE_IDENTITY()

    exec sp_set_permissions_to
        @rol_id = @rol_id,
        @permissions_id = @permissions_id
end
go