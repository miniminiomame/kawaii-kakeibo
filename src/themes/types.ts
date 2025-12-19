import { type ReactNode } from 'react';

export interface ThemeAssets {
    iconInput: ReactNode | string;
    iconList: ReactNode | string;
    iconSummary: ReactNode | string;
    iconSettings: ReactNode | string;
}

export interface ThemeStyles {
    '--font-main': string;
    '--pattern-bg': string;
    '--pattern-size': string;
    '--cursor': string;
    '--image-rendering': string;
    [key: string]: string;
}

export interface ThemeConfig {
    id: 'default' | 'pixel';
    name: string;
    assets: ThemeAssets;
    styles: ThemeStyles;
}
