import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../components/Navigation';
import { BrowserRouter } from 'react-router-dom';

const NavigationWithRouter = () => (
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>
);

describe('Navigation Component', () => {
  it('renders without crashing', () => {
    render(<NavigationWithRouter />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays all navigation links', () => {
    render(<NavigationWithRouter />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/matches/i)).toBeInTheDocument();
    expect(screen.getByText(/teams/i)).toBeInTheDocument();
    expect(screen.getByText(/players/i)).toBeInTheDocument();
  });

  it('has navigation items', () => {
    const { container } = render(<NavigationWithRouter />);
    const navItems = container.querySelectorAll('a');
    expect(navItems.length).toBeGreaterThan(0);
  });
});
