import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/core/auth/AuthProvider';

export default function AuthLayout() {
  const { user, isReady } = useAuth();
  if (!isReady) return null;
  if (user) return <Redirect href="/home" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
