const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [teams, total] = await Promise.all([
      prisma.team.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      prisma.team.count()
    ]);

    res.json({
      data: teams,
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

// Get team details with statistics
router.get('/:id', async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        matches: {
          include: {
            teamA: true,
            teamB: true,
            venue: true
          }
        }
      }
    });

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Calculate statistics
    const homeMatches = team.matches.filter(m => m.teamAId === teamId);
    const awayMatches = team.matches.filter(m => m.teamBId === teamId);
    
    const stats = {
      totalMatches: team.matches.length,
      homeMatches: homeMatches.length,
      awayMatches: awayMatches.length,
      matchesWon: team.matches.filter(m => m.resultWinnerId === teamId).length,
      matchesLost: team.matches.filter(m => m.resultWinnerId && m.resultWinnerId !== teamId).length
    };

    res.json({
      ...team,
      statistics: stats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get team's recent matches
router.get('/:id/recent-matches', async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);
    const limit = Math.min(10, parseInt(req.query.limit) || 5);

    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { teamAId: teamId },
          { teamBId: teamId }
        ]
      },
      include: {
        teamA: true,
        teamB: true,
        venue: true
      },
      orderBy: { startDate: 'desc' },
      take: limit
    });

    res.json({
      data: matches
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
