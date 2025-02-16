import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { router } from 'expo-router';

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    router.replace('/login');
    return null;
  }

  if (!isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>You don't have permission to access this page.</ThemedText>
      </View>
    );
  }

  return <>{children}</>;
} 