import { type Transaction } from '../transactions/types';
import { Card } from '../../components/ui/Card';
import { getCategoryLabel } from '../../constants/categories';
import styles from './Summary.module.css';

interface SummaryProps {
    transactions: Transaction[];
}

export function Summary({ transactions }: SummaryProps) {
    // Calculate totals
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Calculate category breakdown for expenses
    const categoryTotals = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {} as Record<string, number>);

    const sortedCategories = Object.entries(categoryTotals)
        .sort(([, a], [, b]) => b - a);

    // Simple Pie Chart Logic (Conic Gradient)
    const totalForChart = totalExpense || 1; // Avoid divide by zero
    let currentAngle = 0;
    const gradientParts = sortedCategories.map(([_, amount], index) => {
        const percentage = (amount / totalForChart) * 100;
        const start = currentAngle;
        const end = currentAngle + percentage;
        currentAngle = end;
        // Alternate pastel colors for simplicity, or map specific colors
        const colors = ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
        const color = colors[index % colors.length];
        return `${color} ${start}% ${end}%`;
    });

    const pieStyle = {
        background: `conic-gradient(${gradientParts.join(', ') || '#f0f0f0 0% 100%'})`
    };

    return (
        <div className={styles.container}>
            <Card className={styles.balanceCard}>
                <h3 className={styles.label}>今月の残高</h3>
                <p className={`${styles.balance} ${balance >= 0 ? styles.plus : styles.minus}`}>
                    ¥{balance.toLocaleString()}
                </p>
                <div className={styles.summaryRow}>
                    <div className={styles.incomeItem}>
                        <span className={styles.smLabel}>収入</span>
                        <span className={styles.incomeVal}>+¥{totalIncome.toLocaleString()}</span>
                    </div>
                    <div className={styles.expenseItem}>
                        <span className={styles.smLabel}>支出</span>
                        <span className={styles.expenseVal}>-¥{totalExpense.toLocaleString()}</span>
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className={styles.label}>支出の内訳 🍰</h3>
                <div className={styles.chartContainer}>
                    <div className={styles.pieChart} style={pieStyle} />
                    <div className={styles.legend}>
                        {sortedCategories.map(([cat, amount], index) => (
                            <div key={cat} className={styles.legendItem}>
                                <span className={styles.dot} style={{ backgroundColor: ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'][index % 5] }} />
                                <span className={styles.catName}>{getCategoryLabel(cat)}</span>
                                <span className={styles.catAmount}>¥{amount.toLocaleString()}</span>
                            </div>
                        ))}
                        {sortedCategories.length === 0 && <p className={styles.noData}>データなし</p>}
                    </div>
                </div>
            </Card>
        </div>
    );
}
