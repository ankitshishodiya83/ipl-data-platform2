import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Players from '../pages/Players';
import { BrowserRouter } from 'react-router-dom';

const PlayersWithRouter = () => (
  <BrowserRouter>
    <Players />
  </BrowserRouter>
);

describe('Players Page', () => {
  it('renders without crashing', async () => {
    render(<PlayersWithRouter />);
    await waitFor(() => {
      expect(screen.getByText(/players/i)).toBeInTheDocument();
    });
  });

  it('displays players content', () => {
    const { container } = render(<PlayersWithRouter />);
    expect(container.querySelector('.page')).toBeInTheDocument();
  });

  it('has correct page structure', () => {
    const { container } = render(<PlayersWithRouter />);
    const pageElement = container.querySelector('.page');
    expect(pageElement).toBeInTheDocument();
  });
});
