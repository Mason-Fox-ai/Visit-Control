// src/components/pages/mainStudent/mainStudent.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../../utils/auth';
import styles from './mainStudent.module.scss';

interface Discipline {
  id: number;
  name: string;
  absences: number;
}

const MainStudent: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();

  // Временные данные для дисциплин
  // ПОЗЖЕ: замените на реальные данные из API
  const [disciplines] = useState<Discipline[]>([
    { id: 1, name: 'Программирование на Python', absences: 0 },
    { id: 2, name: 'Веб-дизайн', absences: 3 },
    { id: 3, name: 'Разработка программных модулей', absences: 0 },
    { id: 4, name: 'Программирование на React + CSS', absences: 1 },
    { id: 5, name: 'Программирование на C++', absences: 0 },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOpenDiscipline = (disciplineId: number) => {
    // ПОЗЖЕ: переход на страницу дисциплины
    console.log('Открыть дисциплину:', disciplineId);
    // navigate(`/discipline/${disciplineId}`);
  };

  return (
    <div className={styles.page}>
      {/* ШАПКА */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Моя посещаемость</h1>
            <span className={styles.subtitle}>Мои дисциплины</span>
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.fullName || 'Студент'}</span>
              <span className={styles.userRole}>Студент</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ - СПИСОК ДИСЦИПЛИН */}
      <main className={styles.main}>
        <div className={styles.disciplinesList}>
          {disciplines.map((discipline) => (
            <div key={discipline.id} className={styles.disciplineCard}>
              <div className={styles.disciplineInfo}>
                <h2 className={styles.disciplineName}>{discipline.name}</h2>
                <div className={styles.absenceBadge}>
                  <span className={styles.absenceValue}>{discipline.absences}</span>
                  <span className={styles.absenceLabel}>Пропусков</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleOpenDiscipline(discipline.id)}
                className={styles.openButton}
              >
                Открыть табель →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainStudent;