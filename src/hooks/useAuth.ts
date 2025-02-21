import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  
  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return {
    user,
    isAdmin,
    isAuthenticated,
  };
}; 