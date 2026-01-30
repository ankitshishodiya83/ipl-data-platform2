import React, { useState, useEffect } from 'react';
import { teamAPI } from '../api/client';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/States';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTeams(pagination.page);
  }, []);

  const loadTeams = async (page) => {
    try {
      setLoading(true);
      const res = await teamAPI.getAll(page, pagination.limit);
      setTeams(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!teams.length) return <EmptyState message="No teams found" />;

  return (
    <div style={styles.container}>
      <h2>IPL Teams</h2>

      <div style={styles.gridContainer}>
        {teams.map((team) => (
          <div key={team.id} style={styles.teamCard}>
            <h3>{team.name}</h3>
            <p style={styles.shortName}>{team.shortName}</p>
            <div style={styles.cardDetails}>
              <a
                href={`/teams/${team.id}`}
                style={styles.link}
              >
                View Details →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          disabled={pagination.page === 1}
          onClick={() => loadTeams(pagination.page - 1)}
          style={styles.paginationBtn}
        >
          ← Previous
        </button>
        <span>Page {pagination.page} of {pagination.pages}</span>
        <button
          disabled={pagination.page === pagination.pages}
          onClick={() => loadTeams(pagination.page + 1)}
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
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  teamCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  shortName: {
    color: '#667eea',
    fontSize: '14px',
    margin: '5px 0',
    fontWeight: 'bold',
  },
  cardDetails: {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '30px',
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

export default Teams;
