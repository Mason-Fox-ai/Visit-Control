import React, { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './login.module.scss';

/**
 * Страница входа в систему контроля посещаемости
 */
const Login: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Обработчик отправки формы
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!login.trim()) {
      setError('Введите логин');
      return;
    }

    if (!password.trim()) {
      setError('Введите пароль');
      return;
    }

    console.log('Вход в систему:', { login, password });
    // Здесь будет логика авторизации
    // window.location.href = '/dashboard';
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Заголовок */}
        <h1 className={styles.title}>Контроль посещаемости студентов</h1>
        
        {/* Подзаголовок */}
        <p className={styles.subtitle}>
          Войдите в систему для отметки или просмотр таблиц
        </p>

        {/* Форма входа */}
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {/* Поле логина */}
          <div className={styles.formGroup}>
            <label htmlFor="login" className={styles.label}>
              Логин
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите ваш логин"
                className={styles.input}
                autoComplete="username"
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
                autoComplete="current-password"
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
          {error && (
            <div className={styles.errorMessage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Кнопка входа */}
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;