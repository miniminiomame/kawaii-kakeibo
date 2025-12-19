import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getTheme } from '../themes';
import { type ThemeConfig } from '../themes/types';

interface ThemeContextType {
    themeConfig: ThemeConfig;
    setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeId, setThemeId] = useState<string>(() => {
        return localStorage.getItem('theme') || 'default';
    });

    const themeConfig = getTheme(themeId);

    useEffect(() => {
        localStorage.setItem('theme', themeId);

        // Apply global attributes for backward compatibility or global selectors
        document.documentElement.setAttribute('data-theme', themeId);

        // Apply dynamic CSS variables from the config
        Object.entries(themeConfig.styles).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    }, [themeId, themeConfig]);

    return (
        <ThemeContext.Provider value={{ themeConfig, setThemeId }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
