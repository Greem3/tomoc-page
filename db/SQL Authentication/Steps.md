Win + R

regedit

-> HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Lsa

create/modify
- "NoLmHash" = 1
- "PasswordComplexity" = 1
- "MinimunPasswordLength" = 10 (hex)