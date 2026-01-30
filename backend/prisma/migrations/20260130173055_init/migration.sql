-- CreateTable
CREATE TABLE "teams" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "logoUrl" TEXT
);

-- CreateTable
CREATE TABLE "venues" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "country" TEXT
);

-- CreateTable
CREATE TABLE "matches" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matchId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "matchNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "statusText" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "teamAId" INTEGER NOT NULL,
    "teamBId" INTEGER NOT NULL,
    "venueId" INTEGER,
    "tossWinnerId" INTEGER,
    "tossDecision" TEXT,
    "resultType" TEXT,
    "resultWinnerId" INTEGER,
    "manOfTheMatch" TEXT,
    "scorecardData" TEXT,
    CONSTRAINT "matches_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "matches_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "innings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matchId" INTEGER NOT NULL,
    "inningsNumber" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "battingTeamId" INTEGER NOT NULL,
    "runsScored" INTEGER NOT NULL,
    "wicketsFallen" INTEGER NOT NULL,
    "overs" REAL NOT NULL,
    "ballsFaced" INTEGER,
    CONSTRAINT "innings_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "innings_battingTeamId_fkey" FOREIGN KEY ("battingTeamId") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "batsmen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inningsId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,
    "runs" INTEGER NOT NULL,
    "ballsFaced" INTEGER NOT NULL,
    "fours" INTEGER NOT NULL DEFAULT 0,
    "sixes" INTEGER NOT NULL DEFAULT 0,
    "strikeRate" REAL,
    "dismissalMode" TEXT,
    "dismissalInfo" TEXT,
    CONSTRAINT "batsmen_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "innings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bowlers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inningsId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "playerName" TEXT NOT NULL,
    "overs" REAL NOT NULL,
    "runs" INTEGER NOT NULL,
    "wickets" INTEGER NOT NULL,
    "dotBalls" INTEGER NOT NULL DEFAULT 0,
    "economy" REAL,
    CONSTRAINT "bowlers_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "innings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "players" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "birthDate" DATETIME,
    "birthPlace" TEXT,
    "country" TEXT,
    "nationality" TEXT,
    "primaryRole" TEXT,
    "battingStyle" TEXT,
    "bowlingStyle" TEXT,
    "fantasyRating" REAL
);

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "teams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "venues_name_key" ON "venues"("name");

-- CreateIndex
CREATE UNIQUE INDEX "matches_matchId_key" ON "matches"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "innings_matchId_inningsNumber_key" ON "innings"("matchId", "inningsNumber");

-- CreateIndex
CREATE UNIQUE INDEX "players_playerId_key" ON "players"("playerId");
