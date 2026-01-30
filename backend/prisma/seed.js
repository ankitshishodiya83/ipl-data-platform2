const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function loadScorecards() {
  const scorecardDir = path.join(__dirname, '../../dataset');
  
  if (!fs.existsSync(scorecardDir)) {
    console.error('Dataset folder not found');
    process.exit(1);
  }

  const files = fs.readdirSync(scorecardDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} scorecard files`);

  for (const file of files) {
    try {
      const filePath = path.join(scorecardDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      await processScorecardData(data);
      console.log(`✓ Processed ${file}`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }
}

async function processScorecardData(data) {
  const match = data.match_info || {};
  const teams = data.teams || [];
  const innings = data.innings || [];

  // Extract teams
  const team1Name = match.team_a;
  const team2Name = match.team_b;

  if (!team1Name || !team2Name) return;

  // Create or get teams
  let teamA = await prisma.team.upsert({
    where: { name: team1Name },
    update: {},
    create: { name: team1Name, shortName: team1Name.substring(0, 3) }
  });

  let teamB = await prisma.team.upsert({
    where: { name: team2Name },
    update: {},
    create: { name: team2Name, shortName: team2Name.substring(0, 3) }
  });

  // Create or get venue
  let venue = null;
  if (match.venue) {
    venue = await prisma.venue.upsert({
      where: { name: match.venue },
      update: {},
      create: { name: match.venue, city: match.city }
    });
  }

  // Create match
  const matchRecord = await prisma.match.upsert({
    where: { matchId: match.match_id },
    update: {},
    create: {
      matchId: match.match_id,
      title: match.title || `${team1Name} vs ${team2Name}`,
      matchNumber: match.match_number || 0,
      status: match.status || 'completed',
      statusText: match.status_text,
      startDate: new Date(match.start_date || Date.now()),
      endDate: match.end_date ? new Date(match.end_date) : null,
      teamAId: teamA.id,
      teamBId: teamB.id,
      venueId: venue?.id,
      tossWinnerId: null,
      tossDecision: match.toss_decision,
      resultType: match.result_type,
      scorecardData: JSON.stringify(data)
    }
  });

  // Process innings
  for (const inningsData of innings) {
    const battingTeamName = inningsData.batting_team;
    const battingTeam = await prisma.team.findUnique({ where: { name: battingTeamName } });

    if (!battingTeam) continue;

    const inningsRecord = await prisma.innings.create({
      data: {
        matchId: matchRecord.id,
        inningsNumber: inningsData.innings_number || 1,
        teamId: battingTeam.id,
        battingTeamId: battingTeam.id,
        runsScored: inningsData.runs_scored || 0,
        wicketsFallen: inningsData.wickets_fallen || 0,
        overs: parseFloat(inningsData.overs) || 0,
        ballsFaced: inningsData.balls_faced
      }
    });

    // Process batsmen
    const batsmen = inningsData.batsmen || [];
    for (const batsman of batsmen) {
      await prisma.batsman.create({
        data: {
          inningsId: inningsRecord.id,
          playerId: batsman.pid || 0,
          playerName: batsman.name || batsman.title || 'Unknown',
          runs: batsman.runs || 0,
          ballsFaced: batsman.balls_faced || 0,
          fours: batsman.fours || 0,
          sixes: batsman.sixes || 0,
          strikeRate: batsman.strike_rate,
          dismissalMode: batsman.dismissal_mode,
          dismissalInfo: batsman.dismissal_info
        }
      });
    }

    // Process bowlers
    const bowlers = inningsData.bowlers || [];
    for (const bowler of bowlers) {
      await prisma.bowler.create({
        data: {
          inningsId: inningsRecord.id,
          playerId: bowler.pid || 0,
          playerName: bowler.name || bowler.title || 'Unknown',
          overs: parseFloat(bowler.overs) || 0,
          runs: bowler.runs || 0,
          wickets: bowler.wickets || 0,
          dotBalls: bowler.dot_balls || 0,
          economy: bowler.economy
        }
      });
    }
  }

  // Process players from squad data
  const squads = data.squads || [];
  for (const squad of squads) {
    const players = squad.players || [];
    for (const player of players) {
      try {
        await prisma.player.upsert({
          where: { playerId: player.pid },
          update: {},
          create: {
            playerId: player.pid,
            name: player.title,
            shortName: player.short_name,
            firstName: player.first_name,
            lastName: player.last_name,
            birthDate: player.birthdate ? new Date(player.birthdate) : null,
            birthPlace: player.birthplace,
            country: player.country,
            nationality: player.nationality,
            primaryRole: player.playing_role,
            battingStyle: player.batting_style,
            bowlingStyle: player.bowling_style,
            fantasyRating: player.fantasy_player_rating
          }
        });
      } catch (err) {
        // Skip player errors
      }
    }
  }
}

async function main() {
  console.log('Starting data seed...');
  try {
    await loadScorecards();
    console.log('\n✓ Data seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
