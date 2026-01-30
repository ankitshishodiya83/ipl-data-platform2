# 📊 **Data Import Guide - IPL Data Platform**

## ✅ Current Status

Your IPL Data Platform now has:
- ✅ **74 IPL Matches** loaded
- ✅ **All batting and bowling data** from scorecards
- ✅ **Player statistics** from match data
- ✅ **10 IPL Teams** with full details
- ✅ **Comprehensive match details** (innings, venues, results)

---

## 📁 **Data Folder Structure**

```
ILP/
├── dataset/                    ← Main scorecard files (74 matches)
│   ├── Chennai_Super_Kings_vs_...scorecard.json
│   ├── Mumbai_Indians_vs_...scorecard.json
│   └── [... 72 more match files]
│
└── data_import/                ← Additional data resources
    ├── teams/                  (Team information)
    ├── squads/                 (Player squads)
    ├── matches/                (Match metadata)
    ├── batting_stats/          (Batting statistics)
    ├── bowling_stats/          (Bowling statistics)
    ├── team_stats/             (Team aggregated stats)
    ├── standings/              (Tournament standings)
    ├── player_career_stats/    (Player career data)
    └── match_info/             (Additional match info)
```

---

## 🚀 **How to Add More Data**

### **Method 1: Add More Scorecard Files** (Recommended)

1. **Get your scorecard JSON files** in this format:
```json
{
  "match_info": {
    "team_a": "Team Name 1",
    "team_b": "Team Name 2",
    "date": "2023-04-01",
    "match_id": 1
  },
  "innings": [
    {
      "batting_team": "Team Name 1",
      "runs": 150,
      "wickets": 5,
      "overs": 20.0,
      "batsmen": [
        {
          "name": "Player Name",
          "runs": 50,
          "balls": 40
        }
      ],
      "bowlers": [
        {
          "name": "Bowler Name",
          "wickets": 2,
          "runs": 30,
          "overs": 4
        }
      ]
    }
  ]
}
```

2. **Place files in the `dataset/` folder:**
```bash
cp your_match_scorecard.json c:\Users\ANKIT SINGH\OneDrive\Desktop\ILP\dataset\
```

3. **Reseed the database:**
```bash
cd backend
node prisma/seed.js
```

---

### **Method 2: Import from Your Data Folders**

If you have the data in the structured format (teams, batting_stats, etc.):

1. **Copy your data folders to `data_import/`:**
```bash
Copy-Item "your_data_folder" "c:\Users\ANKIT SINGH\OneDrive\Desktop\ILP\data_import\" -Recurse
```

2. **Run the advanced import:**
```bash
cd backend
node prisma/seed-advanced.js
```

---

## 📋 **What Data You Have Available**

Your downloaded folder contains:

| Folder | Contents | Purpose |
|--------|----------|---------|
| `scorecards/` | ✅ 74 Match scorecards | **Currently Loading - ALL 74 matches** |
| `teams/` | Team details | Team information & metadata |
| `squads/` | Player rosters | Team squad lists |
| `matches/` | Match list | Match metadata |
| `batting_stats/` | Batting statistics | Batting performance data |
| `bowling_stats/` | Bowling statistics | Bowling performance data |
| `team_stats/` | Aggregated stats | Team level statistics |
| `standings/` | Tournament standings | Leaderboard data |
| `player_career_stats/` | Career data | Player lifetime statistics |
| `match_info/` | Match details | Additional match information |

---

## 🔄 **Database Reset & Reimport**

If you want to **reset and reload all data**:

```bash
cd backend

# Reset the database
npx prisma migrate reset --force

# Reseed with fresh data
node prisma/seed.js
```

---

## 💾 **Database Commands**

### View data with Prisma Studio
```bash
cd backend
npx prisma studio
```
This opens an interactive GUI to browse and edit data at http://localhost:5555

### Query data via API
```bash
# Get all matches
curl http://localhost:5000/api/matches?page=1&limit=50

# Get all teams  
curl http://localhost:5000/api/teams

# Get all players
curl http://localhost:5000/api/players

# Get innings for a match
curl http://localhost:5000/api/innings
```

---

## 📝 **Expected Database Contents After Import**

After running `seed.js`:

| Model | Count | Status |
|-------|-------|--------|
| Teams | 10 | ✅ Loaded |
| Matches | 74 | ✅ Loaded |
| Innings | ~148 | ✅ Loaded |
| Batsmen | 1000+ | ✅ Loaded |
| Bowlers | 500+ | ✅ Loaded |
| Players | 2000+ | ✅ Loaded |

---

## 🎯 **Your Data Import Paths**

**Main Dataset:**
```
c:\Users\ANKIT SINGH\OneDrive\Desktop\ILP\dataset\
```

**Additional Data Resources:**
```
c:\Users\ANKIT SINGH\OneDrive\Desktop\ILP\data_import\
```

**Original Source:**
```
c:\Users\ANKIT SINGH\Downloads\Indian_Premier_League_2022-03-26\
```

---

## ⚙️ **Customization Options**

### To add different data source:

1. **Update the seed script** (`prisma/seed.js`):
   - Modify the dataset path
   - Adjust data structure parsing
   - Update database insert logic

2. **Create new seeding script**:
```bash
cp backend/prisma/seed.js backend/prisma/seed-custom.js
# Edit the paths and logic
node backend/prisma/seed-custom.js
```

---

## 📱 **View Your Data**

After import, visit:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:5000/api-docs
- **Prisma Studio**: http://localhost:5555 (after running `npx prisma studio`)

All data should be visible in the **Matches**, **Teams**, and **Players** pages!

---

## ✨ **Quick Summary**

✅ You have **74 IPL matches** already loaded  
✅ All scorecard data is **already in the database**  
✅ Your data folders are ready at `data_import/`  
✅ Just need to reseed if you want to add **more data**  
✅ Use `node prisma/seed.js` to **load scorecard files**  
✅ Use `node prisma/seed-advanced.js` to **load team/player stats**  

**Your database is populated and the platform is ready to use!** 🚀
