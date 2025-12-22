@echo off
cd /d "%~dp0"

git add .
git commit -m "update website"
git push

echo.
echo ✅ Website pushed successfully!
pause
