import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';

describe('mystery creation', () => {
  it('routes the landing page CTA to the creation form', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(screen.getByRole('link', { name: /open a new case/i }));
    expect(screen.getByRole('heading', { name: /what happened/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/your premise/i)).toBeInTheDocument();
  });

  it('keeps a short premise on the form and explains the validation', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(screen.getByRole('link', { name: /open a new case/i }));
    fireEvent.change(screen.getByLabelText(/your premise/i), { target: { value: 'Short' } });
    fireEvent.click(screen.getByRole('button', { name: /generate investigation/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/at least 12 characters/i);
    expect(screen.getByLabelText(/your premise/i)).toHaveValue('Short');
  });
});
