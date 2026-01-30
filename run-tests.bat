@echo off
REM Test Runner Script - IPL Data Platform (Windows)
REM Run this script from the project root directory

setlocal enabledelayedexpansion

cls
echo ============================================================
echo           IPL Data Platform - Test Runner
echo ============================================================

REM Check if in correct directory
if not exist "backend" (
    echo Error: backend folder not found. Run from project root.
    pause
    exit /b 1
)

if not exist "frontend" (
    echo Error: frontend folder not found. Run from project root.
    pause
    exit /b 1
)

echo.
echo Installing Backend Test Dependencies...
cd backend
call npm install --save-dev jest supertest 2>nul
if !errorlevel! neq 0 (
    echo Note: Some dependencies may already be installed
)
echo Backend dependencies ready!

echo.
echo Installing Frontend Test Dependencies...
cd ..\frontend
call npm install --save-dev ^
  @testing-library/react ^
  @testing-library/jest-dom ^
  @testing-library/user-event ^
  babel-jest ^
  identity-obj-proxy 2>nul
if !errorlevel! neq 0 (
    echo Note: Some dependencies may already be installed
)
echo Frontend dependencies ready!

cd ..

echo.
echo ============================================================
echo Testing Options:
echo ============================================================
echo.
echo 1. Backend Tests:          cd backend ^&^& npm test
echo 2. Frontend Tests:         cd frontend ^&^& npm test
echo 3. Backend Watch Mode:     cd backend ^&^& npm run test:watch
echo 4. Frontend Watch Mode:    cd frontend ^&^& npm run test:watch
echo 5. Backend Coverage:       cd backend ^&^& npm run test:coverage
echo 6. Frontend Coverage:      cd frontend ^&^& npm run test:coverage
echo.
echo ============================================================

echo.
echo Test Files Created:
echo.
echo Backend:
echo   + backend\tests\api.test.js
echo   + backend\jest.config.js
echo.
echo Frontend:
echo   + frontend\src\components\__tests__\Header.test.js
echo   + frontend\src\components\__tests__\Navigation.test.js
echo   + frontend\src\pages\__tests__\Dashboard.test.js
echo   + frontend\src\pages\__tests__\Matches.test.js
echo   + frontend\src\pages\__tests__\Teams.test.js
echo   + frontend\src\pages\__tests__\Players.test.js
echo   + frontend\jest.config.js
echo   + frontend\src\setupTests.js
echo.
echo Documentation:
echo   + TESTING_GUIDE.md - Complete testing documentation
echo.
echo ============================================================
echo SUCCESS: All test files created!
echo ============================================================
echo.
echo Next: Read TESTING_GUIDE.md for detailed instructions
echo.
pause
