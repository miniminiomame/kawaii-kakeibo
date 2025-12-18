import styles from './BottomNav.module.css';
import { useTheme } from '../../context/ThemeContext';

interface BottomNavProps {
    activeTab: 'input' | 'list' | 'summary' | 'settings';
    onSwitch: (tab: 'input' | 'list' | 'summary' | 'settings') => void;
}

export function BottomNav({ activeTab, onSwitch }: BottomNavProps) {
    const { theme } = useTheme();

    const getIcon = (tab: string, emoji: string) => {
        if (theme === 'pixel') {
            const map: Record<string, string> = {
                input: '/pixel/icon-pencil.png',
                list: '/pixel/icon-book.png',
                summary: '/pixel/icon-chart.png',
                settings: '/pixel/icon-piggy.png' // Using piggy as settings/menu icon for now or I could generate a gear. Piggy is cute.
            };
            return <img src={map[tab]} alt={tab} className={styles.pixelIcon} />;
        }
        return <span className={styles.icon}>{emoji}</span>;
    };

    return (
        <nav className={styles.navBar}>
            <button
                className={`${styles.navItem} ${activeTab === 'input' ? styles.active : ''}`}
                onClick={() => onSwitch('input')}
            >
                {getIcon('input', '✏️')}
                <span className={styles.label}>入力</span>
            </button>

            <button
                className={`${styles.navItem} ${activeTab === 'list' ? styles.active : ''}`}
                onClick={() => onSwitch('list')}
            >
                {getIcon('list', '📖')}
                <span className={styles.label}>一覧</span>
            </button>

            <button
                className={`${styles.navItem} ${activeTab === 'summary' ? styles.active : ''}`}
                onClick={() => onSwitch('summary')}
            >
                {getIcon('summary', '📊')}
                <span className={styles.label}>分析</span>
            </button>

            <button
                className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
                onClick={() => onSwitch('settings')}
            >
                <span className={styles.icon}>{theme === 'pixel' ? '⚙️' : '⚙️'}</span>
                <span className={styles.label}>設定</span>
            </button>
        </nav>
    );
}
