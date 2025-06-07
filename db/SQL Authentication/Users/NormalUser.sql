create user NormalUser for login NormalLogin;

grant
    update on dbo.Users
to NormalUser

grant
    execute on dbo.sp_add_problem
to NormalUser

grant
    update on dbo.Problems
to NormalUser

grant
    execute on dbo.sp_delete_problem
to NormalUser

grant
    execute on dbo.sp_add_club
to NormalUser

grant
    update on dbo.Clubs
to NormalUser

grant
    execute on dbo.sp_delete_club
to NormalUser

grant
    execute on dbo.sp_add_club_member
to NormalUser

grant
    execute on dbo.sp_add_solution
to NormalUser

grant
    update, delete on dbo.Solutions
to NormalUser

grant
    execute on dbo.sp_add_reaction
to NormalUser

grant
    delete on dbo.Reactions
to NormalUser

grant
    execute on dbo.sp_add_comment
to NormalUser

grant
    update, delete on dbo.Comments
to NormalUser

grant
    execute on dbo.sp_add_community_difficulty
to NormalUser

grant
    delete on dbo.CommunityDifficulty
to NormalUser

grant
    execute on dbo.sp_add_reputation
to NormalUser