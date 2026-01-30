import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../pages/Dashboard';
import { BrowserRouter } from 'react-router-dom';

const DashboardWithRouter = () => (
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>
);

describe('Dashboard Page', () => {
  it('renders without crashing', async () => {
    render(<DashboardWithRouter />);
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
  });

  it('displays welcome message', async () => {
    render(<DashboardWithRouter />);
    await waitFor(() => {
      expect(screen.queryByText(/welcome/i)).toBeInTheDocument();
    });
  });

  it('has correct page structure', () => {
    const { container } = render(<DashboardWithRouter />);
    expect(container.querySelector('.page')).toBeInTheDocument();
  });
});
