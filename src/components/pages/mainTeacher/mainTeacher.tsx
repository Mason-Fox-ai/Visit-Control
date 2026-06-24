// src/components/pages/mainTeacher/mainTeacher.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../../utils/auth';
import styles from './mainTeacher.module.scss';

interface Group {
  id: number;
  name: string;
  students: number;
  disciplines: number;
}

const MainTeacher: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();

  // Временные данные для групп
  // ПОЗЖЕ: замените на реальные данные из API
  const groups: Group[] = [
    { id: 1, name: 'ИС21', students: 20, disciplines: 3 },
    { id: 2, name: 'ИС22', students: 20, disciplines: 3 },
    { id: 3, name: 'ИС31', students: 20, disciplines: 3 },
    { id: 4, name: 'ИС32', students: 20, disciplines: 3 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOpenGroup = (groupId: number) => {
    // ПОЗЖЕ: переход на страницу группы
    console.log('Открыть группу:', groupId);
    // navigate(`/group/${groupId}`);
  };

  return (
    <div className={styles.page}>
      {/* ШАПКА */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Посещаемость студентов</h1>
            <span className={styles.subtitle}>Мои группы</span>
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.fullName || 'Преподаватель'}</span>
              <span className={styles.userRole}>Преподаватель</span>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ - СЕТКА ГРУПП */}
      <main className={styles.main}>
        <div className={styles.groupsGrid}>
          {groups.map((group) => (
            <div key={group.id} className={styles.groupCard}>
              <h2 className={styles.groupName}>{group.name}</h2>
              
              <div className={styles.groupStats}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{group.students}</span>
                  <span className={styles.statLabel}>Студентов</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{group.disciplines}</span>
                  <span className={styles.statLabel}>Дисциплин</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleOpenGroup(group.id)}
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

export default MainTeacher;