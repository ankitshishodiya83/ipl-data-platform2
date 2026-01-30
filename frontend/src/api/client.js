import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const matchAPI = {
  getAll: (page = 1, limit = 10) =>
    api.get('/matches', { params: { page, limit } }),
  getById: (id) => api.get(`/matches/${id}`),
  getStats: (id) => api.get(`/matches/${id}/stats`),
};

export const teamAPI = {
  getAll: (page = 1, limit = 10) =>
    api.get('/teams', { params: { page, limit } }),
  getById: (id) => api.get(`/teams/${id}`),
  getRecentMatches: (id, limit = 5) =>
    api.get(`/teams/${id}/recent-matches`, { params: { limit } }),
};

export const playerAPI = {
  getAll: (page = 1, limit = 20) =>
    api.get('/players', { params: { page, limit } }),
  getById: (id) => api.get(`/players/${id}`),
  getTopBatsmen: (limit = 10) =>
    api.get('/players/stats/top-batsmen', { params: { limit } }),
  getTopBowlers: (limit = 10) =>
    api.get('/players/stats/top-bowlers', { params: { limit } }),
};

export const inningsAPI = {
  getAll: (page = 1, limit = 10) =>
    api.get('/innings', { params: { page, limit } }),
  getById: (id) => api.get(`/innings/${id}`),
};

export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
