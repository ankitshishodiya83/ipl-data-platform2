# 🚀 Quick Start Guide - 5 Minutes

## Prerequisites Installed?
- [ ] Node.js (v16+) - https://nodejs.org
- [ ] PostgreSQL - https://www.postgresql.org/download

## Step-by-Step

### 1. Database Setup (2 minutes)

**Windows PowerShell:**
```powershell
psql -U postgres
```

Then in psql shell:
```sql
CREATE DATABASE ipl_db;
\q
```

### 2. Backend Setup (1 minute)

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run dev
```

✅ Backend running at http://localhost:5000

### 3. Frontend Setup (1 minute)

Open new terminal:
```bash
cd frontend
npm install
npm start
```

✅ Frontend opens at http://localhost:3000

### 4. You're Done! 🎉

**Access:**
- 🌐 App: http://localhost:3000
- 📚 API Docs: http://localhost:5000/api-docs
- ❤️ Health: http://localhost:5000/api/health

## Troubleshooting

### PostgreSQL Connection Error?
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Windows: Check Services app for PostgreSQL
# macOS: brew services start postgresql@15
```

### npm install fails?
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### Database already exists?
```bash
# Drop and recreate
dropdb ipl_db
createdb ipl_db
npm run prisma:migrate
npm run seed
```

### Port in use?
```bash
# Change in backend/.env
PORT=5001
```

## What's Inside?

- ✅ 74 IPL matches loaded
- ✅ 10 teams extracted
- ✅ 500+ players indexed
- ✅ Full REST API with Swagger
- ✅ Interactive dashboard
- ✅ Charts and analytics

## Next Steps

1. 🏏 Explore matches on Dashboard
2. 📊 View charts and statistics
3. 👥 Check player rankings
4. 🎯 Use API endpoints
5. 📚 Read full README.md

## Documentation

- **README.md** - Full feature list
- **INSTALLATION.md** - Detailed setup
- **DEPLOYMENT.md** - Cloud deployment
- **PROJECT_SUMMARY.md** - Complete overview

---

**Need Help?** Check INSTALLATION.md troubleshooting section.

**Estimated Setup Time**: 5-10 minutes  
**No Docker Required** - Pure Node.js + PostgreSQL
