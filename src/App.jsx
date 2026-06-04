import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import MyStatsPage from './pages/MyStatsPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './contexts/AuthContext';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mystats"
            element={
              <ProtectedRoute>
                <MyStatsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
