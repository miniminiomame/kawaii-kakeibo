import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import { TransactionProvider } from './context/TransactionContext';

describe('App', () => {
    it('renders title', () => {
        render(
            <ThemeProvider>
                <SettingsProvider>
                    <TransactionProvider>
                        <App />
                    </TransactionProvider>
                </SettingsProvider>
            </ThemeProvider>
        );
        expect(screen.getByText('かけいぼっ！')).toBeInTheDocument();
    });
});
