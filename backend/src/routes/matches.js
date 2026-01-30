const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all matches with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const where = {};
    if (req.query.status) {
      where.status = req.query.status;
    }

    const [matches, total] = await Promise.all([
      prisma.match.findMany({
        where,
        include: {
          teamA: true,
          teamB: true,
          venue: true,
          innings: {
            include: {
              batsmen: { take: 5 },
              bowlers: { take: 5 }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { startDate: 'desc' }
      }),
      prisma.match.count({ where })
    ]);

    res.json({
      data: matches,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single match
router.get('/:id', async (req, res) => {
  try {
    const matchId = parseInt(req.params.id);

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        teamA: true,
        teamB: true,
        venue: true,
        innings: {
          include: {
            batsmen: { orderBy: { runs: 'desc' } },
            bowlers: { orderBy: { wickets: 'desc' } },
            battingTeam: true
          }
        }
      }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get match statistics
router.get('/:id/stats', async (req, res) => {
  try {
    const matchId = parseInt(req.params.id);

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        innings: {
          include: {
            batsmen: true,
            bowlers: true
          }
        }
      }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const stats = {
      totalRuns: match.innings.reduce((sum, i) => sum + i.runsScored, 0),
      totalWickets: match.innings.reduce((sum, i) => sum + i.wicketsFallen, 0),
      highestIndividualScore: Math.max(
        ...match.innings.flatMap(i => i.batsmen.map(b => b.runs))
      ),
      bestBowlingFigures: {
        wickets: Math.max(...match.innings.flatMap(i => i.bowlers.map(b => b.wickets))),
        runs: Math.min(...match.innings.flatMap(i => i.bowlers.filter(b => b.wickets > 0).map(b => b.runs)))
      }
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
