import { Text, View } from 'react-native';

import { isAppwriteConfigured } from '@/core/config/env';
import { useTheme } from '@/core/theme/ThemeProvider';

export function SetupBanner() {
  const { colors, radius, spacing } = useTheme();
  if (isAppwriteConfigured) return null;

  return (
    <View
      style={{
        backgroundColor: colors.surfaceMuted,
        borderRadius: radius.md,
        padding: spacing.md,
        gap: spacing.xs,
      }}
    >
      <Text style={{ color: colors.text, fontWeight: '700' }}>Backend not configured</Text>
      <Text style={{ color: colors.textMuted, lineHeight: 20 }}>
        Copy .env.example to .env and add your Appwrite endpoint and project ID.
        The UI shell can run without them.
      </Text>
    </View>
  );
}
