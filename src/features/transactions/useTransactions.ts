import { useState, useEffect } from 'react';
import { Transaction } from './types.ts';

const STORAGE_KEY = 'kawaii_kakeibo_transactions';

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    // Load from local storage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setTransactions(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load transactions', e);
        } finally {
            setLoading(false);
        }
    }, []);

    // Save to local storage whenever transactions change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        }
    }, [transactions, loading]);

    const addTransaction = (tx: Omit<Transaction, 'id' | 'createdAt'>) => {
        const newTx: Transaction = {
            ...tx,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        };
        setTransactions(prev => [newTx, ...prev]);
    };

    const deleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    return {
        transactions,
        addTransaction,
        deleteTransaction,
        loading
    };
}
