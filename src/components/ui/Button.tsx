import { type ButtonHTMLAttributes } from 'react';
import { useSound } from '../../hooks/useSound';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    ...props
}: ButtonProps) {
    const { playClick } = useSound();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        playClick();
        if (onClick) onClick(e);
    };

    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
}
