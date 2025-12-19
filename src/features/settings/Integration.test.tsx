import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';
import { ThemeProvider } from '../../context/ThemeContext';
import { SettingsProvider } from '../../context/SettingsContext';
import { TransactionProvider } from '../../context/TransactionContext';
import { userEvent } from '@testing-library/user-event';

describe('Budget Settings Integration', () => {
    it('updates budget limit and affects high income alert', async () => {
        const user = userEvent.setup();
        render(
            <ThemeProvider>
                <SettingsProvider>
                    <TransactionProvider>
                        <App />
                    </TransactionProvider>
                </SettingsProvider>
            </ThemeProvider>
        );

        // 1. Navigate to Settings
        const settingsTab = screen.getByRole('button', { name: /設定/i });
        await user.click(settingsTab);

        // 2. Change limit to 1000 yen (from default 150000)
        const limitInput = screen.getByLabelText('目標ライン (円)');
        await user.clear(limitInput);
        await user.type(limitInput, '1000');

        // 3. Navigate back to Input (Transactions)
        const inputTab = screen.getByRole('button', { name: /入力/i });
        await user.click(inputTab);

        // 4. Select Income type
        const incomeBtn = screen.getByRole('button', { name: /収入/i });
        await user.click(incomeBtn);

        // 5. Enter 1500 yen (should trigger alert now because limit is 1000)
        const amountInput = screen.getByLabelText('金額 (円)');
        await user.type(amountInput, '1500');

        await waitFor(() => {
            expect(screen.getByText(/10% \(¥150\) を貯金しよう！/)).toBeInTheDocument();
        });

        // 6. Enter 500 yen (should NOT trigger alert)
        await user.clear(amountInput);
        await user.type(amountInput, '500');

        await waitFor(() => {
            expect(screen.queryByText(/を貯金しよう/)).not.toBeInTheDocument();
        });
    });
});
