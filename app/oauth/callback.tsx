import * as WebBrowser from 'expo-web-browser';
import { ActivityIndicator, Text, View } from 'react-native';

import { AppScreen } from '@/components/AppScreen';
import { useTheme } from '@/core/theme/ThemeProvider';

WebBrowser.maybeCompleteAuthSession();

export default function OAuthCallbackScreen() {
  const { colors, spacing } = useTheme();
  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', gap: spacing.md }}>
        <ActivityIndicator color={colors.primary} />
        <Text style={{ color: colors.text }}>Completing sign in…</Text>
      </View>
    </AppScreen>
  );
}
