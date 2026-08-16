import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';

export function AppCard({ children }: PropsWithChildren) {
  const { colors, radius, spacing } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius.lg,
          padding: spacing.xl,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: StyleSheet.hairlineWidth, gap: 12 },
});
