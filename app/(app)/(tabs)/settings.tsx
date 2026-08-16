import { Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { useAuth } from '@/core/auth/AuthProvider';
import { useTheme, type ThemeMode } from '@/core/theme/ThemeProvider';

export default function SettingsScreen() {
  const { colors, spacing, mode, setMode } = useTheme();
  const { signOut, isBusy } = useAuth();
  const modes: ThemeMode[] = ['system', 'light', 'dark'];

  return (
    <AppScreen>
      <View style={{ gap: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: 30, fontWeight: '800' }}>Settings</Text>
        <AppCard>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Appearance</Text>
          <View style={{ gap: spacing.sm }}>
            {modes.map((candidate) => (
              <AppButton
                key={candidate}
                label={`${candidate === mode ? '✓ ' : ''}${candidate[0].toUpperCase()}${candidate.slice(1)}`}
                variant="secondary"
                onPress={() => setMode(candidate)}
              />
            ))}
          </View>
        </AppCard>
        <AppCard>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Account</Text>
          <AppButton label="Sign out" variant="danger" loading={isBusy} onPress={signOut} />
        </AppCard>
      </View>
    </AppScreen>
  );
}
