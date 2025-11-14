// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AdminPanel from '../pages/AdminPanel';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRoles={['Author', 'Editor', 'Admin']}>
          <DashboardPage />
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute requiredRoles={['Admin']}>
          <AdminPanel />
        </ProtectedRoute>
      } />

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
};

export default AppRoutes;