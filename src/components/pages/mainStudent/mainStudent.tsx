// src/components/pages/mainStudent/mainStudent.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../../utils/auth';

const MainStudent: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>👨‍🎓 Страница студента</h1>
      <p>Добро пожаловать, {user?.fullName}!</p>
      <p>Ваша роль: {user?.role}</p>
      {user?.groupId && <p>Группа: {user.groupId}</p>}
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default MainStudent;