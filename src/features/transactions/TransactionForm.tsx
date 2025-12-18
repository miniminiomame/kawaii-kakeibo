import { useState, type FormEvent } from 'react';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { type Transaction, type TransactionType } from './types.ts';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/categories.ts';
import styles from './TransactionForm.module.css';

interface TransactionFormProps {
    onSubmit: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
    const [type, setType] = useState<TransactionType>('expense');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].value);
    const [note, setNote] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!amount || !category) return;

        onSubmit({
            type,
            date,
            amount: parseInt(amount),
            category,
            note,
        });

        // Reset form
        setAmount('');
        setNote('');
    };

    const isHighIncome = type === 'income' && parseInt(amount || '0') >= 150000;

    return (
        <Card className={styles.formCard}>
            <div className={styles.typeToggle}>
                <Button
                    type="button"
                    variant={type === 'expense' ? 'danger' : 'secondary'}
                    onClick={() => setType('expense')}
                    className={type !== 'expense' ? styles.inactive : ''}
                >
                    支出 💸
                </Button>
                <Button
                    type="button"
                    variant={type === 'income' ? 'primary' : 'secondary'}
                    onClick={() => setType('income')}
                    className={type !== 'income' ? styles.inactive : ''}
                >
                    収入 💰
                </Button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="日付"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <div>
                    <Input
                        label="金額 (円)"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0"
                        required
                        min="1"
                    />
                    {isHighIncome && (
                        <div className={styles.savingsAlert}>
                            ✨ すごい！10% (¥{(parseInt(amount) * 0.1).toLocaleString()}) を貯金しよう！ 🏦
                        </div>
                    )}
                </div>
                <Select
                    label="カテゴリー"
                    options={type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
                <Input
                    label="メモ"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="コンビニなど"
                />

                <Button type="submit" variant="primary" className={styles.submitBtn}>
                    記録する 🖊️
                </Button>
            </form>
        </Card>
    );
}
