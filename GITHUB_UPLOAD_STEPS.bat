@echo off
REM GitHub Upload Guide - Copy & Paste These Commands

setlocal enabledelayedexpansion

cls
color 0A
echo ============================================================
echo           UPLOAD PROJECT TO GITHUB - QUICK GUIDE
echo ============================================================
echo.

REM Step 1
echo STEP 1: Navigate to Project
echo ============================================================
echo Command:
echo   cd c:\Users\ANKIT SINGH\OneDrive\Desktop\ILP
echo.
echo.

REM Step 2
echo STEP 2: Initialize Git
echo ============================================================
echo Command:
echo   git init
echo.
echo What it does: Creates .git folder to track changes
echo.

REM Step 3
echo STEP 3: Add All Files
echo ============================================================
echo Command:
echo   git add .
echo.
echo What it does: Prepares all files for upload
echo.

REM Step 4
echo STEP 4: Commit Files
echo ============================================================
echo Command:
echo   git commit -m "Initial commit - IPL Data Platform"
echo.
echo What it does: Saves files with a message
echo.

REM Step 5
echo STEP 5: Create Repository on GitHub
echo ============================================================
echo Manual Step:
echo   1. Go to https://github.com
echo   2. Click + icon ^(top right^) - New repository
echo   3. Name: ipl-data-platform
echo   4. Click "Create repository"
echo   5. Copy the HTTPS link shown
echo.

REM Step 6
echo STEP 6: Add Remote Repository
echo ============================================================
echo Command (replace YOUR-USERNAME):
echo   git remote add origin https://github.com/YOUR-USERNAME/ipl-data-platform.git
echo.
echo Example:
echo   git remote add origin https://github.com/ankitsingh/ipl-data-platform.git
echo.

REM Step 7
echo STEP 7: Push to GitHub
echo ============================================================
echo Command:
echo   git branch -M main
echo   git push -u origin main
echo.
echo What it does: Uploads your project to GitHub
echo Enter your GitHub password when prompted
echo.

REM Done
echo ============================================================
echo ALL DONE!
echo ============================================================
echo.
echo Your project is now on GitHub!
echo.
echo Share this link with your teacher:
echo   https://github.com/YOUR-USERNAME/ipl-data-platform
echo.
echo Teacher can:
echo   1. View all your code
echo   2. See project structure
echo   3. Review test files
echo   4. Clone and run locally
echo.
echo ============================================================
pause
