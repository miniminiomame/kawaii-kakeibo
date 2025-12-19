import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Transaction } from '../features/transactions/types';

const STORAGE_KEY = 'kawaii_kakeibo_transactions';

interface TransactionContextType {
    transactions: Transaction[];
    addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void;
    deleteTransaction: (id: string) => void;
    loading: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
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

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, loading }}>
            {children}
        </TransactionContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTransactions() {
    const context = useContext(TransactionContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
}
