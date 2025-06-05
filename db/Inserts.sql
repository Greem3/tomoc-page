--Execute: 5

--Config inserts

insert into Roles (name) values
('User'),
('Administrator'),
('Super Administrator')
go

insert into ContestTypes (name) values
('Olympiad'),
('Contest')
go

insert into ContestNames (name, short_name, contest_type_id) values
('International Math Olympic', 'IMO', 1),
('Pan-American Girls'' Mathematical Olympiad','PAGMO', 1),
('May Olympiad', null, 1),
('Ibero American', 'IBERO', 1)
go

declare @l int = 1;
while @l <= (select COUNT(*) from ContestNames)
begin
    exec sp_add_contest
        @contest_name_id = @l,
        @year_made = 2025

    exec sp_add_contest
        @contest_name_id = @l,
        @year_made = 2024

    exec sp_add_contest
        @contest_name_id = @l,
        @year_made = 2023

    exec sp_add_contest
        @contest_name_id = @l,
        @year_made = 2022

    exec sp_add_contest
        @contest_name_id = @l,
        @year_made = 2021

    exec sp_add_contest
        @contest_name_id = @l,
        @year_made = 2020

    set @l += 1;
end
go

insert into ActionTypes (name) values
('Publication'),
('Feedback'),
('ClubMember'),
('Reputation')
go

insert into PublicationTypes (name) values
('Entity'),
('Comment'),
('Solution')
go

insert into EntityTypes (name) values
('Problem'),
('Club'),
('New')
go

insert into ProblemTypes (name) values
('Number Theory'),
('Geometry'),
('Algebra'),
('Combinatorics')
go

insert into NewTypes (name) values
('Page'),
('Math')
go

insert into EntranceTypes (name) values
('Public'),
('Invitation'),
('Private')
go

insert into FeedbackTypes (name) values
('Reaction'),
('Difficulty')
go

--Default Inserts

exec sp_add_user
    @username = 'testuser1',
    @email = 'qznu9.testuser1@inbox.testmail.app',
    @password = '12345678',
    @role_id = 2,
    @create_date = '2015-01-01'

declare @t int = 2;
while @t <= 5000
begin
    declare @date_created date;

    select @date_created = value from inside.VGenerateDate

    declare @number varchar(255);

    select top 1 @number = CAST(id+1 AS VARCHAR(255)) from dbo.Users order by id desc

    declare @user varchar(50) = 'testuser' + @number;
    declare @email varchar(max) = 'qznu9.' + @user + '@inbox.testmail.app';

    exec sp_add_user
        @username = @user,
        @email = @email,
        @password = '12345678',
        @create_date = @date_created;

    set @t += 1;
end
go

exec sp_add_club
    @author_id = 1,
    @name = 'Test Club',
    @description = 'Test Description';
go

exec sp_add_club
    @author_id = 1,
    @name = 'Test Limited Club',
    @description = '# Test Limited Description

This description have **[Markdown](https://www.markdownguide.org/cheat-sheet/)**!',
    @people_limit = 10;
go

declare @p int = 1;
while @p <= 50
begin
    declare @date_created date;
    select @date_created = value from inside.VGenerateDate;

    declare @club_title varchar(25) = 'Club Title ' + CAST(@p as char(2))

    exec sp_add_club
        @author_id = 1,
        @name = @club_title,
        @description = '# Example Club Description

With **Markdown**, I Love It.

And Math lol, see: $n/0=undefined$',
        @entrance_type = 1,
        @create_date = @date_created;

    set @p += 1;
end

declare @i int = 1;
while @i <= 50
begin

    exec sp_add_club_member
        @member_id = @i,
        @club_id = 1;

    set @i += 1;
end
go

exec sp_add_problem
    @author_id = 1,
    @name = 'Test Procedure Problem',
    @explication = 'Hello',
    @from_country = null,
    @difficulty = 5,
    @contest_id = 1,
    @points = 500,
    @problem_type_id = 1,
    @verified = 1
go

exec sp_add_problem
    @author_id = 1,
    @name = 'Test Procedure Problem 2',
    @explication = 'Second Problem',
    @from_country = null,
    @difficulty = 1,
    @contest_id = null,
    @points = 250,
    @problem_type_id = 1,
    @verified = 1
go

declare @j int = 1;
while @j <= 5000
begin
    declare @date_created date;
    select @date_created = value from inside.VGenerateDate;

    declare @problem_title varchar(25) = 'Text Problem ' + CAST(@j as varchar(100))

    declare @problem_type int = null;
    select top 1
        @problem_type = id
    from ProblemTypes
    order by (select value from inside.VRandint)

    exec sp_add_problem
        @author_id = 1,
        @name = @problem_title,
        @explication = '# Problem Explication

**Is Beautifull** (Not really)',
        @problem_type_id = @problem_type,
        @verified = 1,
        @create_date = @date_created;

    set @j += 1;
end

exec sp_add_new
    @author_id = 1,
    @title = 'Test New',
    @info = '## Test New Text

![Example Image](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.significados.com%2Fpaisaje%2F&psig=AOvVaw2xfUnCySVJ7f9M3QJFZqvD&ust=1747787418321000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCh69PlsI0DFQAAAAAdAAAAABAE)',
    @type = 1
go

declare @new_info nvarchar(max);
select  @new_info = REPLICATE('Test Truncated Text

# Nombre

$$
2+2=cachu
$$', 50);

declare @k int = 1;
while @k <= 50
begin
    declare @date_created date;
    select @date_created = value from inside.VGenerateDate

    declare @new_type int;
    select top 1 @new_type = id from NewTypes order by (select value from inside.VRandint)

    declare @new_title varchar(25) = 'Test New ' + CAST(@k as varchar(100))
    exec sp_add_new
        @author_id = 1,
        @title = @new_title,
        @info = @new_info,
        @type = @new_type,
        @create_date = @date_created;

    set @k += 1;
end

exec sp_add_new
    @author_id = 1,
    @title = 'Old New',
    @info = 'Info of old new',
    @type = 2,
    @create_date = '1-11-2025'

exec sp_add_new
    @author_id = 1,
    @title = 'New New XD',
    @info = 'Info of the new new lol',
    @type = 2;

declare @off int = 1;
while @off <= 5000
begin
    declare @problem bigint;
    select top 1
        @problem = id
    from dbo.Problems
    order by (select value from inside.VRandint)

    exec sp_add_solution
        @author_id = 1,
        @problem_id = @problem,
        @explication = 'Example Explication',
        @final_answer = '1234',
        @solution_type = 1

    set @off += 1;
end

declare @sol int = 1;
while @sol <= 5000
begin
    declare @author bigint;
    select top 1 @author = id
    from dbo.Users
    order by (select value from inside.VRandint)

    declare @date_created date;
    select top 1 @date_created = value from inside.VGenerateDate;

    declare @problem bigint;
    select top 1
        @problem = p.id
    from dbo.Problems p
    where EXISTS(select 1 from dbo.Solutions s where s.problem_id = p.id)
    order by (select value from inside.VRandint)

    declare @finalAnswer varchar(max);
    select top 1
        @finalAnswer = IIF(
            (select value from inside.VPercent) <= 25,
            ISNULL(final_answer, 'Incorrect Answer'),
            'Incorrect Answer'
        )
    from dbo.Solutions
    where problem_id = @problem and solution_type = 1;

    exec sp_add_solution
        @author_id = @author,
        @problem_id = @problem,
        @explication = 'Unofficial Answer Explication',
        @final_answer = @finalAnswer,
        @create_date = @date_created;

    set @sol += 1
end

declare @contest_id bigint;

declare contest_cursor CURSOR for
select id from Contests;

open contest_cursor;

fetch next from contest_cursor into @contest_id;

while @@FETCH_STATUS = 0
begin

    declare @next int = 1;
    while @next <= 6
    begin
        declare @problem_id bigint;
        select @problem_id = id from Problems where contest_id is null

        update Problems set
            contest_id = @contest_id
        where id = @problem_id

        IF (select COUNT(*) from content.VContestsProblems where contest_id = @contest_id) >= 6
        begin
            break;
        end

        set @next += 1;
    end

    fetch next from contest_cursor into @contest_id;
end

close contest_cursor;
deallocate contest_cursor;