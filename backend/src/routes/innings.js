const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all innings
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const [innings, total] = await Promise.all([
      prisma.innings.findMany({
        include: {
          match: {
            include: { teamA: true, teamB: true }
          },
          battingTeam: true,
          batsmen: { orderBy: { runs: 'desc' } },
          bowlers: { orderBy: { wickets: 'desc' } }
        },
        skip,
        take: limit,
        orderBy: { id: 'desc' }
      }),
      prisma.innings.count()
    ]);

    res.json({
      data: innings,
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

// Get innings details
router.get('/:id', async (req, res) => {
  try {
    const inningsId = parseInt(req.params.id);

    const innings = await prisma.innings.findUnique({
      where: { id: inningsId },
      include: {
        match: {
          include: { teamA: true, teamB: true, venue: true }
        },
        battingTeam: true,
        batsmen: { orderBy: { runs: 'desc' } },
        bowlers: { orderBy: { wickets: 'desc' } }
      }
    });

    if (!innings) {
      return res.status(404).json({ error: 'Innings not found' });
    }

    res.json(innings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
