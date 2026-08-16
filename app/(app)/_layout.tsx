import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/core/auth/AuthProvider';

export default function ProtectedLayout() {
  const { user, isReady } = useAuth();
  if (!isReady) return null;
  if (!user) return <Redirect href="/sign-in" />;
  return <Stack screenOptions={{ headerShown: false }} />;
}
