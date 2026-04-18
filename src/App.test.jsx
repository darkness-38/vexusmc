import { render, screen } from '@testing-library/react';
import App from './App';

describe('Coming Soon page', () => {
  it('renders coming soon message and email form', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /vexusmc/i })).toBeInTheDocument();
    expect(screen.getByText(/yakinda geliyor/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e-postanizi girin/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bildirim al/i })).toBeInTheDocument();
  });
});
