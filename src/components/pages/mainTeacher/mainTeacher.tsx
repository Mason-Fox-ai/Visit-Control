import React, { useEffect } from 'react';
import './mainTeacher.module.scss';

// Определяем интерфейсы для данных
interface Group {
  id: string;
  name: string;
  studentCount: number;
  disciplinesCount: number;
}

// Основной компонент страницы преподавателя
const MainTeacher: React.FC = () => {
  // Данные групп (без состояния, так как они статичные)
  const groups: Group[] = [
    {
      id: '1',
      name: 'ИС21',
      studentCount: 20,
      disciplinesCount: 3,
    },
    {
      id: '2',
      name: 'ИС22',
      studentCount: 20,
      disciplinesCount: 3,
    },
    {
      id: '3',
      name: 'ИС31',
      studentCount: 20,
      disciplinesCount: 3,
    },
    {
      id: '4',
      name: 'ИС32',
      studentCount: 20,
      disciplinesCount: 3,
    },
  ];

  // Данные преподавателя (без состояния)
  const teacher = {
    fullName: 'Смирнов Алексей Владимирович',
    role: 'Преподаватель',
  };

  // Эффект для загрузки данных (можно заменить на API запрос)
  useEffect(() => {
    // Здесь можно добавить загрузку данных с сервера
    console.log('Компонент MainTeacher загружен');
  }, []);

  // Обработчик выхода из системы
  const handleLogout = () => {
    // Очищаем токен авторизации, перенаправляем на страницу входа
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    console.log('Выход из системы');
  };

  // Обработчик открытия табеля группы
  const handleOpenGradebook = (groupId: string) => {
    // Переход на страницу табеля успеваемости группы
    console.log(`Открытие табеля для группы ${groupId}`);
    // Пример навигации:
    // history.push(`/gradebook/${groupId}`);
    // или window.location.href = `/gradebook/${groupId}`;
  };

  return (
    <div className="main-teacher-container">
      {/* Шапка с информацией о пользователе */}
      <header className="teacher-header">
        <div className="header-title">
          <h1>Посещаемость студентов</h1>
          <span className="subtitle">Мои группы</span>
        </div>
        <div className="user-info">
          <div className="teacher-details">
            <span className="teacher-name">{teacher.fullName}</span>
            <span className="teacher-role">{teacher.role}</span>
          </div>
          <button 
            className="logout-button"
            onClick={handleLogout}
            aria-label="Выйти из системы"
          >
            [Выйти]
          </button>
        </div>
      </header>

      {/* Список групп */}
      <main className="groups-container">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <div className="group-header">
              <h2 className="group-name">{group.name}</h2>
            </div>
            <div className="group-stats">
              <div className="stat-item">
                <span className="stat-label">Студентов:</span>
                <span className="stat-value">{group.studentCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Дисциплин:</span>
                <span className="stat-value">{group.disciplinesCount}</span>
              </div>
            </div>
            <button
              className="open-gradebook-button"
              onClick={() => handleOpenGradebook(group.id)}
              aria-label={`Открыть табель для группы ${group.name}`}
            >
              [Открыть табель →]
            </button>
          </div>
        ))}
      </main>

      {/* Подвал (опционально) */}
      <footer className="teacher-footer">
        <p>© {new Date().getFullYear()} Система учета посещаемости</p>
      </footer>
    </div>
  );
};

export default MainTeacher; // Экспорт по умолчанию