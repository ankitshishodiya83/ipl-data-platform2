# 🏏 IPL Data Platform - Getting Started

## ✨ What You Have

A complete, production-ready full-stack IPL cricket data platform with:

- **Backend**: Node.js + Express + PostgreSQL + Prisma
- **Frontend**: React with Dashboard, Charts, and Analytics
- **API**: 13+ RESTful endpoints with Swagger documentation
- **Data**: 74 IPL match scorecards loaded from JSON
- **Deployment**: Docker, deployment guides for Render/Vercel/Railway

---

## 🚀 Start in 3 Steps

### Step 1: Install PostgreSQL
- Windows: https://www.postgresql.org/download/windows/
- macOS: `brew install postgresql@15`
- Linux: `sudo apt-get install postgresql`

Then create database:
```bash
createdb ipl_db
```

### Step 2: Start Backend (Terminal 1)
```bash
cd backend
npm install
npm run prisma:migrate
npm run seed
npm run dev
```

✅ You'll see: `Server running on http://localhost:5000`

### Step 3: Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

✅ Browser opens to http://localhost:3000

---

## 📚 What to Check

### 1. Dashboard
http://localhost:3000
- See overview statistics
- View charts and trends

### 2. Matches Page
http://localhost:3000/matches
- Browse all 74 matches
- Use pagination to navigate

### 3. Teams Page
http://localhost:3000/teams
- View all 10 IPL teams
- See team information

### 4. Players Page
http://localhost:3000/players
- Top batsmen and bowlers
- Complete player listing
- Performance statistics

### 5. API Documentation
http://localhost:5000/api-docs
- Interactive Swagger UI
- Try all endpoints
- See response formats

### 6. API Health Check
http://localhost:5000/api/health
- Returns: `{"status": "ok", "timestamp": "..."}`

---

## 🔧 If Something Goes Wrong

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1"

# If fails, start PostgreSQL
# Windows: Services app → PostgreSQL → Start
# macOS: brew services start postgresql@15
# Linux: sudo service postgresql start
```

### "Port 5000 already in use"
```bash
# Change PORT in backend/.env
PORT=5001
# Then restart backend
```

### "npm install fails"
```bash
# Clear cache
npm cache clean --force
# Try again
npm install
```

### "Database migration error"
```bash
cd backend
# Drop database
dropdb ipl_db
# Create fresh
createdb ipl_db
# Run migrations
npm run prisma:migrate
# Seed data
npm run seed
```

---

## 📂 File Structure

```
ILP/
├── backend/                    ← Node.js API server
│   ├── src/
│   │   ├── index.js           ← Express app
│   │   └── routes/            ← API endpoints
│   ├── prisma/
│   │   ├── schema.prisma      ← Database design
│   │   └── seed.js            ← Load JSON data
│   └── package.json
│
├── frontend/                   ← React app
│   ├── src/
│   │   ├── pages/             ← Dashboard, Matches, Teams, Players
│   │   ├── components/        ← Reusable UI components
│   │   ├── api/               ← API client
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── dataset/                    ← 74 IPL JSON files (auto-loaded)
│
└── Documentation/
    ├── README.md              ← Full feature guide
    ├── INSTALLATION.md        ← Detailed setup
    ├── DEPLOYMENT.md          ← Cloud deployment
    ├── QUICK_START.md         ← Fast guide
    └── COMPLETION_CHECKLIST.md ← This project
```

---

## 🌐 API Endpoints Available

### Matches
```
GET  /api/matches              Get all matches (paginated)
GET  /api/matches/:id          Get match details
GET  /api/matches/:id/stats    Get match statistics
```

### Teams
```
GET  /api/teams                Get all teams
GET  /api/teams/:id            Get team details
GET  /api/teams/:id/recent-matches   Get team's recent matches
```

### Players
```
GET  /api/players              Get all players
GET  /api/players/:id          Get player details
GET  /api/players/stats/top-batsmen   Top 10 batsmen
GET  /api/players/stats/top-bowlers   Top 10 bowlers
```

### Innings
```
GET  /api/innings              Get all innings
GET  /api/innings/:id          Get innings details
```

### Health
```
GET  /api/health               Health check
```

---

## 🎯 Key Features

✅ **Dashboard**
- Overview statistics (matches, teams, players)
- Monthly trend charts
- Distribution analytics

✅ **Matches**
- Browse all 74 matches
- See teams, dates, venues
- Paginated listing

✅ **Teams**
- All 10 IPL teams
- Team details
- Match history

✅ **Players**
- 500+ player profiles
- Top batsmen chart
- Top bowlers chart
- Performance stats

✅ **API**
- RESTful design
- JSON responses
- Pagination
- Filtering
- Swagger docs

---

## 📊 Data Loaded

From 74 IPL scorecards:
- **10 Teams** (CSK, MI, RCB, KKR, etc.)
- **500+ Players** (with roles, stats, nationalities)
- **1200+ Batting Performances** (runs, balls, fours, sixes)
- **600+ Bowling Performances** (wickets, runs, overs)
- **148 Innings** (full match data)

---

## 💾 Database Info

**Tables Created**:
- teams (10 rows)
- matches (74 rows)
- venues (auto-identified)
- innings (148 rows)
- batsmen (1200+ rows)
- bowlers (600+ rows)
- players (500+ rows)

**Connection String**: `postgresql://postgres:password@localhost:5432/ipl_db`

---

## 🚢 Deploy to Cloud

### Option 1: Render + Vercel (Easiest)

**Backend on Render**:
1. Push code to GitHub
2. Create Render account
3. New Web Service → Connect GitHub
4. Set DATABASE_URL environment variable
5. Deploy

**Frontend on Vercel**:
1. Create Vercel account
2. Import GitHub repo
3. Set REACT_APP_API_URL
4. Deploy

### Option 2: Docker

```bash
docker-compose up --build
```

Starts everything on Docker:
- PostgreSQL on port 5432
- Backend on port 5000
- Frontend on port 3000

---

## 📖 Learn More

Read the comprehensive documentation:

- **README.md** - Features, tech stack, API docs
- **INSTALLATION.md** - Detailed setup & troubleshooting
- **DEPLOYMENT.md** - Production deployment
- **PROJECT_SUMMARY.md** - Complete project overview

---

## ⏱️ Time to Get Running

| Step | Time |
|------|------|
| PostgreSQL setup | 2 min |
| Backend install | 1 min |
| Frontend install | 1 min |
| Data seeding | 1 min |
| **Total** | **5 min** |

---

## ✅ Checklist Before Using

- [ ] Node.js installed (`node --version`)
- [ ] PostgreSQL installed and running
- [ ] Database created (`createdb ipl_db`)
- [ ] Backend .env configured
- [ ] Frontend .env configured

---

## 🎉 You're All Set!

Everything is configured and ready to run. Just follow the 3 steps above and you'll have a fully functional IPL Data Platform!

### Questions?
Check **INSTALLATION.md** for detailed troubleshooting and setup guide.

---

**Happy exploring! 🏏⚡**
