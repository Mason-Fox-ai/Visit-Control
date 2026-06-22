export type UserRole = 'student' | 'teacher';
const TOKEN_KEY = 'token';
const ROLE_KEY = 'role';
export const setAuth = (role: UserRole) => {
  localStorage.setItem(TOKEN_KEY, 'authenticated');
  localStorage.setItem(ROLE_KEY, role);
};
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getUserRole = (): UserRole | null =>
  localStorage.getItem(ROLE_KEY) as UserRole | null;
