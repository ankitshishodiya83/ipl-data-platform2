const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const app = require('../index.js');

const prisma = new PrismaClient();

describe('Health Check Endpoint', () => {
  it('should return 200 with health status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('healthy');
  });
});

describe('Matches API', () => {
  it('should get all matches with pagination', async () => {
    const response = await request(app)
      .get('/api/matches?page=1&limit=10')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should handle pagination parameters', async () => {
    const response = await request(app)
      .get('/api/matches?page=2&limit=5')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('total');
  });

  it('should return 404 for invalid endpoint', async () => {
    await request(app)
      .get('/api/matches/invalid/9999')
      .expect(404);
  });
});

describe('Teams API', () => {
  it('should get all teams', async () => {
    const response = await request(app)
      .get('/api/teams')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should filter teams by name', async () => {
    const response = await request(app)
      .get('/api/teams?search=Chennai')
      .expect(200);

    expect(response.body).toHaveProperty('data');
  });
});

describe('Players API', () => {
  it('should get all players', async () => {
    const response = await request(app)
      .get('/api/players?page=1&limit=20')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should handle player filtering', async () => {
    const response = await request(app)
      .get('/api/players?role=BATSMAN')
      .expect(200);

    expect(response.body).toHaveProperty('data');
  });
});

describe('Innings API', () => {
  it('should get innings data', async () => {
    const response = await request(app)
      .get('/api/innings?page=1&limit=10')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('data');
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
