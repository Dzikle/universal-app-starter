import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '@/core/auth/AuthProvider';
import { useTheme } from '@/core/theme/ThemeProvider';

export default function IndexRoute() {
  const { user, isReady } = useAuth();
  const { colors } = useTheme();

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return <Redirect href={user ? '/home' : '/sign-in'} />;
}
