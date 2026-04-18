import { render, screen } from '@testing-library/react';
import App from './App';

describe('Landing page', () => {
  it('renders hero and ip', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /vexusmc/i })).toBeInTheDocument();
    expect(screen.getAllByText(/oyna\.vexusmc\.tech/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /ip kopyala/i }).length).toBeGreaterThan(0);
  });
});
