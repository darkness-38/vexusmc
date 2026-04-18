import { render, screen } from '@testing-library/react';
import App from './App';

describe('Coming Soon page', () => {
  it('renders coming soon message', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /vexusmc/i })).toBeInTheDocument();
    expect(screen.getByText(/yakinda geliyor/i)).toBeInTheDocument();
  });
});
