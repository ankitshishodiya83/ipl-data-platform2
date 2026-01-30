const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importAllData() {
  try {
    console.log('🚀 Starting comprehensive IPL data import...\n');

    // 1. Import Teams
    await importTeams();

    // 2. Import Matches and related data
    await importMatches();

    // 3. Import Player Stats
    await importPlayerStats();

    // 4. Import Scorecards
    await importScorecards();

    console.log('\n✅ Data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during import:', error);
    process.exit(1);
  }
}

async function importTeams() {
  console.log('📊 Importing Teams...');
  const dataImportPath = path.join(__dirname, '../../data_import/teams');
  
  if (!fs.existsSync(dataImportPath)) {
    console.log('⚠️ Teams folder not found, skipping...');
    return;
  }

  const files = fs.readdirSync(dataImportPath).filter(f => f.endsWith('.json'));
  let teamCount = 0;

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dataImportPath, file), 'utf8'));
      const teams = Array.isArray(data) ? data : [data];

      for (const team of teams) {
        await prisma.team.upsert({
          where: { name: team.name || team.team_name || team.Team_Name || 'Unknown' },
          update: { shortName: team.short_name || team.shortName || '' },
          create: {
            name: team.name || team.team_name || team.Team_Name || 'Unknown',
            shortName: team.short_name || team.shortName || '',
            logoUrl: team.logo_url || team.logoUrl || ''
          }
        });
        teamCount++;
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  console.log(`✓ Imported ${teamCount} teams\n`);
}

async function importMatches() {
  console.log('🎮 Importing Match Information...');
  const dataImportPath = path.join(__dirname, '../../data_import/matches');
  
  if (!fs.existsSync(dataImportPath)) {
    console.log('⚠️ Matches folder not found, skipping...');
    return;
  }

  const matchesFile = path.join(dataImportPath, 'matches.json');
  if (!fs.existsSync(matchesFile)) {
    console.log('⚠️ matches.json not found');
    return;
  }

  try {
    const data = JSON.parse(fs.readFileSync(matchesFile, 'utf8'));
    const matches = Array.isArray(data) ? data : [data];
    let matchCount = 0;

    for (const match of matches) {
      try {
        const teamA = await prisma.team.findFirst({
          where: {
            name: {
              in: [match.team_a, match.Team_A, match.team1, match.Team_1]
            }
          }
        });

        const teamB = await prisma.team.findFirst({
          where: {
            name: {
              in: [match.team_b, match.Team_B, match.team2, match.Team_2]
            }
          }
        });

        if (teamA && teamB) {
          await prisma.match.upsert({
            where: { matchId: match.match_id || match.id || 0 },
            update: {},
            create: {
              matchId: match.match_id || match.id || matchCount,
              title: `${teamA.name} vs ${teamB.name}`,
              matchNumber: match.match_number || matchCount,
              status: match.status || 'completed',
              statusText: match.status_text || '',
              startDate: new Date(match.date || match.start_date),
              endDate: match.end_date ? new Date(match.end_date) : null,
              teamAId: teamA.id,
              teamBId: teamB.id,
              venueId: null,
              resultType: match.result_type || 'normal',
              resultWinnerId: null,
              manOfTheMatch: match.player_of_match || ''
            }
          });
          matchCount++;
        }
      } catch (err) {
        console.error(`Error processing match:`, err.message);
      }
    }

    console.log(`✓ Imported ${matchCount} matches\n`);
  } catch (err) {
    console.error('Error reading matches.json:', err.message);
  }
}

async function importPlayerStats() {
  console.log('⭐ Importing Player Statistics...');
  
  // Import from batting_stats
  const battingPath = path.join(__dirname, '../../data_import/batting_stats');
  if (fs.existsSync(battingPath)) {
    const files = fs.readdirSync(battingPath).filter(f => f.endsWith('.json'));
    let playerCount = 0;

    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(battingPath, file), 'utf8'));
        const players = Array.isArray(data) ? data : [data];

        for (const player of players) {
          await prisma.player.upsert({
            where: { 
              playerId: player.player_id || player.id || 0
            },
            update: {},
            create: {
              playerId: player.player_id || player.id || 0,
              name: player.name || player.player_name || 'Unknown',
              shortName: player.short_name || '',
              firstName: player.first_name || '',
              lastName: player.last_name || '',
              country: player.country || 'India',
              nationality: player.nationality || '',
              primaryRole: 'Batsman',
              battingStyle: player.batting_style || '',
              bowlingStyle: ''
            }
          });
          playerCount++;
        }
      } catch (err) {
        // Silently continue
      }
    }

    console.log(`✓ Imported ${playerCount} batting players`);
  }

  // Import from bowling_stats
  const bowlingPath = path.join(__dirname, '../../data_import/bowling_stats');
  if (fs.existsSync(bowlingPath)) {
    const files = fs.readdirSync(bowlingPath).filter(f => f.endsWith('.json'));
    let playerCount = 0;

    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(bowlingPath, file), 'utf8'));
        const players = Array.isArray(data) ? data : [data];

        for (const player of players) {
          await prisma.player.upsert({
            where: { 
              playerId: player.player_id || player.id || 0
            },
            update: { primaryRole: 'Bowler' },
            create: {
              playerId: player.player_id || player.id || 0,
              name: player.name || player.player_name || 'Unknown',
              shortName: player.short_name || '',
              country: player.country || 'India',
              primaryRole: 'Bowler',
              bowlingStyle: player.bowling_style || ''
            }
          });
          playerCount++;
        }
      } catch (err) {
        // Silently continue
      }
    }

    console.log(`✓ Imported ${playerCount} bowling players\n`);
  }
}

async function importScorecards() {
  console.log('📋 Importing Scorecard Details...');
  const scorecardDir = path.join(__dirname, '../../dataset');
  
  if (!fs.existsSync(scorecardDir)) {
    console.log('⚠️ Dataset folder not found');
    return;
  }

  const files = fs.readdirSync(scorecardDir).filter(f => f.endsWith('.json'));
  console.log(`Found ${files.length} scorecard files`);

  for (const file of files) {
    try {
      const filePath = path.join(scorecardDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      await processScorecardData(data);
      process.stdout.write('.');
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  }

  console.log('\n✓ Scorecards imported\n');
}

async function processScorecardData(data) {
  const match = data.match_info || {};
  const innings = data.innings || [];

  const team1Name = match.team_a;
  const team2Name = match.team_b;

  if (!team1Name || !team2Name) return;

  let teamA = await prisma.team.findFirst({
    where: { name: team1Name }
  });

  let teamB = await prisma.team.findFirst({
    where: { name: team2Name }
  });

  if (!teamA) {
    teamA = await prisma.team.create({
      data: {
        name: team1Name,
        shortName: team1Name.substring(0, 3)
      }
    });
  }

  if (!teamB) {
    teamB = await prisma.team.create({
      data: {
        name: team2Name,
        shortName: team2Name.substring(0, 3)
      }
    });
  }

  let dbMatch = await prisma.match.findFirst({
    where: {
      AND: [
        { OR: [{ teamAId: teamA.id }, { teamBId: teamA.id }] },
        { OR: [{ teamAId: teamB.id }, { teamBId: teamB.id }] }
      ]
    }
  });

  if (!dbMatch) {
    dbMatch = await prisma.match.create({
      data: {
        matchId: match.match_id || Math.random() * 10000,
        title: `${team1Name} vs ${team2Name}`,
        matchNumber: match.match_number || 0,
        status: 'completed',
        startDate: new Date(match.date || new Date()),
        teamAId: teamA.id,
        teamBId: teamB.id,
        resultType: 'normal'
      }
    });
  }

  for (let i = 0; i < innings.length; i++) {
    const inning = innings[i];
    const battingTeamName = inning.batting_team;

    let battingTeam = await prisma.team.findFirst({
      where: { name: battingTeamName }
    });

    if (!battingTeam) continue;

    const dbInnings = await prisma.innings.upsert({
      where: {
        matchId_inningsNumber: {
          matchId: dbMatch.id,
          inningsNumber: i + 1
        }
      },
      update: {},
      create: {
        matchId: dbMatch.id,
        inningsNumber: i + 1,
        teamId: battingTeam.id,
        battingTeamId: battingTeam.id,
        runsScored: inning.runs || 0,
        wicketsFallen: inning.wickets || 0,
        overs: inning.overs || 0,
        ballsFaced: inning.balls_faced || 0
      }
    });

    // Add batsmen
    if (inning.batsmen) {
      for (const batsman of inning.batsmen) {
        await prisma.batsman.upsert({
          where: {
            inningsId_playerId: {
              inningsId: dbInnings.id,
              playerId: batsman.player_id || 0
            }
          },
          update: {},
          create: {
            inningsId: dbInnings.id,
            playerId: batsman.player_id || 0,
            playerName: batsman.name || 'Unknown',
            runs: batsman.runs || 0,
            ballsFaced: batsman.balls || 0,
            fours: batsman.fours || 0,
            sixes: batsman.sixes || 0
          }
        });
      }
    }

    // Add bowlers
    if (inning.bowlers) {
      for (const bowler of inning.bowlers) {
        await prisma.bowler.upsert({
          where: {
            inningsId_playerId: {
              inningsId: dbInnings.id,
              playerId: bowler.player_id || 0
            }
          },
          update: {},
          create: {
            inningsId: dbInnings.id,
            playerId: bowler.player_id || 0,
            playerName: bowler.name || 'Unknown',
            overs: bowler.overs || 0,
            runs: bowler.runs || 0,
            wickets: bowler.wickets || 0
          }
        });
      }
    }
  }
}

importAllData();
