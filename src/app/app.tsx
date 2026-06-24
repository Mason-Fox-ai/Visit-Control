// src/app/app.tsx

import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../router/router';  // ← Добавьте "../"

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;