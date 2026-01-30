import React, { useState, useEffect } from 'react';
import { playerAPI } from '../api/client';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/States';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [topBatsmen, setTopBatsmen] = useState([]);
  const [topBowlers, setTopBowlers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadPlayersData();
  }, []);

  const loadPlayersData = async () => {
    try {
      setLoading(true);
      const [playersRes, batsmenRes, bowlersRes] = await Promise.all([
        playerAPI.getAll(1, 20),
        playerAPI.getTopBatsmen(10),
        playerAPI.getTopBowlers(10),
      ]);

      setPlayers(playersRes.data.data);
      setPagination(playersRes.data.pagination);
      
      // Format top batsmen for chart
      const batsmenData = batsmenRes.data.data.slice(0, 5).map(b => ({
        name: b.playerName,
        runs: b._sum.runs || 0,
      }));
      setTopBatsmen(batsmenData);

      // Format top bowlers for chart
      const bowlersData = bowlersRes.data.data.slice(0, 5).map(b => ({
        name: b.playerName,
        wickets: b._sum.wickets || 0,
      }));
      setTopBowlers(bowlersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div style={styles.container}>
      <h2>IPL Players</h2>

      {/* Charts */}
      <div style={styles.chartsContainer}>
        <div style={styles.chartBox}>
          <h3>Top 5 Batsmen</h3>
          {topBatsmen.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topBatsmen}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="runs" fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState message="No batsmen data" />
          )}
        </div>

        <div style={styles.chartBox}>
          <h3>Top 5 Bowlers</h3>
          {topBowlers.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topBowlers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wickets" fill="#764ba2" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState message="No bowlers data" />
          )}
        </div>
      </div>

      {/* Players Table */}
      <div style={styles.section}>
        <h3>All Players</h3>
        {players.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={styles.cell}>Name</th>
                  <th style={styles.cell}>Role</th>
                  <th style={styles.cell}>Nationality</th>
                  <th style={styles.cell}>Batting Style</th>
                  <th style={styles.cell}>Bowling Style</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id} style={styles.row}>
                    <td style={styles.cell}>{player.name}</td>
                    <td style={styles.cell}>
                      <span style={styles.badge}>{player.primaryRole || 'N/A'}</span>
                    </td>
                    <td style={styles.cell}>{player.nationality || 'N/A'}</td>
                    <td style={styles.cell}>{player.battingStyle || 'N/A'}</td>
                    <td style={styles.cell}>{player.bowlingStyle || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState message="No players found" />
        )}
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
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  chartBox: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  section: {
    marginTop: '40px',
  },
  tableContainer: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'auto',
    marginTop: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    background: '#f5f5f5',
    borderBottom: '2px solid #ddd',
  },
  row: {
    borderBottom: '1px solid #eee',
  },
  cell: {
    padding: '12px 15px',
    textAlign: 'left',
  },
  badge: {
    background: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
};

export default Players;
