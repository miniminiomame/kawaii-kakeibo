import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';
import { userEvent } from '@testing-library/user-event';

describe('Summary Visualization', () => {
    it('calculates totals and shows chart legend', async () => {
        const user = userEvent.setup();
        render(<App />);

        // 1. Add an expense (Food)
        const amountInput = screen.getByLabelText('金額 (円)');
        await user.type(amountInput, '1000');
        // Default category is Food
        const submitBtn = screen.getByRole('button', { name: /記録する/i });
        await user.click(submitBtn);

        // 2. Switch to Summary Tab
        const summaryTab = screen.getByRole('button', { name: /分析/i });
        await user.click(summaryTab);

        // 3. Check for specific summary elements
        // Note: Adjust text matcher based on exact rendering
        await waitFor(() => {
            expect(screen.getByText('今月の残高')).toBeInTheDocument();
            expect(screen.getByText('-¥1,000')).toBeInTheDocument(); // Expense shows as negative in summary list
            expect(screen.getByText('食費 🍔')).toBeInTheDocument(); // Legend item
        });
    });
});
