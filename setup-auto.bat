@echo off
REM IPL Data Platform - Automated Setup Script

echo.
echo ========================================
echo IPL DATA PLATFORM - SETUP WIZARD
echo ========================================
echo.

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo OK: %NODE_VERSION%

REM Check npm
echo Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm not found!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo OK: npm %NPM_VERSION%

REM Check PostgreSQL
echo Checking PostgreSQL...
psql --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: PostgreSQL not installed!
    echo Download from: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('psql --version') do set PG_VERSION=%%i
echo OK: %PG_VERSION%

echo.
echo ========================================
echo Creating Database...
echo ========================================
echo.

REM Create database
psql -U postgres -c "CREATE DATABASE ipl_db;" 2>nul
if errorlevel 1 (
    echo WARNING: Database might already exist or PostgreSQL not running
    echo Trying to continue...
)

echo Database ready!

echo.
echo ========================================
echo Installing Backend Dependencies...
echo ========================================
echo.

cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend npm install failed!
    pause
    exit /b 1
)

echo.
echo Running Prisma migrations...
call npm run prisma:generate
call npm run prisma:migrate

echo.
echo ========================================
echo Installing Frontend Dependencies...
echo ========================================
echo.

cd ..\frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend npm install failed!
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Open PowerShell Terminal 1:
echo    cd backend
echo    npm run seed
echo    npm run dev
echo.
echo 2. Open PowerShell Terminal 2:
echo    cd frontend
echo    npm start
echo.
echo Then access:
echo    Frontend: http://localhost:3000
echo    API Docs: http://localhost:5000/api-docs
echo.
pause
