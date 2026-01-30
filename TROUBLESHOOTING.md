# 🆘 Troubleshooting Guide

## PostgreSQL Issues

### ❌ "psql: command not found"
**Solution**: PostgreSQL not installed or not in PATH
- Download from: https://www.postgresql.org/download/windows/
- During installation, remember the password you set for postgres user

### ❌ "FATAL: password authentication failed"
**Solution**: Wrong password
```bash
# Try with -W to prompt for password
psql -U postgres -W -c "SELECT 1"
```

### ❌ "Connection refused"
**Solution**: PostgreSQL not running
1. Press `Win+R`, type: `services.msc`
2. Find `postgresql-x64-15` (or similar)
3. Right-click → Start
4. Or run as admin: `Start-Service postgresql-x64-15`

### ❌ "Database already exists"
**Solution**: It's OK! The seed script will skip duplicates
- Or drop it first: `dropdb ipl_db`
- Then create: `createdb ipl_db`

---

## npm Issues

### ❌ "npm: command not found"
**Solution**: Node.js/npm not installed
- Download from: https://nodejs.org/ (LTS version)
- Restart PowerShell after installation
- Verify: `npm --version`

### ❌ "Module not found"
**Solution**: Dependencies not installed
```bash
cd backend  # or frontend
npm install
```

### ❌ "Port 5000 already in use"
**Solution**: Change the port in `backend/.env`
```
NODE_ENV="development"
PORT=5001
```

---

## Database Migration Issues

### ❌ "Error: P3008 - Migration was rolled back"
**Solution**: Reset the database
```bash
cd backend
npx prisma migrate resolve --rolled-back _init
npx prisma migrate deploy
```

### ❌ "Error: SSL connection error"
**Solution**: Ensure PostgreSQL is running and accepting connections
```bash
# Test connection
psql -U postgres -c "SELECT 1"
```

---

## Seed Data Issues

### ❌ "Error loading JSON files"
**Solution**: Check dataset folder
```bash
# Verify JSON files exist
dir dataset\*.json | measure
# Should show 74 files
```

### ❌ Seed taking too long
**Solution**: Normal - it loads 74 matches. Wait 2-3 minutes.

---

## Server Issues

### ❌ "Cannot find module 'express'"
**Solution**: npm dependencies not installed
```bash
cd backend
npm install
```

### ❌ "Error: listen EADDRINUSE"
**Solution**: Port in use (see above)

### ❌ Server crashes immediately
**Solution**: Check .env file
```bash
# Check backend/.env exists and has DATABASE_URL
cat backend/.env
```

---

## Frontend Issues

### ❌ "Cannot GET /"
**Solution**: Frontend not running properly
```bash
# Ensure you're in frontend folder
cd frontend
npm install
npm start
```

### ❌ "Module not found - react"
**Solution**: Dependencies not installed in frontend
```bash
cd frontend
npm install
```

### ❌ "API connection failed"
**Solution**: Backend not running
1. Check backend is running: `npm run dev`
2. Check http://localhost:5000/api/health returns OK
3. Check .env has correct API URL

---

## API Issues

### ❌ "CORS error"
**Solution**: Backend CORS not configured
- Already configured in code
- Ensure backend is running on port 5000

### ❌ "/api-docs returns 404"
**Solution**: Backend not running or old version
```bash
cd backend
npm run dev  # Restart with latest code
```

### ❌ "API returns empty data"
**Solution**: Database not seeded
```bash
cd backend
npm run seed  # Run seeding again
```

---

## Installation Issues

### ❌ "npm ERR! code ERESOLVE"
**Solution**: Node version issue
```bash
# Check Node version (should be 16+)
node --version

# Clear npm cache
npm cache clean --force

# Install again
npm install
```

### ❌ "prisma: command not found"
**Solution**: Prisma not installed
```bash
cd backend
npm install @prisma/client prisma
```

---

## Environment Variable Issues

### ❌ "DATABASE_URL is undefined"
**Solution**: .env file not configured
```bash
# Create/update backend/.env
cat > backend\.env << EOF
DATABASE_URL="postgresql://postgres:password@localhost:5432/ipl_db"
NODE_ENV="development"
PORT=5000
EOF
```

### ❌ "Cannot connect to database"
**Solution**: Check connection string
- Username: `postgres` (default)
- Password: What you set during PostgreSQL install
- Host: `localhost`
- Database: `ipl_db`
- Port: `5432`

---

## Windows-Specific Issues

### ❌ PowerShell execution policy error
**Solution**: Allow running scripts
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### ❌ Long paths issue
**Solution**: Enable long paths in Windows
```powershell
# Run as admin
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

---

## Everything is Slow

### Solution: It's normal first time
- npm install: Can take 3-5 minutes
- npm run seed: Takes 1-2 minutes
- npm start: Takes 30-60 seconds

### Speed up future installs
```bash
npm ci  # Instead of npm install (faster)
```

---

## Still Stuck?

Try these in order:

1. **Restart everything**
   ```bash
   # Close both terminals
   # Restart PostgreSQL service
   # Start fresh
   ```

2. **Clear cache**
   ```bash
   cd backend && rm -r node_modules && npm install
   cd ../frontend && rm -r node_modules && npm install
   ```

3. **Reset database**
   ```bash
   dropdb ipl_db
   createdb ipl_db
   cd backend && npm run prisma:migrate && npm run seed
   ```

4. **Check logs**
   - Look at terminal output for error messages
   - Check browser console (F12) for frontend errors

5. **Verify prerequisites**
   ```bash
   node --version  # Should be 16+
   npm --version   # Should be 8+
   psql --version  # Should show PostgreSQL
   ```

---

## Quick Verification

```bash
# Everything should work:
node --version          # ✓ Node 16+
npm --version           # ✓ npm 8+
psql --version          # ✓ PostgreSQL 12+
psql -U postgres -c "SELECT 1"  # ✓ Connection OK
```

---

## Support Resources

- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/
- React: https://react.dev/
- Express: https://expressjs.com/
- Prisma: https://www.prisma.io/docs/

---

**Still having issues?** 
Check the browser console (F12) and terminal output for detailed error messages!
