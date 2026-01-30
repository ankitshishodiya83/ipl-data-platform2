# IPL Data Platform - Full Stack Application

A comprehensive full-stack web application for Indian Premier League (IPL) cricket data, featuring interactive dashboards, analytics, and detailed match/player/team information.

## 🏗️ Project Structure

```
ILP/
├── dataset/              # IPL scorecard JSON files (74 matches)
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── index.js      # Main server file with Swagger setup
│   │   ├── routes/       # API endpoints
│   │   │   ├── matches.js
│   │   │   ├── teams.js
│   │   │   ├── players.js
│   │   │   └── innings.js
│   │   ├── middleware/
│   │   └── utils/
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── seed.js       # Data seeding script
│   ├── package.json
│   └── .env.example
└── frontend/             # React SPA
    ├── src/
    │   ├── pages/        # Dashboard, Matches, Teams, Players
    │   ├── components/   # Reusable components
    │   ├── api/          # API client
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── package.json
    └── .env.example
```

## ✨ Features

### Backend API
- **Express.js** REST API with comprehensive endpoints
- **PostgreSQL** database with Prisma ORM
- **Swagger UI** documentation at `/api-docs`
- **CORS** enabled for frontend integration
- **Pagination & Filtering** on all list endpoints
- **Error Handling** and validation

### Frontend
- **React 18** with modern hooks
- **3+ Pages**: Dashboard, Matches, Teams, Players
- **2 Charts**: Bar chart (Top Batsmen/Bowlers), Line chart (Trends)
- **Table View**: Interactive data tables with pagination
- **State Management**: Loading, Error, Empty states
- **Responsive Design**: Mobile-friendly layout

### Database
- **Prisma ORM** for type-safe database access
- **Automatic Migrations**
- **Seed Script** to load 74 IPL scorecard JSON files
- **Relational Schema**: Matches, Teams, Players, Innings, Batsmen, Bowlers

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure database
cp .env.example .env
# Edit .env with your PostgreSQL connection string
# DATABASE_URL="postgresql://user:password@localhost:5432/ipl_db"

# Create database
createdb ipl_db

# Run migrations
npm run prisma:migrate

# Seed data from JSON scorecard files
npm run seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure API endpoint (optional)
# Create .env file with:
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

Frontend will open on `http://localhost:3000`

## 📚 API Documentation

### Health Check
```
GET /api/health
```

### Matches Endpoints
```
GET /api/matches                    # Get all matches (paginated)
GET /api/matches/:id                # Get match details
GET /api/matches/:id/stats          # Get match statistics
```

Query Parameters:
- `page` (default: 1)
- `limit` (default: 10, max: 100)
- `status` (optional filter)

### Teams Endpoints
```
GET /api/teams                      # Get all teams
GET /api/teams/:id                  # Get team details with stats
GET /api/teams/:id/recent-matches   # Get recent matches
```

### Players Endpoints
```
GET /api/players                    # Get all players (paginated)
GET /api/players/:id                # Get player details
GET /api/players/stats/top-batsmen  # Get top 10 batsmen
GET /api/players/stats/top-bowlers  # Get top 10 bowlers
```

### Innings Endpoints
```
GET /api/innings                    # Get all innings
GET /api/innings/:id                # Get innings details
```

### Swagger UI
Access comprehensive API documentation at:
```
http://localhost:5000/api-docs
```

## 🗄️ Database Schema

### Main Tables
- **teams**: Team information
- **matches**: Match details with results
- **venues**: Stadium information
- **innings**: Batting innings data
- **batsmen**: Individual batting performances
- **bowlers**: Individual bowling performances
- **players**: Player profile information

## 🎨 Frontend Pages

### 1. Dashboard
- Overview statistics (Total Matches, Teams, Players)
- Monthly match trends (Bar chart)
- Match distribution (Line chart)

### 2. Matches
- List all matches with pagination
- Display: Match #, Teams, Date, Venue, Status
- Pagination controls

### 3. Teams
- Grid view of all teams
- Team short names and logos
- Links to team details

### 4. Players
- Top 5 Batsmen chart (runs scored)
- Top 5 Bowlers chart (wickets taken)
- Complete players table with roles and styles
- Pagination support

## 🔧 Development

### Add New API Endpoint

1. Create route file in `backend/src/routes/`
2. Import and use in `backend/src/index.js`
3. Update Swagger spec in `index.js`

### Add New Page

1. Create component in `frontend/src/pages/`
2. Import API from `frontend/src/api/client.js`
3. Add route in `frontend/src/App.js`
4. Link in Navigation component

## 📦 Data Processing

The `prisma/seed.js` script:
1. Reads 74 JSON scorecard files from `dataset/`
2. Extracts match, team, player, and innings data
3. Normalizes and stores in PostgreSQL
4. Handles relationships automatically

## 🚢 Deployment

### Backend (Render/Railway)
```bash
# Push to GitHub
git push

# Configure environment variables on platform:
DATABASE_URL=<your-postgres-url>
NODE_ENV=production

# Platform auto-deploys
```

### Frontend (Vercel/Netlify)
```bash
# Connect GitHub repository
# Set environment variable:
REACT_APP_API_URL=<your-backend-url>

# Auto-deploys on push
```

## 📊 Sample API Response

```json
{
  "data": [
    {
      "id": 1,
      "matchId": 1,
      "title": "Chennai Super Kings vs Kolkata Knight Riders",
      "matchNumber": 1,
      "status": "completed",
      "startDate": "2023-03-26T19:30:00Z",
      "teamA": {
        "id": 1,
        "name": "Chennai Super Kings"
      },
      "teamB": {
        "id": 2,
        "name": "Kolkata Knight Riders"
      },
      "venue": {
        "name": "MA Chidambaram Stadium"
      }
    }
  ],
  "pagination": {
    "total": 74,
    "page": 1,
    "limit": 10,
    "pages": 8
  }
}
```

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running: `npm run dev` in backend folder
- Check `DATABASE_URL` in `.env`
- Verify PostgreSQL is running

### Database Issues
- Drop and recreate database: `dropdb ipl_db && createdb ipl_db`
- Re-run migrations: `npm run prisma:migrate`
- Re-seed data: `npm run seed`

### Frontend Issues
- Clear cache: `rm -rf node_modules && npm install`
- Check `.env` file for `REACT_APP_API_URL`
- Verify backend is accessible from browser

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/ipl_db"
NODE_ENV="development"
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL="http://localhost:5000/api"
```

## 🎓 Key Technologies

- **Backend**: Node.js, Express.js, Prisma, PostgreSQL
- **Frontend**: React 18, React Router, Recharts, Axios
- **Database**: PostgreSQL, Prisma Migrations
- **API Docs**: Swagger UI Express
- **Styling**: Inline CSS (easy to convert to CSS-in-JS or Tailwind)

## 📈 Future Enhancements

- [ ] Authentication & Authorization
- [ ] Advanced filtering and search
- [ ] Real-time updates with WebSockets
- [ ] Player career statistics
- [ ] Head-to-head team comparisons
- [ ] Fantasy points calculator
- [ ] Mobile app (React Native)
- [ ] Docker containerization
- [ ] CI/CD with GitHub Actions

## 📄 License

MIT License - feel free to use for learning and projects.

## 🤝 Contributing

This is an internship assignment project. Feel free to fork, modify, and deploy!

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Total Matches Loaded**: 74  
**Total Teams**: 10  
**Database**: PostgreSQL with Prisma ORM
#   i p l - d a t a - p l a t f o r m 2  
 