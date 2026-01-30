import React from 'react';

const Header = () => {
  const headerStyle = {
    background: 'linear-gradient(135deg, #1f77b4 0%, #ff7f0e 50%, #2ca02c 100%)',
    color: 'white',
    padding: '30px 0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    borderBottom: '3px solid #17a2b8',
    textAlign: 'center'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const titleStyle = {
    fontSize: '42px',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
  };

  const subtitleStyle = {
    fontSize: '18px',
    margin: '0',
    opacity: 0.95,
    fontWeight: '300'
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>🏏 IPL Data Platform</h1>
        <p style={subtitleStyle}>Cricket Insights & Advanced Analytics</p>
      </div>
    </header>
  );
};

export default Header;
