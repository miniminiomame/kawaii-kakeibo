import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';

describe('App', () => {
    it('renders title', () => {
        render(
            <ThemeProvider>
                <SettingsProvider>
                    <App />
                </SettingsProvider>
            </ThemeProvider>
        );
        expect(screen.getByText('かけいぼっ！')).toBeInTheDocument();
    });
});
