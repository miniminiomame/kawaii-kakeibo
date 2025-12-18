import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';
import { ThemeProvider } from '../../context/ThemeContext';
import { userEvent } from '@testing-library/user-event';

describe('Transaction Flow', () => {
    it('allows adding and deleting a transaction', async () => {
        const user = userEvent.setup();
        render(
            <ThemeProvider>
                <App />
            </ThemeProvider>
        );

        // 1. Check title
        expect(screen.getByText('かけいぼっ！')).toBeInTheDocument();

        // 2. Add an expense
        const amountInput = screen.getByLabelText('金額 (円)');
        await user.type(amountInput, '1500');

        const noteInput = screen.getByLabelText('メモ');
        await user.type(noteInput, 'Lunch');

        // 2. Add transaction
        const submitBtn = screen.getByRole('button', { name: /記録する/i });
        await user.click(submitBtn);

        // 3. Should auto-switch to List tab (verified by checking for list content)
        await waitFor(() => {
            expect(screen.getByText('-¥1,500')).toBeInTheDocument();
            expect(screen.getByText('Lunch')).toBeInTheDocument();
        });

        // 4. Delete the transaction
        const deleteBtn = screen.getByRole('button', { name: /削除/ });
        await user.click(deleteBtn);

        // 5. Verify it's gone
        await waitFor(() => {
            expect(screen.queryByText('-¥1,500')).not.toBeInTheDocument();
        });
    });
});
