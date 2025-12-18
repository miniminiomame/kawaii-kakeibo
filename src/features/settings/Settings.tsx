import { useTheme } from '../../context/ThemeContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import styles from './Settings.module.css';

export function Settings() {
    const { theme, setTheme } = useTheme();

    return (
        <div className={styles.container}>
            <Card>
                <h2 className={styles.title}>設定 ⚙️</h2>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>テーマ設定</h3>
                    <div className={styles.themeToggle}>
                        <Button
                            variant={theme === 'default' ? 'primary' : 'secondary'}
                            onClick={() => setTheme('default')}
                            className={theme !== 'default' ? styles.inactive : ''}
                        >
                            通常モード 🎀
                        </Button>
                        <Button
                            variant={theme === 'pixel' ? 'primary' : 'secondary'}
                            onClick={() => setTheme('pixel')}
                            className={theme !== 'pixel' ? styles.inactive : ''}
                        >
                            ドット絵モード 👾
                        </Button>
                    </div>
                </div>

                <div className={styles.section}>
                    <p className={styles.version}>Kawaii Kakeibo v1.0.0</p>
                </div>
            </Card>
        </div>
    );
}
