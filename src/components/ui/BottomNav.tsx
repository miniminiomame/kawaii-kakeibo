import styles from './BottomNav.module.css';

interface BottomNavProps {
    activeTab: 'input' | 'list' | 'summary';
    onSwitch: (tab: 'input' | 'list' | 'summary') => void;
}

export function BottomNav({ activeTab, onSwitch }: BottomNavProps) {
    return (
        <nav className={styles.navBar}>
            <button
                className={`${styles.navItem} ${activeTab === 'input' ? styles.active : ''}`}
                onClick={() => onSwitch('input')}
            >
                <span className={styles.icon}>✏️</span>
                <span className={styles.label}>入力</span>
            </button>

            <button
                className={`${styles.navItem} ${activeTab === 'list' ? styles.active : ''}`}
                onClick={() => onSwitch('list')}
            >
                <span className={styles.icon}>📖</span>
                <span className={styles.label}>一覧</span>
            </button>

            <button
                className={`${styles.navItem} ${activeTab === 'summary' ? styles.active : ''}`}
                onClick={() => onSwitch('summary')}
            >
                <span className={styles.icon}>📊</span>
                <span className={styles.label}>分析</span>
            </button>
        </nav>
    );
}
