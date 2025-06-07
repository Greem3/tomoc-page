--Execute: 6

create or alter view content.VUsers as
select
    u.id,
    u.create_date,
    u.first_name,
    u.middle_name,
    u.first_surname,
    u.second_surname,
    u.username,
    u.email,
    c.id as country_id,
    c.name as country_name,
    u.profile_picture_url,
    r.id as role_id,
    r.name as role_name
from dbo.Users u
    left join dbo.Countries c on u.origin_country_id = c.id
    left join dbo.Roles r on u.role_id = r.id
go

create or alter view content.VSimpleUsers as
select
    id,
    create_date,
    first_name + ' ' + middle_name + ' ' + first_surname + ' ' + second_surname as real_name,
    username,
    email,
    country_name,
    profile_picture_url,
    role_name
from content.VUsers
go

--TODO: Eliminar el view VOlympics y VSimpleOlympics
--TODO: Agregar estos nuevos Views
create or alter view content.VContests as
select
    o.id,
    n.name,
    n.short_name,
    o.year_made,
    t.name as type
from dbo.Contests o
    join dbo.ContestNames n on o.contest_name_id = n.id
    join dbo.ContestTypes t on n.contest_type_id = t.id
go

create or alter view content.VSimpleContests as
select
    id,
    name + ' ' + CAST(year_made as varchar(5)) as name,
    short_name + ' ' + CAST(year_made as varchar(5)) as short_name,
    type
from content.VContests
go

create or alter view dbo.VActions as
select
    a.id,
    a.user_id,
    a.create_date
from dbo.Actions a
go

create or alter view dbo.VPublications as
select
    a.id,
    a.user_id,
    a.create_date,
    p.publication_text
from dbo.Publications p
    join dbo.VActions a on p.action_id = a.id
go

create or alter view dbo.VEntities as
select
    p.id,
    p.user_id,
    p.create_date,
    e.name,
    p.publication_text,
    c.id as country_id,
    c.name as country_name
from dbo.Entities e
    left join dbo.Countries c on e.country_id = c.id
    join dbo.VPublications p on e.publication_id = p.id
go

create or alter view dbo.VSimpleEntities as
select
    id,
    user_id,
    create_date,
    name,
    publication_text,
    country_name
from dbo.VEntities
go

create or alter view content.VProblems as
select
    p.id,
    e.id as entity_id,
    u.id as user_id,
    u.username,
    e.create_date,
    t.id as problem_type_id,
    t.name as problem_type_name,
    p.contest_id,
    o.name as contest_name,
    o.short_name as contest_short_name,
    o.type as contest_type,
    e.name as problem_name,
    e.publication_text as explication,
    e.country_id,
    e.country_name,
    p.difficulty,
    p.points,
    p.verified
from dbo.Problems p
    join dbo.VEntities e on p.entity_id = e.id
    left join content.VSimpleContests o on p.contest_id = o.id
    join dbo.Users u on e.user_id = u.id
    join dbo.ProblemTypes t on p.problem_type_id = t.id
go

create or alter view content.VSimpleProblems as
select
    id,
    entity_id,
    username,
    create_date,
    problem_type_name,
    contest_name,
    contest_short_name,
    contest_type,
    problem_name,
    explication,
    country_name,
    difficulty,
    points,
    verified
from content.VProblems
go

create or alter view content.VContestsProblems as
select
    p.id as problem_id,
    c.id as contest_id,
    c.name as contest_name,
    c.short_name,
    c.year_made,
    p.problem_name,
    p.explication
from content.VContests c
    left join content.VProblems p on c.id = p.contest_id
go

create or alter view content.VClubs as
select
    c.id,
    c.entity_id,
    e.user_id,
    u.username,
    e.create_date,
    e.name,
    e.publication_text as description,
    e.country_id,
    e.country_name,
    c.club_picture_url,
    c.visibility,
    c.people_limit,
    t.id as entrance_type_id,
    t.name as entrance_type_name
from dbo.Clubs c
    join dbo.VEntities e on c.entity_id = e.id
    join dbo.EntranceTypes t on c.entrance_type_id = t.id
    join dbo.Users u on e.user_id = u.id
go

create or alter view content.VSimpleClubs as
select
    id,
    entity_id,
    username,
    club_picture_url,
    create_date,
    name,
    description,
    country_name,
    visibility,
    people_limit,
    entrance_type_name
from content.VClubs
go

create or alter view content.VNews as
select
    n.id,
    n.entity_id,
    u.id as author_id,
    u.username as author_username,
    e.name as title,
    e.publication_text as new_text,
    e.country_name as created_in,
    e.create_date,
    t.id as new_type_id,
    t.name as new_type_name
from dbo.News n
    join dbo.VEntities e on n.entity_id = e.id
    join dbo.NewTypes t on n.new_type_id = t.id
    join dbo.Users u on e.user_id = u.id
go

create or alter view content.VSimpleNews as
select
    id,
    entity_id,
    author_username,
    title,
    new_text,
    created_in,
    create_date,
    new_type_name
from content.VNews
go

create or alter view content.VClubMembers as
select
    a.id as action_id,
    c.id as club_id,
    c.name as club_name,
    u.id as user_id,
    u.username,
    r.name as role
from dbo.ClubMembers m
    join dbo.Actions a on m.action_id = a.id
    join content.VSimpleClubs c on c.id = m.club_id
    join dbo.Roles r on m.rol_id = r.id
    join dbo.Users u on a.user_id = u.id
go

create or alter view content.VSimpleClubMembers as
select
    club_name,
    username,
    role
from content.VClubMembers
go

create or alter view content.VSolutions as
select
    s.id,
    p.id as publication_id,
    p.user_id,
    u.username,
    u.profile_picture_url as [user_picture],
    u.country_name [user_country],
    s.problem_id,
    r.problem_type_name,
    p.create_date,
    s.final_answer as answer,
    p.publication_text as explication,
    s.solution_type as is_official
from dbo.Solutions s
    join dbo.VPublications p on s.publication_id = p.id
    join content.VUsers u on p.user_id = u.id
    join content.VProblems r on r.id = s.problem_id
go

create or alter view content.VOfficialSolutions as
select
    s.id,
    s.user_id,
    s.username,
    s.problem_id,
    s.create_date,
    s.explication,
    s.answer
from content.VSolutions s
where is_official = 1
go

create or alter view content.VUnofficialSolutions as
select
    s.id,
    s.user_id,
    s.username,
    s.problem_id,
    s.create_date,
    s.explication,
    s.answer
from content.VSolutions s
where is_official = 0
go

create or alter view content.VCorrectAnswers as
select
    a.id,
    a.user_id,
    a.username,
    a.problem_id,
    a.create_date,
    a.explication,
    a.answer
from content.VUnofficialSolutions a
where EXISTS(
    select 1
    from content.VOfficialSolutions s
    where LOWER(TRIM(REPLACE(a.answer, '$$', ''))) = LOWER(TRIM(REPLACE(s.answer, '$$', '')))
)
go

create or alter view content.VIncorrectAnswers as
select
    a.id,
    a.user_id,
    a.username,
    a.problem_id,
    a.create_date,
    a.explication,
    a.answer
from content.VSolutions a
where is_official = 0 and EXISTS(
    select 1
    from content.VOfficialSolutions s
    where LOWER(a.answer) != LOWER(s.answer)
        and a.problem_id = s.problem_id
)
go

create or alter view content.VGeneralAnswers as
select
    *,
    CASE
        -- Primero verificar si es una solución oficial
        WHEN EXISTS (
            SELECT 1
            FROM content.VOfficialSolutions o
            WHERE o.id = s.id  -- Comparación por ID de solución
        ) THEN 'official'
        -- Luego verificar si coincide con una respuesta oficial (aunque no sea oficial)
        WHEN EXISTS (
            SELECT 1
            FROM content.VOfficialSolutions o
            WHERE o.problem_id = s.problem_id
            AND TRIM(LOWER(o.answer)) = TRIM(LOWER(s.answer))
        ) THEN 'correct'
        -- Si no cumple ninguna condición anterior
        ELSE 'incorrect'
    END AS answer_status
from content.VSolutions s
go

create or alter view content.VFeedbacks as
select
    a.id,
    a.user_id,
    p.id as problem_id,
    a.create_date
from dbo.Feedbacks f
    join dbo.Actions a on f.action_id = a.id
    join dbo.Problems p on f.problem_id = p.id
    join dbo.Users u on a.user_id = u.id
go

create or alter view content.VReactions as
select
    f.id,
    f.user_id,
    f.problem_id,
    f.create_date,
    r.liked
from dbo.Reactions r
    join content.VFeedbacks f on r.feedback_id = f.id
go

create or alter view content.VCommunityDifficulty as
select
    f.id,
    f.user_id,
    f.problem_id,
    f.create_date,
    d.score
from dbo.CommunityDifficulty d
    join content.VFeedbacks f on d.feedback_id = f.id
go

--TODO: Others Views

create or alter view content.VUsersStats as
select
    u.id,
    u.first_name,
    u.middle_name,
    u.first_surname,
    u.second_surname,
    u.username,
    u.email,
    u.create_date,
    u.country_id,
    u.country_name,
    u.profile_picture_url,
    u.role_id,
    u.role_name,
    (
        select COUNT(*)
        from content.VSolutions s
        where s.user_id = u.id
    ) as total_solutions_publicated,
    (
        select COUNT(*)
        from content.VCorrectAnswers a
        where a.user_id = u.id
    ) as total_correct_solutions_publicated,
    (
        select COUNT(*)
        from content.VProblems p
        where p.user_id = u.id
    ) as total_problems_publicated,
    (
        select
            ISNULL(SUM(p.points), 0)
        from content.VCorrectAnswers c
            join content.VProblems p on c.problem_id = p.id
        where c.user_id = u.id
    ) as points,
    (
        select ISNULL(SUM(IIF(r.liked = 1, 1, -1)), 0)
        from content.VReactions r
        where r.user_id = u.id
    ) as reputation
from content.VUsers u
go

create or alter view content.VSimpleUsersStats as
select
    u.id,
    u.first_name + ' ' + u.middle_name + ' ' + u.first_surname + ' ' + u.second_surname as real_name,
    u.username,
    u.email,
    u.create_date,
    u.country_name,
    u.profile_picture_url,
    u.role_name,
    total_solutions_publicated,
    total_correct_solutions_publicated,
    total_problems_publicated,
    points,
    reputation
from content.VUsersStats u
go

-- CREATE OR ALTER VIEW dbo.VAudits
-- as
-- SELECT
--     a.event_time as event_date,
--     a.host_name,
--     a.application_name,
--     a.client_ip,
--     b.name as [action],
--     a.object_name as object_name,
--     a.statement,
--     a.server_principal_name as [user],
--     a.session_server_principal_name as [login],
--     a.succeeded
-- FROM sys.fn_get_audit_file('C:\SQLAudits\TomocAudit_A7444D6C-E380-4C03-BA3F-B36292145028_0_133921684906600000.sqlaudit', DEFAULT, DEFAULT) as a
-- LEFT JOIN
--     sys.dm_audit_actions AS b ON a.action_id = b.action_id
-- WHERE a.database_name = 'TomocDb' and a.object_name != 'Audits';
-- go

create or alter view inside.VRandint as
select top 1
    ABS(CHECKSUM(NEWID())) as value
go

create or alter view inside.VPercent as
select top 1
    (select value from inside.VRandint) % 101 as value
go

create or alter view inside.VGenerateDate as
select top 1
    DATEADD(
        MILLISECOND,
        (select value from inside.VRandint),
        DATEADD(
            DAY,
            (select value from inside.VRandint) % DATEDIFF(DAY, '2015-01-01', GETDATE()),
            '2015-01-01'
        )
    ) as value
go