import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

// Интерфейс для пользователя (без пароля)
interface User {
  id: number;
  login: string;
  fullName: string;
  role: 'student' | 'teacher';
  group?: string;
}

// Интерфейс для пользователя из БД (с паролем)
interface UserWithPassword extends User {
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Функция авторизации
  const handleLogin = async (login: string, password: string): Promise<User | null> => {
    try {
      // Запрос к JSON Server
      const response = await fetch('http://localhost:3001/users');
      
      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }

      const users: UserWithPassword[] = await response.json();
      
      // Поиск пользователя с совпадающим логином и паролем
      const user = users.find(
        (u) => u.login === login && u.password === password
      );

      // Возвращаем пользователя без пароля
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }

      return null;
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      return null;
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Валидация
    if (!login.trim()) {
      setError('Введите логин');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Введите пароль');
      setIsLoading(false);
      return;
    }

    try {
      // Пытаемся авторизоваться
      const user = await handleLogin(login, password);

      if (user) {
        // Сохраняем данные пользователя
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Перенаправление в зависимости от роли
        if (user.role === 'teacher') {
          navigate('/teacher');
        } else if (user.role === 'student') {
          navigate('/student');
        } else {
          navigate('/');
        }
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (error) {
      setError('Ошибка при входе в систему');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Контроль посещаемости студентов</h1>
        
        <p className={styles.subtitle}>
          Войдите в систему для отметки или просмотр таблиц
        </p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
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
                disabled={isLoading}
              />
            </div>
          </div>

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
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                disabled={isLoading}
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

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        {/* Подсказка для тестирования */}
        <div className={styles.demoHint}>
          <p>Демо-доступ:</p>
          <div className={styles.demoAccounts}>
            <span>Преподаватель: teacher / teacher123</span>
            <span>Студент: student / student123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;