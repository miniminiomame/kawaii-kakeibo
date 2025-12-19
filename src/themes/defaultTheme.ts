import { type ThemeConfig } from './types';

export const defaultTheme: ThemeConfig = {
    id: 'default',
    name: 'Default (Kawaii)',
    assets: {
        iconInput: '✏️',
        iconList: '📖',
        iconSummary: '📊',
        iconSettings: '⚙️',
    },
    styles: {
        '--font-main': '"Mochiy Pop P One", "Zen Maru Gothic", sans-serif',
        '--pattern-bg': 'radial-gradient(#ffd1dc 20%, transparent 20%) 0 0',
        '--pattern-size': '20px 20px',
        '--cursor': 'auto',
        '--image-rendering': 'auto',

        /* Components */
        '--btn-radius': '20px',
        '--btn-border': 'none',
        '--card-radius': '24px',
        '--card-border': '1px solid rgba(0, 0, 0, 0.02)',

        /* Colors - Cherry Blossom Palette 🌸 */
        '--color-primary-pop': '#ffb7c5',    /* Sakura Pink (Lighter) */
        '--color-primary-shadow': '#ff8fa3', /* Darker Pink Shadow */
        '--color-secondary-pop': '#caffbf',  /* Soft Mint */
        '--color-secondary-shadow': '#a0e8d0', /* Darker Mint Shadow */
    },
};
