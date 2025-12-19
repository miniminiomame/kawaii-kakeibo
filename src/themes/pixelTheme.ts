import { type ThemeConfig } from './types';

export const pixelTheme: ThemeConfig = {
    id: 'pixel',
    name: 'Pixel Art',
    assets: {
        iconInput: '/pixel/icon-pencil.png',
        iconList: '/pixel/icon-book.png',
        iconSummary: '/pixel/icon-chart.png',
        iconSettings: '/pixel/icon-piggy.png',
    },
    styles: {
        '--font-main': '"DotGothic16", sans-serif',
        '--pattern-bg': 'url("/pixel/bg-pattern.png")',
        '--pattern-size': '64px 64px',
        '--cursor': 'crosshair',
        '--image-rendering': 'pixelated',
    },
};
