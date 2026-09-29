# 🏏 IPL Data Platform — Full-Stack Application

A comprehensive full-stack web application for exploring and analyzing **Indian Premier League (IPL)** cricket data. The platform provides interactive dashboards, match statistics, team information, player performance, and REST APIs powered by PostgreSQL and Prisma.

---

## 📌 Project Overview

The **IPL Data Platform** is designed to transform IPL scorecard data into a structured, queryable database and present it through a modern React-based web interface.

The application follows a full-stack architecture:

* **Frontend:** React 18
* **Backend:** Node.js + Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **API Documentation:** Swagger UI
* **Charts:** Recharts
* **HTTP Client:** Axios

The platform currently supports IPL data from **74 matches**, including teams, players, innings, batting performances, bowling performances, venues, and match results.

---

## 🏗️ Project Structure

```text
IPL/
├── dataset/
│   └── # IPL scorecard JSON files
│
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── matches.js
│   │   │   ├── teams.js
│   │   │   ├── players.js
│   │   │   └── innings.js
│   │   ├── middleware/
│   │   └── utils/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard/
    │   │   ├── Matches/
    │   │   ├── Teams/
    │   │   └── Players/
    │   │
    │   ├── components/
    │   ├── api/
    │   │   └── client.js
    │   ├── App.js
    │   └── index.js
    │
    ├── public/
    ├── package.json
    └── .env.example
```

---

# ✨ Features

## 🔙 Backend API

* RESTful API built with **Express.js**
* PostgreSQL database integration
* Prisma ORM for database queries
* Swagger API documentation
* CORS configuration for frontend integration
* Pagination for large datasets
* Filtering support
* Request validation
* Centralized error handling
* Relational data between matches, teams, players, innings, batsmen, and bowlers

---

## 🎨 Frontend

The frontend is built using **React 18** and provides:

* 📊 Interactive dashboard
* 🏏 Match listing and details
* 👥 Team information
* 🧑‍💻 Player information and statistics
* 📈 Batting and bowling charts
* 📅 Match trend visualization
* 📋 Paginated data tables
* 🔄 Loading states
* ⚠️ Error states
* 📭 Empty states
* 📱 Responsive design

---

# 📊 Dashboard

The dashboard provides an overview of IPL data, including:

* Total matches
* Total teams
* Total players
* Match trends
* Top batsmen
* Top bowlers
* Match distribution

### Visualizations

* **Bar Chart:** Top batsmen and bowlers
* **Line Chart:** Match trends over time

---

# 🏏 Matches

The Matches page displays IPL match information with pagination.

Each match can include:

* Match number
* Teams
* Match date
* Venue
* Match status
* Match result

---

# 👥 Teams

The Teams page provides:

* Team names
* Team short names
* Team logos
* Team details
* Recent matches
* Team statistics

---

# 🧑 Players

The Players page provides:

* Player name
* Player role
* Batting style
* Bowling style
* Performance statistics
* Top batsmen
* Top bowlers

---

# 🗄️ Database

The application uses **PostgreSQL** with **Prisma ORM**.

## Main Entities

```text
Teams
   │
   ├── Matches
   │      │
   │      └── Innings
   │             ├── Batsmen
   │             └── Bowlers
   │
   └── Players

Venues
   │
   └── Matches
```

### Main Tables

| Table     | Description                     |
| --------- | ------------------------------- |
| `teams`   | IPL team information            |
| `matches` | Match information and results   |
| `venues`  | Stadium and venue information   |
| `players` | Player profiles                 |
| `innings` | Innings-level information       |
| `batsmen` | Individual batting performances |
| `bowlers` | Individual bowling performances |

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* **Node.js 16+**
* **PostgreSQL 12+**
* **npm**
* **Git**

Verify your installations:

```bash
node --version
npm --version
psql --version
```

---

# 1️⃣ Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd IPL
```

---

# 2️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Update `.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ipl_db"
NODE_ENV="development"
PORT=5000
```

---

# 3️⃣ Create PostgreSQL Database

Create the database:

```bash
createdb ipl_db
```

If `createdb` is not available, create it using PostgreSQL:

```sql
CREATE DATABASE ipl_db;
```

---

# 4️⃣ Run Prisma Migration

Run:

```bash
npm run prisma:migrate
```

This creates the required database tables according to `schema.prisma`.

If Prisma Client needs to be generated manually:

```bash
npx prisma generate
```

---

# 5️⃣ Seed the Database

Make sure the IPL JSON files are available in the expected dataset directory.

Then run:

```bash
npm run seed
```

The seed script:

1. Reads the IPL scorecard JSON files.
2. Extracts match information.
3. Extracts team information.
4. Extracts player information.
5. Extracts innings data.
6. Extracts batting performances.
7. Extracts bowling performances.
8. Creates relationships between database entities.
9. Inserts the processed data into PostgreSQL.

---

# 6️⃣ Start the Backend

For development:

```bash
npm run dev
```

The backend will be available at:

```text
http://localhost:5000
```

Health check:

``
