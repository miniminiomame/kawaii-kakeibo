import { SelectHTMLAttributes, useId } from 'react';
import styles from './Input.module.css'; // Reusing Input styles for consistency

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', id, ...props }: SelectProps) {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
        <div className={styles.wrapper}>
            {label && <label htmlFor={selectId} className={styles.label}>{label}</label>}
            <select id={selectId} className={`${styles.input} ${className}`} {...props}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
