import React, { useState, useEffect } from 'react';

export const LoadingSpinner = () => (
  <div style={styles.container}>
    <div style={styles.spinner}></div>
    <p>Loading...</p>
  </div>
);

export const ErrorMessage = ({ message }) => (
  <div style={styles.errorContainer}>
    <p style={styles.error}>⚠️ {message}</p>
  </div>
);

export const EmptyState = ({ message = 'No data found' }) => (
  <div style={styles.emptyContainer}>
    <p style={styles.empty}>📭 {message}</p>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    minHeight: '300px',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    padding: '20px',
    background: '#fee',
    border: '1px solid #f99',
    borderRadius: '8px',
    margin: '20px 0',
  },
  error: {
    color: '#c33',
    margin: 0,
    fontSize: '14px',
  },
  emptyContainer: {
    padding: '40px 20px',
    textAlign: 'center',
  },
  empty: {
    color: '#999',
    fontSize: '16px',
  },
};

export default { LoadingSpinner, ErrorMessage, EmptyState };
