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

        /* Colors */
        '--color-primary-pop': '#ff8fa3',
        '--color-primary-shadow': '#ff6b85',
        '--color-secondary-pop': '#a0e8d0',
        '--color-secondary-shadow': '#7ac7b0',
    },
};
