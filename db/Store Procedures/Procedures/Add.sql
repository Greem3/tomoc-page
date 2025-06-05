--Procedimientos almacenados para agregar a las tablas debidas

CREATE or alter procedure sp_add_user
    @username varchar(255),
    @email nvarchar(255),
    @password nvarchar(35),
    @first_name nvarchar(50) = null,
    @middle_name nvarchar(50) = null,
    @first_surname nvarchar(50) = null,
    @second_surname nvarchar(50) = null,
    @origin_country_id tinyint = null,
    @profile_picture nvarchar(max) = null,
    @role_id tinyint = 1,
    @create_date date = NULL
with execute as owner
as
begin

    declare @final_date date = COALESCE(@create_date, GETDATE())

    insert into Users (first_name, middle_name, first_surname, second_surname, username, email, password, origin_country_id, profile_picture_url, role_id, create_date)  values
    (@first_name, @middle_name, @first_surname, @second_surname, @username, @email, @password, @origin_country_id, @profile_picture, @role_id, @final_date)
end
go

create or alter procedure sp_add_contest
    @contest_name_id smallint,
    @year_made int = null
with execute as owner
as
begin

    declare @final_year int = ISNULL(@year_made, YEAR(GETDATE()));

    insert into Contests (contest_name_id, year_made) values
    (@contest_name_id, @final_year)
end
go

create or alter procedure sp_add_action
    @author_id bigint,
    @type tinyint,
    @id bigint OUTPUT,
    @create_date date = null
as
begin
    set NOCOUNT on;

    set @create_date = ISNULL(@create_date, getdate())

    insert into Actions (user_id, create_date, action_type_id) values
    (@author_id, @create_date,@type)

    set @id = SCOPE_IDENTITY()
end
go

create or alter procedure sp_add_publication
    @author_id bigint, --No se debe modificar el valor original
    @text nvarchar(MAX), --No se debe modificar el valor original
    @type tinyint, --No se debe modificar el valor original
    @action_id bigint OUTPUT,
    @create_date date = null
as
begin
    set NOCOUNT on;

    exec sp_add_action
        @author_id = @author_id,
        @type = 1,
        @id = @action_id OUTPUT,
        @create_date = @create_date

    insert into Publications (action_id, publication_text, publication_type_id) values
    (@action_id, @text, @type)
end
go

create or alter procedure sp_add_entity
    @author_id bigint, --No se debe modificar el valor original
    @name nvarchar(max), --No se debe modificar el valor original
    @text nvarchar(max), --No se debe modificar el valor original
    @from_country tinyint, --No se debe modificar el valor original
    @type tinyint, --No se debe modificar el valor original
    @publication_id bigint OUTPUT,
    @create_date date = null
as
begin
    set NOCOUNT on;

    exec sp_add_publication
        @author_id = @author_id,
        @text = @text,
        @type = 1,
        @action_id = @publication_id OUTPUT,
        @create_date = @create_date

    insert into Entities (publication_id, name, country_id, entity_type_id) values
    (@publication_id, @name, @from_country, @type)
end
go

create or alter procedure sp_add_problem
    @author_id bigint, --No se debe modificar el valor original
    @name nvarchar(MAX), --No se debe modificar el valor original
    @explication nvarchar(MAX), --No se debe modificar el valor original
    @problem_type_id smallint, --No se debe modificar el valor original
    @create_date date = null,
    @from_country tinyint = null, --No se debe modificar el valor original
    @difficulty Vote = 0, --No se debe modificar el valor original
    @contest_id int = null, --No se debe modificar el valor original
    @points int = 0, --No se debe modificar el valor original
    @verified bit = 0 --No se debe modificar el valor original
with execute as owner
as
begin
    set NOCOUNT on;

    declare @entity_id bigint;

    exec sp_add_entity
        @author_id = @author_id,
        @name = @name,
        @text = @explication,
        @from_country = @from_country,
        @type = 1,
        @publication_id = @entity_id OUTPUT,
        @create_date = @create_date

    insert into Problems (contest_id, entity_id, difficulty, points, problem_type_id,verified) values
    (@contest_id, @entity_id, @difficulty, @points, @problem_type_id, @verified)
end
go

create or alter procedure sp_add_club
    @author_id bigint, --No se debe modificar el valor original
    @name nvarchar(max), --No se debe modificar el valor original
    @description nvarchar(MAX), --No se debe modificar el valor original
    @create_date date = null,
    @picture_url nvarchar(max) = null,
    @from_country tinyint = null,
    @visibility bit = 1,
    @people_limit int = null,
    @entrance_type tinyint = 1
with execute as owner
as
begin
    set NOCOUNT on;

    declare @entity_id bigint;

    exec sp_add_entity
        @author_id = @author_id,
        @name = @name,
        @text = @description,
        @from_country = @from_country,
        @type = 2,
        @publication_id = @entity_id OUTPUT,
        @create_date = @create_date

    insert into Clubs (entity_id, club_picture_url, visibility, people_limit, entrance_type_id) values
    (@entity_id, @picture_url, @visibility, @people_limit, @entrance_type)

    declare @club_id bigint = SCOPE_IDENTITY();

    insert into ClubMembers (action_id, club_id, rol_id) values
    (@entity_id, @club_id, 3);
end
go

create or alter procedure sp_add_club_member
    @member_id bigint,
    @club_id bigint,
    @rol_id tinyint = 1,
    @create_date date = null
with execute as owner
as
begin

    declare @action_id bigint;

    exec sp_add_action
        @author_id = @member_id,
        @type = 3,
        @id = @action_id OUTPUT,
        @create_date = @create_date

    insert into ClubMembers (action_id, club_id, rol_id) values
    (@action_id, @club_id, @rol_id)
end
go

create or alter procedure sp_add_new
    @author_id bigint,
    @title nvarchar(max),
    @info nvarchar(max),
    @type tinyint,
    @from_country tinyint = null,
    @create_date date = null
with execute as owner
as
begin
    set NOCOUNT on;

    declare @entity_id bigint;

    exec sp_add_entity
        @author_id = @author_id,
        @name = @title,
        @text = @info,
        @from_country = @from_country,
        @type = 3,
        @publication_id = @entity_id OUTPUT,
        @create_date = @create_date

    insert into News (entity_id, new_type_id) values
    (@entity_id, @type)
end
go

create or alter procedure sp_add_comment
    @author_id bigint,
    @text nvarchar(max),
    @in_publication_id bigint,
    @create_date date = null
with execute as owner
as
begin
    set NOCOUNT on;

    declare @publication_id bigint;

    exec sp_add_publication
        @author_id = @author_id,
        @text = @text,
        @type = 2,
        @action_id = @publication_id OUTPUT,
        @create_date = @create_date

    insert into Comments (publication_id, in_publication_id) values
    (@publication_id, @in_publication_id)
end
go

create or alter procedure sp_add_solution
    @author_id bigint,
    @problem_id bigint,
    @explication nvarchar(max),
    @final_answer nvarchar(max),
    @solution_type bit = 0,
    @create_date date = null
with execute as owner
as
begin
    set NOCOUNT on;

    declare @publication_id bigint;

    exec sp_add_publication
        @author_id = @author_id,
        @text = @explication,
        @type = 3,
        @action_id = @publication_id OUTPUT,
        @create_date = @create_date

    insert into Solutions (publication_id, problem_id, final_answer, solution_type) values
    (@publication_id, @problem_id, @final_answer, @solution_type)
end
go

create or alter procedure sp_add_official_solution
    @problem_id bigint,
    @explication nvarchar(max),
    @final_answer nvarchar(max),
    @create_date date = null
with execute as owner
as
begin
    set NOCOUNT on;

    declare @author_id bigint;

    select @author_id = user_id from content.VProblems where id = @problem_id

    exec sp_add_solution
        @author_id = @author_id,
        @problem_id = @problem_id,
        @explication = @explication,
        @final_answer = @final_answer,
        @solution_type = 1,
        @create_date = @create_date
end
go

create or alter procedure sp_add_feedback
    @author_id bigint,
    @problem_id bigint,
    @type tinyint,
    @action_id bigint OUTPUT,
    @create_date date = null
as
begin
    set NOCOUNT on;

    exec sp_add_action
        @author_id = @author_id,
        @type = 2,
        @id = @action_id OUTPUT,
        @create_date = @create_date

    insert into Feedbacks (action_id, problem_id, feedback_type_id) values
    (@action_id, @problem_id, @type)
end
go

create or alter procedure sp_add_reaction
    @author_id bigint,
    @problem_id bigint,
    @like bit,
    @create_date date = null
with execute as owner
as
begin
    set NOCOUNT on;

    declare @feedback_id bigint;

    exec sp_add_feedback
        @author_id = @author_id,
        @problem_id = @problem_id,
        @type = 1,
        @action_id = @feedback_id OUTPUT,
        @create_date = @create_date

    insert into Reactions (feedback_id, liked) values
    (@feedback_id, @like)
end
go

create or alter procedure sp_add_community_difficulty
    @author_id bigint,
    @problem_id bigint,
    @score Vote,
    @create_date date = null
with execute as owner
as
begin
    set NOCOUNT on;

    declare @feedback_id bigint;

    exec sp_add_feedback
        @author_id = @author_id,
        @problem_id = @problem_id,
        @type = 2,
        @action_id = @feedback_id OUTPUT,
        @create_date = @create_date

    insert into CommunityDifficulty (feedback_id, score) values
    (@feedback_id, @score)
end
go

create or alter procedure sp_add_reputation
    @author_id bigint,
    @to_user_id bigint,
    @positive bit
with execute as owner as
begin

    declare @action_id bigint;

    exec dbo.sp_add_action
        @author_id = @author_id,
        @type = 4,
        @id = @action_id OUTPUT

    insert into dbo.Reputations (action_id, to_user_id, positive) values
    (@action_id, @to_user_id, @positive)
end
go