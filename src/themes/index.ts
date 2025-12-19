import { defaultTheme } from './defaultTheme';
import { pixelTheme } from './pixelTheme';
import { type ThemeConfig } from './types';

export const themes: Record<string, ThemeConfig> = {
    default: defaultTheme,
    pixel: pixelTheme,
};

export const getTheme = (id: string): ThemeConfig => {
    return themes[id] || defaultTheme;
};
