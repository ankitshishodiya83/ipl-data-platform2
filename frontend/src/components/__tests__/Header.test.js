import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<Header />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('IPL Data Platform');
  });

  it('has the correct styling classes', () => {
    const { container } = render(<Header />);
    const headerDiv = container.querySelector('.header');
    expect(headerDiv).toBeInTheDocument();
  });
});
