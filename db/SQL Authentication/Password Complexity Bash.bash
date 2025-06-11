secedit /export /cfg c:\sec.cfg
(Get-Content c:\sec.cfg) -replace 'PasswordComplexity = 0', 'PasswordComplexity = 1' | Set-Content c:\sec.cfg
secedit /configure /db c:\windows\security\local.sdb /cfg c:\sec.cfg /areas SECURITYPOLICY
Remove-Item c:\sec.cfg

net accounts /minpwlen:8
net accounts /maxpwage:60

net accounts /lockoutthreshold:10
net accounts /lockoutduration:60
net accounts /lockoutwindow:60

net accounts