import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Matches from '../pages/Matches';
import { BrowserRouter } from 'react-router-dom';

const MatchesWithRouter = () => (
  <BrowserRouter>
    <Matches />
  </BrowserRouter>
);

describe('Matches Page', () => {
  it('renders without crashing', async () => {
    render(<MatchesWithRouter />);
    await waitFor(() => {
      expect(screen.getByText(/matches/i)).toBeInTheDocument();
    });
  });

  it('displays matches table', () => {
    const { container } = render(<MatchesWithRouter />);
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('has page structure', () => {
    const { container } = render(<MatchesWithRouter />);
    expect(container.querySelector('.page')).toBeInTheDocument();
  });

  it('displays loading or matches list', async () => {
    render(<MatchesWithRouter />);
    await waitFor(() => {
      const pageElement = screen.getByText(/matches/i);
      expect(pageElement).toBeInTheDocument();
    });
  });
});
