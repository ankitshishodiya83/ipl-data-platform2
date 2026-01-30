require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();

// Import routes
const matchRoutes = require('./routes/matches');
const teamRoutes = require('./routes/teams');
const playerRoutes = require('./routes/players');
const inningsRoutes = require('./routes/innings');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
const buildPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(buildPath));

// Swagger documentation
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'IPL Data Platform API',
    version: '1.0.0',
    description: 'APIs for IPL cricket data including matches, teams, players, and statistics'
  },
  servers: [
    { url: 'http://localhost:5000', description: 'Development server' }
  ],
  components: {
    schemas: {
      Match: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          matchId: { type: 'integer' },
          title: { type: 'string' },
          matchNumber: { type: 'integer' },
          status: { type: 'string' },
          startDate: { type: 'string', format: 'date-time' },
          endDate: { type: 'string', format: 'date-time' },
          teamA: { $ref: '#/components/schemas/Team' },
          teamB: { $ref: '#/components/schemas/Team' },
          venue: { type: 'string' },
          resultType: { type: 'string' }
        }
      },
      Team: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          shortName: { type: 'string' },
          logoUrl: { type: 'string' }
        }
      },
      Player: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          playerId: { type: 'integer' },
          name: { type: 'string' },
          nationality: { type: 'string' },
          primaryRole: { type: 'string' },
          battingStyle: { type: 'string' },
          bowlingStyle: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check endpoint',
        responses: {
          '200': {
            description: 'Server is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    timestamp: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/matches': {
      get: {
        tags: ['Matches'],
        summary: 'Get all matches with pagination and filtering',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'status', in: 'query', schema: { type: 'string' } }
        ],
        responses: {
          '200': {
            description: 'List of matches',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/Match' } },
                    pagination: {
                      type: 'object',
                      properties: {
                        total: { type: 'integer' },
                        page: { type: 'integer' },
                        limit: { type: 'integer' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/teams': {
      get: {
        tags: ['Teams'],
        summary: 'Get all teams',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
        ],
        responses: {
          '200': {
            description: 'List of teams',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/Team' } }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/players': {
      get: {
        tags: ['Players'],
        summary: 'Get all players with pagination',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } }
        ],
        responses: {
          '200': {
            description: 'List of players',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/Player' } }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/innings', inningsRoutes);

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes that don't exist
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Swagger UI at http://localhost:${PORT}/api-docs`);
});
