import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Players from './pages/Players';
import { healthAPI } from './api/client';

function App() {
  const [apiHealthy, setApiHealthy] = useState(false);

  useEffect(() => {
    // Check API health
    healthAPI.check()
      .then(() => setApiHealthy(true))
      .catch(() => setApiHealthy(false));
  }, []);

  return (
    <Router>
      <Header />
      <Navigation />
      {!apiHealthy && (
        <div style={styles.warning}>
          ⚠️ Backend API is not reachable. Make sure it's running on http://localhost:5000
        </div>
      )}
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
        </Routes>
      </main>
      <footer style={styles.footer}>
        <p>&copy; 2025 IPL Data Platform. All rights reserved.</p>
      </footer>
    </Router>
  );
}

const styles = {
  main: {
    minHeight: 'calc(100vh - 200px)',
  },
  warning: {
    background: '#fff3cd',
    border: '1px solid #ffc107',
    color: '#856404',
    padding: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    background: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    marginTop: '40px',
  },
};

export default App;
