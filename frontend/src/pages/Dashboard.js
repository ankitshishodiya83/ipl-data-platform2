import React, { useState, useEffect } from 'react';
import { matchAPI, teamAPI, playerAPI } from '../api/client';
import { LoadingSpinner, ErrorMessage } from '../components/States';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMatches: 0,
    totalTeams: 0,
    totalPlayers: 0,
  });
  const [matchTrends, setMatchTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [matchRes, teamRes, playerRes] = await Promise.all([
          matchAPI.getAll(1, 1),
          teamAPI.getAll(1, 100),
          playerAPI.getAll(1, 1),
        ]);

        setStats({
          totalMatches: matchRes.data.pagination.total,
          totalTeams: teamRes.data.pagination.total,
          totalPlayers: playerRes.data.pagination.total,
        });

        // Generate mock trend data
        const trends = Array.from({ length: 12 }, (_, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          matches: Math.floor(Math.random() * 10) + 5,
        }));
        setMatchTrends(trends);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={styles.container}>
      <h2>Dashboard Overview</h2>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>📊 Total Matches</h3>
          <p style={styles.statNumber}>{stats.totalMatches}</p>
        </div>
        <div style={styles.statCard}>
          <h3>🏏 Total Teams</h3>
          <p style={styles.statNumber}>{stats.totalTeams}</p>
        </div>
        <div style={styles.statCard}>
          <h3>👥 Total Players</h3>
          <p style={styles.statNumber}>{stats.totalPlayers}</p>
        </div>
      </div>

      {/* Charts */}
      <div style={styles.chartContainer}>
        <div style={styles.chart}>
          <h3>Matches Per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={matchTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="matches" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chart}>
          <h3>Match Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={matchTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="matches" stroke="#667eea" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    margin: '30px 0',
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '10px 0 0 0',
  },
  chartContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '20px',
    margin: '30px 0',
  },
  chart: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

export default Dashboard;
