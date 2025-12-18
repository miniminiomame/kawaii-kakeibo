import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

import { ThemeProvider } from './context/ThemeContext';

describe('App', () => {
    it('renders title', () => {
        render(
            <ThemeProvider>
                <App />
            </ThemeProvider>
        );
        expect(screen.getByText('かけいぼっ！')).toBeInTheDocument();
    });
});
