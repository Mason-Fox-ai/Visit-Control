// src/components/pages/groupAttendance/groupAttendance.tsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, logout } from '../../../utils/auth';
import styles from './groupAttendance.module.scss';

interface Student {
  id: number;
  fullName: string;
  mark?: 'P' | 'N' | 'B' | '';
  reason?: string;
}

interface GroupData {
  id: number;
  name: string;
  students: Student[];
}

const GroupAttendance: React.FC = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const user = getUser();

  // Временные данные для группы
  // ПОЗЖЕ: замените на реальные данные из API
  const [group] = useState<GroupData>({
    id: Number(groupId) || 1,
    name: 'ИС21',
    students: [
      { id: 1, fullName: 'Бахман Анжелика', mark: '', reason: '' },
      { id: 2, fullName: 'Белоус Виктория', mark: '', reason: '' },
      { id: 3, fullName: 'Васильев Тимофей', mark: '', reason: '' },
      { id: 4, fullName: 'Гойкина Ирина', mark: '', reason: '' },
      { id: 5, fullName: 'Гоцкин Вадим', mark: '', reason: '' },
      { id: 6, fullName: 'Зозуля Мария', mark: '', reason: '' },
      { id: 7, fullName: 'Исайкин Егор', mark: '', reason: '' },
    ],
  });

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Программирование на Python');
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBackToGroups = () => {
    navigate('/teacher');
  };

  const handleMarkChange = (studentId: number, mark: 'P' | 'N' | 'B') => {
    // ПОЗЖЕ: отправка на сервер
    console.log(`Студент ${studentId}: ${mark}`);
  };

  const handleReasonChange = (studentId: number, reason: string) => {
    // ПОЗЖЕ: отправка на сервер
    console.log(`Студент ${studentId}: причина - ${reason}`);
  };

  const handleDownloadWord = () => {
    // ПОЗЖЕ: скачивание в Word
    console.log('Скачивание в Word');
  };

  const handleStartPoll = () => {
    // ПОЗЖЕ: запуск опроса
    console.log('Запуск опроса');
  };

  const getMarkLabel = (mark: string) => {
    switch (mark) {
      case 'P': return 'Присутствовал';
      case 'N': return 'Отсутствовал';
      case 'B': return 'По болезни';
      default: return 'Укажите причину';
    }
  };

  return (
    <div className={styles.page}>
      {/* ШАПКА */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{group.name}</h1>
            <span className={styles.subtitle}>Табели посещаемости</span>
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

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className={styles.main}>
        {/* Навигация назад */}
        <div className={styles.navigation}>
          <button onClick={handleBackToGroups} className={styles.backButton}>
            ← Назад к группам
          </button>
        </div>

        {/* ФИЛЬТРЫ */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <button
              className={`${styles.filterButton} ${viewMode === 'daily' ? styles.active : ''}`}
              onClick={() => setViewMode('daily')}
            >
              Ежедневный
            </button>
            <button
              className={`${styles.filterButton} ${viewMode === 'weekly' ? styles.active : ''}`}
              onClick={() => setViewMode('weekly')}
            >
              Еженедельный
            </button>
            <button
              className={`${styles.filterButton} ${viewMode === 'monthly' ? styles.active : ''}`}
              onClick={() => setViewMode('monthly')}
            >
              Ежемесячный
            </button>
          </div>

          <div className={styles.filterControls}>
            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Дата</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>

            <div className={styles.filterItem}>
              <label className={styles.filterLabel}>Дисциплина</label>
              <select
                value={selectedDiscipline}
                onChange={(e) => setSelectedDiscipline(e.target.value)}
                className={styles.selectInput}
              >
                <option>Программирование на Python</option>
                <option>Веб-дизайн</option>
                <option>Разработка программных модулей</option>
                <option>Программирование на React + CSS</option>
              </select>
            </div>

            <button onClick={handleDownloadWord} className={styles.downloadButton}>
              Скачать в формате Microsoft Word
            </button>
          </div>
        </div>

        {/* ТАБЛИЦА */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colNumber}>№ п/п</th>
                <th className={styles.colName}>Фамилия Отчество</th>
                <th className={styles.colMark}>Отметка</th>
                <th className={styles.colReason}>Причина отсутствия</th>
              </tr>
            </thead>
            <tbody>
              {group.students.map((student, index) => (
                <tr key={student.id}>
                  <td className={styles.colNumber}>{index + 1}</td>
                  <td className={styles.colName}>{student.fullName}</td>
                  <td className={styles.colMark}>
                    <div className={styles.markButtons}>
                      <button
                        className={`${styles.markBtn} ${student.mark === 'P' ? styles.markP : ''}`}
                        onClick={() => handleMarkChange(student.id, 'P')}
                        title="Присутствовал"
                      >
                        ✓
                      </button>
                      <button
                        className={`${styles.markBtn} ${student.mark === 'N' ? styles.markN : ''}`}
                        onClick={() => handleMarkChange(student.id, 'N')}
                        title="Отсутствовал"
                      >
                        ✕
                      </button>
                      <button
                        className={`${styles.markBtn} ${student.mark === 'B' ? styles.markB : ''}`}
                        onClick={() => handleMarkChange(student.id, 'B')}
                        title="По болезни"
                      >
                        Б
                      </button>
                      <span className={styles.markLabel}>
                        {getMarkLabel(student.mark || '')}
                      </span>
                    </div>
                  </td>
                  <td className={styles.colReason}>
                    <input
                      type="text"
                      className={styles.reasonInput}
                      placeholder="Укажите причину"
                      value={student.reason || ''}
                      onChange={(e) => handleReasonChange(student.id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ДЕЙСТВИЯ ВНИЗУ */}
        <div className={styles.actions}>
          <button onClick={handleStartPoll} className={styles.pollButton}>
            Запустить опрос
          </button>
        </div>
      </main>
    </div>
  );
};

export default GroupAttendance;