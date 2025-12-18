import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface SettingsContextType {
    budgetLimit: number;
    setBudgetLimit: (limit: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [budgetLimit, setBudgetLimitState] = useState<number>(() => {
        const saved = localStorage.getItem('budgetLimit');
        return saved ? parseInt(saved, 10) : 150000;
    });

    useEffect(() => {
        localStorage.setItem('budgetLimit', budgetLimit.toString());
    }, [budgetLimit]);

    return (
        <SettingsContext.Provider value={{ budgetLimit, setBudgetLimit: setBudgetLimitState }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
