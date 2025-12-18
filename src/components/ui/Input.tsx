import { InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, className = '', id, ...props }: InputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div className={styles.wrapper}>
            {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
            <input
                id={inputId}
                className={`${styles.input} ${className}`}
                {...props}
            />
        </div>
    );
}
