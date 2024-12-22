import useUserStore from '@/store/user.store';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {
  const user = useUserStore((state) => state.id);

  return user ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;