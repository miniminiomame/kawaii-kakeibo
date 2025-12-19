import { type ThemeConfig } from './types';

export const cyberpunkTheme: ThemeConfig = {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    assets: {
        iconInput: '⌨️',
        iconList: '💾',
        iconSummary: '📉',
        iconSettings: '🔧',
    },
    styles: {
        '--font-main': '"Orbitron", sans-serif',
        '--color-bg-base': '#0d0d12',
        '--color-bg-card': '#1a1a24',
        '--color-text-main': '#00ff9d',
        '--color-text-sub': '#00b8ff',
        '--color-primary': '#ff0055',
        '--color-secondary': '#00ff9d',
        '--pattern-bg': 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 157, .03) 25%, rgba(0, 255, 157, .03) 26%, transparent 27%, transparent 74%, rgba(0, 255, 157, .03) 75%, rgba(0, 255, 157, .03) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 157, .03) 25%, rgba(0, 255, 157, .03) 26%, transparent 27%, transparent 74%, rgba(0, 255, 157, .03) 75%, rgba(0, 255, 157, .03) 76%, transparent 77%, transparent)',
        '--pattern-size': '50px 50px',
        '--cursor': 'text',
        '--image-rendering': 'auto',
        '--shadow-sm': '0 0 10px rgba(0, 255, 157, 0.5)',
        '--shadow-push': '0 0 15px rgba(255, 0, 85, 0.7)',

        /* Components */
        '--btn-radius': '2px',
        '--btn-border': '1px solid var(--color-secondary)',
        '--card-radius': '8px',
        '--card-border': '1px solid var(--color-primary)',
    },
};
