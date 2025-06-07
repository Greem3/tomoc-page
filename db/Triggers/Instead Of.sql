
--Triggers para insertar y eliminar datos desde un View
create or alter trigger content.TInsertSolution on content.VSolutions
WITH EXECUTE AS OWNER
INSTEAD OF INSERT
AS
begin

    declare @user_id bigint;
    declare @explication nvarchar(max)

    select @user_id = user_id from inserted
    select @explication = explication from inserted

    declare @action_id bigint;

    exec sp_add_publication
        @author_id = @user_id,
        @text = @explication,
        @type = 3,
        @action_id = @action_id OUTPUT

    insert into Solutions (publication_id, problem_id, final_answer, solution_type)
    select
        @action_id,
        i.problem_id,
        i.answer,
        ISNULL(i.is_official, 0)
    from inserted i
end
go

create or alter trigger content.TDeleteSolution on content.VSolutions
with execute as OWNER
instead of DELETE
as
begin

    declare @publication_id bigint;

    declare deletion_cursor cursor for
    select s.publication_id
    from dbo.Solutions s
    inner join deleted d on s.id = d.id;

    open deletion_cursor;

    fetch next from deletion_cursor into @publication_id;

    while @@FETCH_STATUS = 0
    begin

        delete from dbo.Solutions where publication_id = @publication_id

        exec sp_delete_publication
            @action_id = @publication_id;

        fetch next from deletion_cursor into @publication_id
    end

    close deletion_cursor;
    deallocate deletion_cursor;
end