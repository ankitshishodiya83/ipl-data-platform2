import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [activeLink, setActiveLink] = React.useState(window.location.pathname);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link 
          to="/" 
          style={{
            ...styles.link,
            borderBottom: activeLink === '/' ? '3px solid #ff7f0e' : '3px solid transparent'
          }}
          onClick={() => setActiveLink('/')}
        >
          📊 Dashboard
        </Link>
        <Link 
          to="/matches" 
          style={{
            ...styles.link,
            borderBottom: activeLink === '/matches' ? '3px solid #ff7f0e' : '3px solid transparent'
          }}
          onClick={() => setActiveLink('/matches')}
        >
          🎮 Matches
        </Link>
        <Link 
          to="/teams" 
          style={{
            ...styles.link,
            borderBottom: activeLink === '/teams' ? '3px solid #ff7f0e' : '3px solid transparent'
          }}
          onClick={() => setActiveLink('/teams')}
        >
          👥 Teams
        </Link>
        <Link 
          to="/players" 
          style={{
            ...styles.link,
            borderBottom: activeLink === '/players' ? '3px solid #ff7f0e' : '3px solid transparent'
          }}
          onClick={() => setActiveLink('/players')}
        >
          ⭐ Players
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#2c3e50',
    borderBottom: '3px solid #1f77b4',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    gap: '40px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '16px 0',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
};

export default Navigation;
