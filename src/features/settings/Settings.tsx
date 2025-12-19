import { useTheme } from '../../context/ThemeContext';
import { useSettings } from '../../context/SettingsContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './Settings.module.css';

export function Settings() {
    const { themeConfig, setThemeId } = useTheme();
    const { budgetLimit, setBudgetLimit } = useSettings();

    return (
        <div className={styles.container}>
            <Card>
                <h2 className={styles.title}>設定 ⚙️</h2>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>テーマ設定</h3>
                    <div className={styles.themeToggle}>
                        <Button
                            variant={themeConfig.id === 'default' ? 'primary' : 'secondary'}
                            onClick={() => setThemeId('default')}
                            className={themeConfig.id !== 'default' ? styles.inactive : ''}
                        >
                            通常モード 🎀
                        </Button>
                        <Button
                            variant={themeConfig.id === 'pixel' ? 'primary' : 'secondary'}
                            onClick={() => setThemeId('pixel')}
                            className={themeConfig.id !== 'pixel' ? styles.inactive : ''}
                        >
                            ドット絵モード 👾
                        </Button>
                        <Button
                            variant={themeConfig.id === 'cyberpunk' ? 'primary' : 'secondary'}
                            onClick={() => setThemeId('cyberpunk')}
                            className={themeConfig.id !== 'cyberpunk' ? styles.inactive : ''}
                        >
                            サイバー 🤖
                        </Button>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>貯金アラート設定 💰</h3>
                    <p className={styles.settingDesc}>
                        この金額以上の収入があった時、貯金を提案します。
                    </p>
                    <div className={styles.budgetInput}>
                        <Input
                            label="目標ライン (円)"
                            type="number"
                            value={budgetLimit}
                            onChange={(e) => setBudgetLimit(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className={styles.section}>
                    <p className={styles.version}>Kawaii Kakeibo v1.1.0 (Autonomous)</p>
                </div>
            </Card>
        </div>
    );
}
