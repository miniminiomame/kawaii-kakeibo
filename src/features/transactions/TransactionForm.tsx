import { useState, FormEvent } from 'react';
import { Button } from '../../components/ui/Button.tsx';
import { Input } from '../../components/ui/Input.tsx';
import { Select } from '../../components/ui/Select.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { Transaction, TransactionType } from './types.ts';
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
        if (!amount) return;

        onSubmit({
            type,
            amount: Number(amount),
            date,
            category,
            note,
        });

        // Reset some fields
        setAmount('');
        setNote('');
    };

    return (
        <Card className={styles.container}>
            <div className={styles.typeToggle}>
                <Button
                    variant={type === 'expense' ? 'danger' : 'secondary'}
                    className={type === 'income' ? styles.inactive : ''}
                    onClick={() => { setType('expense'); setCategory('food'); }}
                >
                    出費 💸
                </Button>
                <Button
                    variant={type === 'income' ? 'secondary' : 'secondary'}
                    className={type === 'expense' ? styles.inactive : ''}
                    onClick={() => { setType('income'); setCategory('salary'); }}
                >
                    収入 💰
                </Button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="日付"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                />
                <Input
                    label="金額 (円)"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0"
                    required
                />
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
