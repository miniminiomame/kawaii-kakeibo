import { useState } from 'react';
import { Layout } from './components/Layout';
// Button removed as it is used in sub-components, not here anymore
import { BottomNav } from './components/ui/BottomNav';
import { TransactionForm } from './features/transactions/TransactionForm';
import { TransactionList } from './features/transactions/TransactionList';
import { Summary } from './features/summary/Summary';
import { useTransactions } from './features/transactions/useTransactions';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState<'input' | 'list' | 'summary'>('input');
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  return (
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.title}>Kawaii Kakeibo 🎀</h1>
      </header>

      <div className={styles.content}>
        {activeTab === 'input' && (
          <TransactionForm onSubmit={(tx) => {
            addTransaction(tx);
            setActiveTab('list');
          }} />
        )}
        {activeTab === 'list' && (
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        )}
        {activeTab === 'summary' && (
          <Summary transactions={transactions} />
        )}
      </div>

      <BottomNav activeTab={activeTab} onSwitch={setActiveTab} />
    </Layout>
  )
}

export default App
