import { type Transaction } from './types.ts';
import { Card } from '../../components/ui/Card.tsx';
import { getCategoryLabel } from '../../constants/categories.ts';
import styles from './TransactionList.module.css';

interface TransactionListProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
}

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
    // Group by date
    const grouped = transactions.reduce((acc, tx) => {
        const key = tx.date;
        if (!acc[key]) acc[key] = [];
        acc[key].push(tx);
        return acc;
    }, {} as Record<string, Transaction[]>);

    // Sort dates descending
    const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    return (
        <div className={styles.container}>
            {sortedDates.length === 0 && (
                <p className={styles.empty}>まだ記録がありません 🍃</p>
            )}

            {sortedDates.map(date => (
                <div key={date} className={styles.dayGroup}>
                    <h3 className={styles.dateHeader}>{date}</h3>
                    {grouped[date].map(tx => (
                        <Card key={tx.id} className={styles.txCard}>
                            <div className={styles.txRow}>
                                <div className={styles.txInfo}>
                                    <span className={styles.emoji}>
                                        {tx.type === 'expense' ? '💸' : '💰'}
                                    </span>
                                    <div className={styles.details}>
                                        <span className={styles.category}>{getCategoryLabel(tx.category)}</span>
                                        {tx.note && <span className={styles.note}>{tx.note}</span>}
                                    </div>
                                </div>
                                <div className={styles.txAmount}>
                                    <span className={tx.type === 'income' ? styles.income : styles.expense}>
                                        {tx.type === 'income' ? '+' : '-'}¥{tx.amount.toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => onDelete(tx.id)}
                                        className={styles.deleteBtn}
                                        aria-label="削除"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
}
