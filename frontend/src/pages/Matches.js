import React, { useState, useEffect } from 'react';
import { matchAPI } from '../api/client';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/States';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMatches(pagination.page);
  }, []);

  const loadMatches = async (page) => {
    try {
      setLoading(true);
      const res = await matchAPI.getAll(page, pagination.limit);
      setMatches(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!matches.length) return <EmptyState message="No matches found" />;

  return (
    <div style={styles.container}>
      <h2>IPL Matches</h2>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.cell}>Match</th>
              <th style={styles.cell}>Teams</th>
              <th style={styles.cell}>Date</th>
              <th style={styles.cell}>Venue</th>
              <th style={styles.cell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id} style={styles.row}>
                <td style={styles.cell}>#{match.matchNumber}</td>
                <td style={styles.cell}>
                  {match.teamA?.name} vs {match.teamB?.name}
                </td>
                <td style={styles.cell}>
                  {new Date(match.startDate).toLocaleDateString()}
                </td>
                <td style={styles.cell}>{match.venue?.name || 'N/A'}</td>
                <td style={styles.cell}>
                  <span style={styles.status}>{match.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          disabled={pagination.page === 1}
          onClick={() => loadMatches(pagination.page - 1)}
          style={styles.paginationBtn}
        >
          ← Previous
        </button>
        <span>Page {pagination.page} of {pagination.pages}</span>
        <button
          disabled={pagination.page === pagination.pages}
          onClick={() => loadMatches(pagination.page + 1)}
          style={styles.paginationBtn}
        >
          Next →
        </button>
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
  tableContainer: {
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'auto',
    marginTop: '20px',
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
    '&:hover': {
      background: '#f9f9f9',
    }
  },
  cell: {
    padding: '12px 15px',
    textAlign: 'left',
  },
  status: {
    background: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px',
    padding: '20px',
  },
  paginationBtn: {
    padding: '8px 16px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Matches;
