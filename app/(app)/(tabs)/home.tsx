import { Text, View } from 'react-native';

import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { SetupBanner } from '@/components/SetupBanner';
import { useTheme } from '@/core/theme/ThemeProvider';

export default function HomeScreen() {
  const { colors, spacing } = useTheme();
  return (
    <AppScreen>
      <View style={{ gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <Text style={{ color: colors.text, fontSize: 34, fontWeight: '800' }}>Universal starter</Text>
          <Text style={{ color: colors.textMuted, fontSize: 16, lineHeight: 24 }}>
            Add your product as domain features. Keep reusable infrastructure here.
          </Text>
        </View>
        <SetupBanner />
        <AppCard>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Already included</Text>
          <Text style={{ color: colors.textMuted, lineHeight: 22 }}>
            Universal routing, protected/public navigation, responsive layout primitives, system theme support, Appwrite auth adapters, password recovery hooks, error/logging boundaries, and CI.
          </Text>
        </AppCard>
        <AppCard>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Domain boundary</Text>
          <Text style={{ color: colors.textMuted, lineHeight: 22 }}>
            New projects should add their own feature folders and repositories without modifying core unless the capability is truly reusable across unrelated products.
          </Text>
        </AppCard>
      </View>
    </AppScreen>
  );
}
