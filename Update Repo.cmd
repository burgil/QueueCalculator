@echo off
color a
title Updating %CD%...
git fetch
git pull
echo Adding Files...
git add *
set /p gitcommit="Enter Initial Commit: "
git commit -m "%gitcommit%"
git push
pause