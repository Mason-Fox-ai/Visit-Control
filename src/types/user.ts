// src/types/user.ts

/**
 * Роли пользователей в системе
 * 'student' - студент
 * 'teacher' - преподаватель
 */
export type UserRole = 'student' | 'teacher';

/**
 * Данные пользователя после входа (БЕЗ пароля)
 * Эти данные мы будем хранить в localStorage
 */
export interface User {
  id: string;        // ID пользователя (строка, потому что json-server использует строки)
  login: string;     // Логин
  fullName: string;  // Полное имя
  role: UserRole;    // Роль (студент или преподаватель)
  groupId?: number;  // ID группы (только для студентов, опционально)
}

/**
 * Запись преподавателя в базе данных db.json
 * Хранит ВСЕ поля, включая пароль (только для проверки при входе)
 */
export interface DbTeacher {
  id: string;
  login: string;
  password: string;  // Пароль - ТОЛЬКО для проверки, НЕ храним в localStorage!
  fullName: string;
}

/**
 * Запись студента в базе данных db.json
 * Хранит ВСЕ поля, включая пароль и группу
 */
export interface DbStudent {
  id: string;
  login: string;
  password: string;  // Пароль - ТОЛЬКО для проверки, НЕ храним в localStorage!
  fullName: string;
  groupId: number;   // ID группы студента
}