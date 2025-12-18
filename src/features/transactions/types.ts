export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    date: string; // YYYY-MM-DD
    amount: number;
    type: TransactionType;
    category: string;
    note?: string;
    createdAt: number;
}
