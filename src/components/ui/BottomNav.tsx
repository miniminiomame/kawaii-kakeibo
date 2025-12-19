import styles from './BottomNav.module.css';
import { useTheme } from '../../context/ThemeContext';

interface BottomNavProps {
    activeTab: 'input' | 'list' | 'summary' | 'settings';
    onSwitch: (tab: 'input' | 'list' | 'summary' | 'settings') => void;
}

export function BottomNav({ activeTab, onSwitch }: BottomNavProps) {
    const { themeConfig } = useTheme();

    const renderIcon = (icon: React.ReactNode | string, alt: string) => {
        if (typeof icon === 'string' && icon.startsWith('/')) {
            return <img src={icon} alt={alt} className={styles.pixelIcon} />;
        }
        return <span className={styles.icon}>{icon}</span>;
    };

    return (
        <nav className={styles.navBar}>
            <button
                className={`${styles.navItem} ${activeTab === 'input' ? styles.active : ''}`}
                onClick={() => onSwitch('input')}
            >
                {renderIcon(themeConfig.assets.iconInput, 'Input')}
                <span className={styles.label}>入力</span>
            </button>

            <button
                className={`${styles.navItem} ${activeTab === 'list' ? styles.active : ''}`}
                onClick={() => onSwitch('list')}
            >
                {renderIcon(themeConfig.assets.iconList, 'List')}
                <span className={styles.label}>一覧</span>
            </button>

            <button
                className={`${styles.navItem} ${activeTab === 'summary' ? styles.active : ''}`}
                onClick={() => onSwitch('summary')}
            >
                {renderIcon(themeConfig.assets.iconSummary, 'Summary')}
                <span className={styles.label}>分析</span>
            </button>

            <button
                className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
                onClick={() => onSwitch('settings')}
            >
                {renderIcon(themeConfig.assets.iconSettings, 'Settings')}
                <span className={styles.label}>設定</span>
            </button>
        </nav>
    );
}
