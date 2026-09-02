import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import App from './App';

describe('2-Tab Screen Layout Strategy App', () => {
  it('renders Good morning header on Todo tab', () => {
    render(<App />);
    expect(screen.getByText('Good morning')).toBeInTheDocument();
    expect(screen.getByText(/Wednesday, 2 Sep/i)).toBeInTheDocument();
  });

  it('renders today tasks and category tags', () => {
    render(<App />);
    expect(screen.getByText('Check September budget')).toBeInTheDocument();
    expect(screen.getByText('Pay electricity bill')).toBeInTheDocument();
    expect(screen.getByText('Buy groceries — keep under 400 ETB')).toBeInTheDocument();
  });

  it('switches to Expenses tab when Expenses button is clicked', () => {
    render(<App />);
    const expenseTabButtons = screen.getAllByRole('button', { name: /expenses/i });
    fireEvent.click(expenseTabButtons[0]);

    expect(screen.getByText('September balance')).toBeInTheDocument();
    expect(screen.getByText('32,000')).toBeInTheDocument();
    expect(screen.getByText('18,650')).toBeInTheDocument();
    expect(screen.getByText('Food budget almost full — 4 days left')).toBeInTheDocument();
  });
});
