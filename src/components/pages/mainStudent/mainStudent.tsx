import React, { useEffect } from 'react';
import styles from './mainStudent.module.scss';

// Интерфейс для дисциплины
interface Discipline {
  id: string;
  name: string;
  absences: number;
  totalHours?: number;
  teacher?: string;
}

// Интерфейс для студента
interface Student {
  fullName: string;
  role: string;
  group?: string;
  avatar?: string;
}

// Основной компонент страницы студента - используем именованный экспорт
export const MainStudent: React.FC = () => {
  // Данные студента
  const student: Student = {
    fullName: 'Васильев Тимофей Александрович',
    role: 'Студент',
    group: 'ИС-21',
  };

  // Данные дисциплин
  const disciplines: Discipline[] = [
    {
      id: '1',
      name: 'Программирование на Python',
      absences: 0,
      totalHours: 72,
      teacher: 'Смирнов А.В.',
    },
    {
      id: '2',
      name: 'Веб-дизайн',
      absences: 3,
      totalHours: 64,
      teacher: 'Иванова М.С.',
    },
    {
      id: '3',
      name: 'Разработка программных модулей',
      absences: 0,
      totalHours: 80,
      teacher: 'Петров Д.И.',
    },
    {
      id: '4',
      name: 'Программирование на React + CSS',
      absences: 1,
      totalHours: 56,
      teacher: 'Смирнов А.В.',
    },
  ];

  // Эффект для загрузки данных
  useEffect(() => {
    // Здесь можно добавить загрузку данных с сервера
    console.log('Страница студента загружена');
    // fetchStudentData();
    // fetchDisciplinesData();
  }, []);

  // Обработчик выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
    console.log('Выход из системы');
  };

  // Обработчик открытия табеля дисциплины
  const handleOpenGradebook = (disciplineId: string) => {
    console.log(`Открытие табеля для дисциплины ${disciplineId}`);
    // Переход на страницу табеля
    // window.location.href = `/gradebook/${disciplineId}`;
    // или использовать react-router
    // navigate(`/gradebook/${disciplineId}`);
  };

  // Функция для определения цвета пропусков
  const getAbsenceColor = (absences: number): string => {
    if (absences === 0) return styles.absenceZero;
    if (absences <= 2) return styles.absenceLow;
    if (absences <= 5) return styles.absenceMedium;
    return styles.absenceHigh;
  };

  return (
    <div className={styles.mainStudentContainer}>
      {/* Шапка */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Моя посещаемость</h1>
          <span className={styles.subtitle}>Мои дисциплины</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {student.fullName.split(' ').map(name => name[0]).join('')}
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{student.fullName}</span>
              <span className={styles.userRole}>
                {student.role}
                {student.group && ` • ${student.group}`}
              </span>
            </div>
          </div>
          <button 
            className={styles.logoutButton}
            onClick={handleLogout}
            aria-label="Выйти из системы"
          >
            Выйти
          </button>
        </div>
      </header>

      {/* Основной контент */}
      <main className={styles.content}>
        <div className={styles.disciplinesGrid}>
          {disciplines.map((discipline) => (
            <div key={discipline.id} className={styles.disciplineCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.disciplineName}>{discipline.name}</h3>
                {discipline.teacher && (
                  <span className={styles.teacherName}>{discipline.teacher}</span>
                )}
              </div>
              
              <div className={styles.cardBody}>
                <div className={styles.absenceInfo}>
                  <span className={styles.absenceLabel}>Пропусков:</span>
                  <span className={`${styles.absenceValue} ${getAbsenceColor(discipline.absences)}`}>
                    {discipline.absences}
                  </span>
                </div>
                
                {discipline.totalHours && (
                  <div className={styles.hoursInfo}>
                    <span className={styles.hoursLabel}>Часов:</span>
                    <span className={styles.hoursValue}>{discipline.totalHours}</span>
                  </div>
                )}
              </div>

              <button
                className={styles.openGradebookButton}
                onClick={() => handleOpenGradebook(discipline.id)}
                aria-label={`Открыть табель для ${discipline.name}`}
              >
                Открыть табель
                <svg 
                  className={styles.arrowIcon}
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Статистика (опционально) */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Всего дисциплин</span>
            <span className={styles.statValue}>{disciplines.length}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Всего пропусков</span>
            <span className={styles.statValue}>
              {disciplines.reduce((sum, d) => sum + d.absences, 0)}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Среднее</span>
            <span className={styles.statValue}>
              {(disciplines.reduce((sum, d) => sum + d.absences, 0) / disciplines.length).toFixed(1)}
            </span>
          </div>
        </div>
      </main>

      {/* Подвал */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Система контроля посещаемости</p>
      </footer>
    </div>
  );
};

// Экспорт по умолчанию (для совместимости)
export default MainStudent;