@echo off
color a
title Creating GitHub Repository Here...
git init
echo Adding Files...
git add *
set /p gitcommit="Enter Initial Commit: "
git commit -m "%gitcommit%"
git branch -M main
echo (The URL should be precreated on GitHub before)
echo (The URL should look like this: https://github.com/author/example)
echo (Do not add .git to the end of the URL)
set /p url="Enter GitHub Repository URL: "
git remote add origin %url%.git
git push -u origin main
pause