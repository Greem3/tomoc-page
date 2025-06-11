--Verifica el limite de miembros en un club (en el caso de que tenga)
--Si esta al limite, entrara solo a los usuarios faltantes para llegar al limite
--Si llega al limite y hay al menos un usuario mas, dara error
create trigger TVerifyLimitMembers on ClubMembers
instead of insert
as
begin
    set NOCOUNT on;

    declare @insertable table (
        action_id bigint,
        club_id bigint,
        rol_id tinyint
    )

    declare @club_id bigint;

    declare club_cursor cursor for
    select
        distinct club_id
    from inserted;

    open club_cursor
    fetch next from club_cursor into @club_id;

    declare @available_spaces int;

    while @@FETCH_STATUS = 0
    begin
        select @available_spaces =
            c.people_limit
            - (select COUNT(*) from ClubMembers where club_id = @club_id)
        from Clubs c
        where c.id = @club_id

        if @available_spaces > 0 or @available_spaces is null
        begin
            insert into @insertable (action_id, club_id, rol_id)
            select top (COALESCE(@available_spaces, 99999999))
                action_id,
                club_id,
                rol_id
            from inserted
            where club_id = @club_id
        end

        fetch next from club_cursor into @club_id;
    end

    close club_cursor;
    deallocate club_cursor;

    insert into ClubMembers (action_id, club_id, rol_id)
    select i.action_id, i.club_id, i.rol_id
    from @insertable i
        join Actions a on a.id = i.action_id
    where not EXISTS(
        select 1
        from ClubMembers c
        join Actions a2 on a2.id = c.action_id
        where a2.user_id = a.user_id
        and c.club_id = i.club_id
    )

    -- Verifica si alguien no pudo entrar
    IF EXISTS (
        SELECT 1
        FROM inserted i
        LEFT JOIN @Insertable ins
            ON i.action_id = ins.action_id
            AND i.club_id = ins.club_id
            AND i.rol_id = ins.rol_id
        WHERE ins.action_id IS NULL
    )
    BEGIN
        RAISERROR('No hay suficientes espacios disponibles en uno o más clubes.', 16, 1);
    END
end;
go