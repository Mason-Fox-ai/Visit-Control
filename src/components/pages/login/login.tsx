import React, { useState } from 'react';
import type { FormEvent } from 'react'; // Используем type-only импорт для FormEvent
import styles from './login.module.scss';
import Button from '../../ui/button/button';

// Интерфейс для пропсов
interface LoginProps {
  onLogin?: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
}

/**
 * Страница входа в систему контроля посещаемости
 */
const Login: React.FC<LoginProps> = ({ 
  onLogin, 
  isLoading = false, 
  error = '' 
}) => {
  // Состояния для полей формы
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [localError, setLocalError] = useState<string>(error);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError('');

    // Простая валидация
    if (!email.trim()) {
      setLocalError('Введите email');
      return;
    }

    if (!password.trim()) {
      setLocalError('Введите пароль');
      return;
    }

    // Если передан колбэк, вызываем его
    if (onLogin) {
      onLogin(email, password);
    } else {
      // Имитация входа
      console.log('Вход в систему:', { email, password });
      // Здесь можно добавить логику перенаправления
      // window.location.href = '/dashboard';
    }
  };

  // Обработчик для кнопки "Почти" (быстрый вход с демо-данными)
  const handleQuickLogin = () => {
    setEmail('demo@example.com');
    setPassword('password123');
  };

  // Обработчик для кнопки "Продолжи" (продолжить как гость)
  const handleContinueAsGuest = () => {
    console.log('Продолжить как гость');
    // Перенаправление на страницу просмотра без авторизации
    // window.location.href = '/guest-view';
  };

  return (
    <div className={styles.loginPage}>
      {/* Основной контейнер */}
      <div className={styles.loginContainer}>
        {/* Логотип или иконка */}
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className={styles.title}>Контроль посещаемости студентов</h1>
        </div>

        {/* Подзаголовок */}
        <p className={styles.subtitle}>
          Войдите в систему для отметки или просмотр таблиц
        </p>

        {/* Форма входа */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {/* Поле email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите ваш email"
                className={styles.input}
                disabled={isLoading}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Поле пароля */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите ваш пароль"
                className={styles.input}
                disabled={isLoading}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Ошибка */}
          {localError && (
            <div className={styles.errorMessage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {localError}
            </div>
          )}

          {/* Кнопки действий */}
          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              size="medium"
              onClick={handleQuickLogin}
              disabled={isLoading}
            >
              Почти
            </Button>

            <Button
              type="button"
              variant="primary"
              size="medium"
              onClick={handleContinueAsGuest}
              disabled={isLoading}
            >
              Продолжи
            </Button>
          </div>

          {/* Кнопка входа */}
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        {/* Дополнительная информация */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Демо-доступ: demo@example.com / password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;