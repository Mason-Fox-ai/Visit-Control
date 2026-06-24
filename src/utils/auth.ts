// src/utils/auth.ts

import type { User, UserRole } from '../types/user';

/**
 * Ключи для хранения данных в localStorage
 * 
 * localStorage - это хранилище в браузере, которое сохраняет данные
 * даже после перезагрузки страницы
 */
const TOKEN_KEY = 'token';   // Ключ для токена
const USER_KEY = 'user';     // Ключ для данных пользователя

// Экспортируем типы для удобства использования в других файлах
export type { User, UserRole };

/**
 * Сохранить сессию после успешного входа
 * 
 * Что делает:
 * 1. Сохраняет токен в localStorage
 * 2. Сохраняет данные пользователя (превращает объект в JSON-строку)
 * 
 * Где используется: в Login после успешной авторизации
 */
export const setAuth = (user: User, token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Получить токен текущей сессии
 * 
 * Возвращает: строку с токеном или null, если токена нет
 * 
 * Где используется: для проверки авторизации
 */
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

/**
 * Получить профиль текущего пользователя
 * 
 * Что делает:
 * 1. Достаёт JSON-строку из localStorage
 * 2. Превращает её обратно в объект
 * 3. Если данных нет или они повреждены - возвращает null
 * 
 * Где используется: везде, где нужны данные пользователя
 * (в MainTeacher, MainStudent, в шапке, и т.д.)
 */
export const getUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY);

  if (!data) {
    return null;
  }

  try {
    // Парсим JSON-строку в объект
    return JSON.parse(data) as User;
  } catch {
    // Если JSON повреждён - возвращаем null
    return null;
  }
};

/**
 * Получить роль пользователя
 * 
 * Удобная обёртка над getUser()
 * Возвращает: 'student' | 'teacher' | null
 * 
 * Где используется: в ProtectedRoute для проверки роли
 */
export const getUserRole = (): UserRole | null => {
  const user = getUser();
  return user?.role ?? null; // Если user есть - берём role, иначе null
};

/**
 * Проверить, авторизован ли пользователь
 * 
 * Проверяет наличие токена в localStorage
 * (даже если токен старый или невалидный - для учебного проекта ок)
 * 
 * Где используется: в ProtectedRoute
 */
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

/**
 * Выход из системы (очистить сессию)
 * 
 * Удаляет токен и данные пользователя из localStorage
 * 
 * Где используется: в кнопке "Выйти" в шапке приложения
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};