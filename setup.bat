@echo off
echo.
echo 🚀 IPL Data Platform - Windows Setup Script
echo ============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install from https://nodejs.org/
    exit /b 1
)

echo ✓ Node.js found: 
node --version

echo.
echo =====================
echo 1. Setting up Backend
echo =====================
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend npm install failed
    exit /b 1
)

echo.
echo ⚠️  Important: Configure PostgreSQL
echo ====================================
echo 1. Install PostgreSQL from https://www.postgresql.org/download/
echo 2. Create database: psql -U postgres -c "CREATE DATABASE ipl_db;"
echo 3. Update DATABASE_URL in backend\.env with your credentials
echo 4. Run: npm run prisma:generate
echo 5. Run: npm run prisma:migrate
echo 6. Run: npm run seed
echo.

echo.
echo ======================
echo 2. Setting up Frontend
echo ======================
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend npm install failed
    exit /b 1
)

echo.
echo ✓ Setup complete!
echo.
echo 📋 Next Steps:
echo ===============
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm run dev
echo   (runs on http://localhost:5000)
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm start
echo   (runs on http://localhost:3000)
echo.
echo Terminal 3 - Seed Database (one-time):
echo   cd backend
echo   npm run seed
echo.
echo 🌐 Access the Application:
echo   Frontend: http://localhost:3000
echo   API Docs: http://localhost:5000/api-docs
echo.
