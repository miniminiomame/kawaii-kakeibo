export const EXPENSE_CATEGORIES = [
    { value: 'food', label: '食費 🍔' },
    { value: 'daily', label: '日用品 🧻' },
    { value: 'transport', label: '交通費 🚃' },
    { value: 'hobby', label: '趣味 🎮' },
    { value: 'other', label: 'その他 📦' },
];

export const INCOME_CATEGORIES = [
    { value: 'salary', label: 'お給料 💰' },
    { value: 'bonus', label: 'ボーナス ✨' },
    { value: 'other', label: 'その他 🧧' },
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export function getCategoryLabel(value: string): string {
    const cat = ALL_CATEGORIES.find(c => c.value === value);
    return cat ? cat.label : value;
}
