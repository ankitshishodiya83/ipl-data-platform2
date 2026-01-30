import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Teams from '../pages/Teams';
import { BrowserRouter } from 'react-router-dom';

const TeamsWithRouter = () => (
  <BrowserRouter>
    <Teams />
  </BrowserRouter>
);

describe('Teams Page', () => {
  it('renders without crashing', async () => {
    render(<TeamsWithRouter />);
    await waitFor(() => {
      expect(screen.getByText(/teams/i)).toBeInTheDocument();
    });
  });

  it('displays teams table', () => {
    const { container } = render(<TeamsWithRouter />);
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('has page structure', () => {
    const { container } = render(<TeamsWithRouter />);
    expect(container.querySelector('.page')).toBeInTheDocument();
  });
});
