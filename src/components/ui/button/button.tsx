import React from 'react';
import styles from './button.module.scss';

// Определяем типы для пропсов
interface ButtonProps {
  /** Текст кнопки */
  children: React.ReactNode;
  /** Вариант стиля кнопки */
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  /** Размер кнопки */
  size?: 'small' | 'medium' | 'large';
  /** Обработчик клика */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Отключена ли кнопка */
  disabled?: boolean;
  /** Тип кнопки */
  type?: 'button' | 'submit' | 'reset';
  /** Полная ширина */
  fullWidth?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
  /** aria-label для доступности */
  ariaLabel?: string;
}

/**
 * Компонент кнопки с различными вариантами стилей
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  className = '',
  ariaLabel,
}) => {
  // Формируем классы для кнопки
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
    >
      {children}
    </button>
  );
};

export default Button;