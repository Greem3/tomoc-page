--Funcion para repetir texto

create or alter function inside.RepeatText(
    @text nvarchar(max),
    @count int,
    @space nvarchar(max) = null
)
returns nvarchar(max)
as
begin
    declare @result nvarchar(max) = '';

    declare @i int = 0;
    while @i < @count
    begin
        set @result += @text + @space;

        set @i += 1;
    end

    return @result;
end
go

--Funcion que hace lo contrario que la funcion ISNULL
create function inside.ISNOTNULL(@value SQL_VARIANT, @to_replace SQL_VARIANT)
returns SQL_VARIANT
as
begin
    return IIF(@value is not null, @value, @to_replace);
end
go