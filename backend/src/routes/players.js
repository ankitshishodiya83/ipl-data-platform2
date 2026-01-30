const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all players with pagination
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const where = {};
    if (req.query.nationality) {
      where.nationality = req.query.nationality;
    }
    if (req.query.role) {
      where.primaryRole = req.query.role;
    }

    const [players, total] = await Promise.all([
      prisma.player.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      prisma.player.count({ where })
    ]);

    res.json({
      data: players,
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

// Get single player
router.get('/:id', async (req, res) => {
  try {
    const playerId = parseInt(req.params.id);

    const player = await prisma.player.findUnique({
      where: { playerId }
    });

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top batsmen
router.get('/stats/top-batsmen', async (req, res) => {
  try {
    const limit = Math.min(20, parseInt(req.query.limit) || 10);

    const batsmen = await prisma.batsman.groupBy({
      by: ['playerName'],
      _sum: {
        runs: true,
        ballsFaced: true,
        fours: true,
        sixes: true
      },
      _count: {
        id: true
      },
      orderBy: {
        _sum: {
          runs: 'desc'
        }
      },
      take: limit
    });

    res.json({
      data: batsmen
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top bowlers
router.get('/stats/top-bowlers', async (req, res) => {
  try {
    const limit = Math.min(20, parseInt(req.query.limit) || 10);

    const bowlers = await prisma.bowler.groupBy({
      by: ['playerName'],
      _sum: {
        wickets: true,
        runs: true,
        overs: true
      },
      _count: {
        id: true
      },
      orderBy: {
        _sum: {
          wickets: 'desc'
        }
      },
      take: limit
    });

    res.json({
      data: bowlers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
