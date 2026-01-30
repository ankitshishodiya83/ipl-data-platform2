# IPL Data Platform - Installation Guide

## System Requirements

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **PostgreSQL**: v12 or higher
- **RAM**: 4GB minimum
- **Disk Space**: 2GB minimum

## Step 1: Install Prerequisites

### Windows

#### PostgreSQL
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer with default settings
3. Note the password you set for postgres user
4. Verify installation:
   ```
   psql --version
   ```

#### Node.js
1. Download from: https://nodejs.org/ (LTS version recommended)
2. Run installer with default settings
3. Verify installation:
   ```
   node --version
   npm --version
   ```

### macOS

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PostgreSQL
brew install postgresql@15

# Install Node.js
brew install node
```

### Linux (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo apt-get install nodejs npm
```

## Step 2: Clone/Download Project

```bash
git clone <repository-url>
cd ILP
```

## Step 3: Setup PostgreSQL

### Windows PowerShell
```powershell
# Connect to PostgreSQL
psql -U postgres

# In psql shell:
CREATE DATABASE ipl_db;
\q  # Exit psql
```

### macOS/Linux
```bash
createdb ipl_db
```

Verify creation:
```bash
psql -l | grep ipl_db
```

## Step 4: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Verify Prisma installation
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed data from JSON files
npm run seed

# Start backend server
npm run dev
```

Expected output:
```
✓ Server running on http://localhost:5000
✓ Swagger UI at http://localhost:5000/api-docs
```

## Step 5: Frontend Setup (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm start
```

Expected output:
```
Compiled successfully!
You can now view ipl-frontend in the browser.
  Local: http://localhost:3000
```

## Step 6: Verify Installation

1. **Frontend**: Visit http://localhost:3000
2. **API Docs**: Visit http://localhost:5000/api-docs
3. **Health Check**: GET http://localhost:5000/api/health

## Configuration Files

### Backend (.env)
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/ipl_db"
NODE_ENV="development"
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL="http://localhost:5000/api"
```

## Troubleshooting

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**:
- Verify PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Windows: Run "Services" and start PostgreSQL service
- macOS: `brew services start postgresql@15`
- Linux: `sudo service postgresql start`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**:
- Kill process: `lsof -ti:5000 | xargs kill -9` (macOS/Linux)
- Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID>`
- Or change PORT in backend/.env

### Database Migration Failed
```
Error: P3008 The migration ... was rolled back
```

**Solution**:
```bash
cd backend
npx prisma migrate resolve --rolled-back <migration-name>
npx prisma migrate deploy
```

### Seed Script Failed
```bash
# Reset database and re-seed
cd backend
npx prisma migrate reset --force
npm run seed
```

## Development Workflow

### Making API Changes
1. Update Prisma schema if needed
2. Run: `npm run prisma:migrate`
3. Restart backend server
4. Test via Swagger at http://localhost:5000/api-docs

### Making Frontend Changes
1. Edit React components in `frontend/src/`
2. Frontend hot-reloads automatically
3. Check console for errors

### Adding New Data
1. Place JSON files in `dataset/` folder
2. Run: `npm run seed` in backend folder
3. Verify in Swagger or frontend

## Docker Deployment (Optional)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Stops at:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5000
```

## Deployment Checklist

- [ ] All dependencies installed
- [ ] PostgreSQL configured and running
- [ ] Backend migrations complete
- [ ] Data seeding successful
- [ ] Frontend starts without errors
- [ ] Health check returns 200
- [ ] Can view dashboard in browser
- [ ] API docs accessible

## Getting Help

1. Check error messages in terminal
2. Review backend logs: terminal running `npm run dev`
3. Check browser console for frontend errors
4. Verify database connection: `psql -l`
5. Check environment variables in `.env` files

## Next Steps

1. Review API documentation at http://localhost:5000/api-docs
2. Explore frontend at http://localhost:3000
3. Check README.md for feature details
4. Customize for your needs

---

**Installation completed successfully! 🎉**

You can now:
- View IPL data on the dashboard
- Browse matches, teams, and players
- Access detailed statistics and insights
- Query data via REST API

Happy exploring! 🏏
