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
    },
};
