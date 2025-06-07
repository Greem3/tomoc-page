--Execute: 5

create table  Countries (
    id tinyint primary key identity(1, 1),
    name varchar(50) not null unique
)

--1 = User
--2 = Administrator
--3 = SuperAdmin
create table Roles(
    id tinyint primary key identity(1, 1),
    name varchar(50) not null unique
)

create table Permissions(
    id smallint primary key identity(1, 1),
    name varchar(100) not null,
    description nvarchar(max)
)

create table RolePermissions(
    rol_id tinyint references Roles(id),
    permission_id smallint references Permissions(id),
    primary key (rol_id, permission_id)
)

create table Users(
    id bigint primary key identity(1, 1),
    create_date date not null default GETDATE(),
    first_name nvarchar(50),
    middle_name nvarchar(50),
    first_surname nvarchar(50),
    second_surname nvarchar(50),
    username varchar(255) not null check (len(username) > 0) unique,
    email nvarchar(255) not null unique,
    password nvarchar(35) not null check (LEN(password) >= 8),
    origin_country_id tinyint references Countries(id),
    profile_picture_url nvarchar(MAX),
    role_id tinyint not null references Roles(id) default 1
)

create table ContestTypes(
    id tinyint primary key identity (1, 1),
    name varchar(25) not null unique
)

create table ContestNames(
    id smallint primary key identity(1, 1),
    name varchar(50) not null unique,
    short_name varchar(10),
    contest_type_id tinyint not null references ContestTypes(id)
)

create table Contests(
    id int primary key identity(1, 1),
    contest_name_id smallint not null references ContestNames(id) on delete cascade,
    year_made int not null default YEAR(GETDATE())
)

create table ActionTypes(
    id tinyint primary key identity(1, 1),
    name varchar(25) not null
)

--Supertipo para guardar el user_id en todas las tablas
create table Actions(
    id bigint primary key identity(1, 1),
    user_id bigint not null references Users(id) on delete cascade,
    create_date date not null default GETDATE(),
    action_type_id tinyint not null references ActionTypes(id)
)

--Publication Types for Publications
create table PublicationTypes(
    id tinyint primary key identity(1, 1),
    name varchar(25) not null unique
)

--Super type Publications and subtype of Actions
create table Publications(
    action_id bigint not null references Actions(id) on delete cascade primary key,
    publication_text nvarchar(MAX) not null,
    publication_type_id tinyint references PublicationTypes(id)
)

--TODO: Entities subtypes

create table EntityTypes(
    id tinyint primary key identity(1, 1),
    name varchar(50) not null unique
)

--subtype of Publications
create table Entities(
    publication_id bigint references Publications(action_id) on delete cascade primary key,
    name nvarchar(max) not null check (len(name) > 0),
    country_id tinyint references Countries(id),
    entity_type_id tinyint not null references EntityTypes(id)
)

create table ProblemTypes(
    id smallint primary key identity (1, 1),
    name varchar(100) not null,
    short_name varchar(10)
)

--Subtype of Entities
--Problemas matematicos que subiran los usuarios
create table Problems(
    id bigint primary key identity(1, 1),
    contest_id int references Contests(id),
    entity_id bigint not null references Entities(publication_id) on delete cascade unique,
    --Official Problem Difficulty
    difficulty Vote check (difficulty between 0 and 10),
    --Points to be given to the user
    points int default 0 check (points >= 0) not null,
    --0 Not verified
    --1 Verified
    verified bit default 0 not null,
    problem_type_id smallint not null references ProblemTypes(id)
)

--Entrance types for clubs
create table EntranceTypes(
    id tinyint primary key identity(1, 1),
    name varchar(30) not null unique
)

--Subtype of Entities
--Clubes que subiran los usuarios para trabajar en conjunto
create table Clubs(
    id bigint primary key identity(1, 1),
    entity_id bigint not null references Entities(publication_id) on delete cascade unique,
    club_picture_url nvarchar(MAX),
    --0 = Private
    --1 = Public
    visibility bit default 1 not null,
    people_limit int check (people_limit >= 1),
    entrance_type_id tinyint not null references EntranceTypes(id) default 1
)

create table NewTypes(
    id tinyint primary key identity (1, 1),
    name varchar(50) not null unique
)

--Noticias que se subiran a la pagina
create table News(
    id bigint primary key identity (1, 1),
    entity_id bigint not null references Entities(publication_id) on delete cascade unique,
    --1 = Page
    --2 = Maths
    new_type_id tinyint not null references NewTypes(id) default 1,
)

--TODO: para unirse a los clubs:

create table ClubMembers(
    action_id bigint not null references Actions(id) on delete cascade,
    club_id bigint not null references Clubs(id),
    rol_id tinyint not null references Roles(id) default 1,
)

--TODO: Comments subtype

--Subtype of Publications
--Comentarios que podran subir los usuarios
create table Comments(
    --ID of the comment
    publication_id bigint primary key references Publications(action_id),
    --ID of the original publication
    in_publication_id bigint references Publications(action_id) on delete cascade
)

--TODO: Solutions subtype

--Subtype of Publications
--Soluciones de los usuarios
create table Solutions(
    id bigint primary key identity(1, 1),
    publication_id bigint not null references Publications(action_id),
    problem_id bigint not null references Problems(id) on delete cascade,
    final_answer nvarchar(max) not null,
    --0 = Unofficial
    --1 = Official
    solution_type bit not null default 0
)

--TODO: ProblemsFeedback subtype of Actions

--Types for ProblemsFeedback
create table FeedbackTypes(
    id tinyint primary key identity(1, 1),
    name varchar(30) not null unique
)

--Subtype of Actions
--Reputacion que tendran los usuarios
create table Reputations(
    action_id bigint not null references Actions(id) primary key,
    to_user_id bigint not null references Users(id) on delete cascade,
    positive bit not null
)

--Subtype of Actions
create table Feedbacks(
    action_id bigint not null references Actions(id) primary key,
    problem_id bigint not null references Problems(id) on delete cascade,
    feedback_type_id tinyint not null references FeedbackTypes(id),
)

--Subtype of ProblemsFeedback
--Reacciones que le daran los usuarios a los problemas
create table Reactions(
    feedback_id bigint primary key references Feedbacks(action_id) on delete cascade,
    --1 = Star
    --0 = Flag
    liked bit not null
)

--Subtype of ProblemsFeedback
--Dificultad que dice la comunidad que tiene el problema
create table CommunityDifficulty(
    feedback_id bigint primary key references Feedbacks(action_id) on delete cascade,
    score Vote not null check (score between 0 and 10)
)