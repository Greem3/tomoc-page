--Procedimientos para eliminar datos de la tablas debidas

create procedure sp_delete_action
    @id bigint,
    @type_id tinyint = null
as
begin

    declare @sql_query nvarchar(200) =
        'delete from Actions where id=' + CAST(@id as nvarchar(200));

    IF (@type_id is not null)
    begin
        set @sql_query += ' and action_type_id=' + CAST(@type_id as nvarchar(200));
    end

    exec sp_executesql @sql_query;

    delete from Actions
    where id = @id;
end
go

create procedure sp_delete_publication
    @action_id bigint,
    @type_id tinyint = null
as
begin
    exec sp_delete_action
        @id = @action_id,
        @type_id = 1;

    declare @sql_query nvarchar(200) =
        'delete from Publications where action_id=' + CAST(@action_id as nvarchar(200));

    IF (@type_id is not null)
    begin
        set @sql_query += ' and publication_type_id=' + CAST(@type_id as nvarchar(200));
    end

    exec sp_executesql @sql_query;
end
go

create procedure sp_delete_entity
    @publication_id bigint,
    @type_id tinyint = null
as
begin
    exec sp_delete_publication
        @action_id = @publication_id,
        @type_id = 1;

    declare @sql_query nvarchar(200) =
        'delete from Entities where publication_id=' + CAST(@publication_id as nvarchar(200));

    IF (@sql_query is not null)
    begin
        set @sql_query += ' and entity_type_id=' + CAST(@type_id as nvarchar(200));
    end

    exec sp_executesql @sql_query;
end
go

create procedure sp_delete_problem
    @entity_id bigint
with execute as owner
as
begin
    exec sp_delete_entity
        @publication_id = @entity_id,
        @type_id = 1;

    delete from Problems
    where entity_id = @entity_id;
end
go

create procedure sp_delete_club
    @entity_id bigint
with execute as owner
as
begin
    exec sp_delete_entity
        @publication_id = @entity_id,
        @type_id = 2;

    delete from Clubs
    where entity_id = @entity_id;
end
go

create procedure sp_delete_new
    @entity_id bigint
with execute as owner
as
begin
    exec sp_delete_entity
        @publication_id = @entity_id,
        @type_id = 3;

    delete from News
    where entity_id = @entity_id;
end
go