import { useState } from 'react';
import { Layout } from './components/Layout';
import { Button } from './components/ui/Button';
import { TransactionForm } from './features/transactions/TransactionForm';
import { TransactionList } from './features/transactions/TransactionList';
import { useTransactions } from './features/transactions/useTransactions';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState<'input' | 'list'>('input');
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  return (
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.title}>Kawaii Kakeibo 🎀</h1>
      </header>

      <div className={styles.tabContainer}>
        <Button
          variant={activeTab === 'input' ? 'primary' : 'secondary'}
          className={activeTab === 'list' ? styles.inactiveTab : ''}
          onClick={() => setActiveTab('input')}
        >
          入力 ✏️
        </Button>
        <Button
          variant={activeTab === 'list' ? 'primary' : 'secondary'}
          className={activeTab === 'input' ? styles.inactiveTab : ''}
          onClick={() => setActiveTab('list')}
        >
          一覧 📖
        </Button>
      </div>

      <div className={styles.content}>
        {activeTab === 'input' ? (
          <TransactionForm onSubmit={(tx) => {
            addTransaction(tx);
            setActiveTab('list'); // Auto switch to list on submit
          }} />
        ) : (
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        )}
      </div>
    </Layout>
  )
}

export default App
