import { useState } from 'react';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { useAuth } from '@/core/auth/AuthProvider';
import { env } from '@/core/config/env';
import { notificationAdapter } from '@/core/notifications/notifications.adapter';
import { useTheme, type ThemeMode } from '@/core/theme/ThemeProvider';

export default function SettingsScreen() {
  const { colors, spacing, mode, setMode } = useTheme();
  const { signOut, isBusy } = useAuth();
  const [pushMessage, setPushMessage] = useState<string | null>(null);
  const [pushBusy, setPushBusy] = useState(false);
  const modes: ThemeMode[] = ['system', 'light', 'dark'];

  const enablePush = async () => {
    setPushBusy(true);
    setPushMessage(null);
    try {
      const result = await notificationAdapter.registerPushTarget({
        providerId: env.appwritePushProviderId || undefined,
      });
      if (!result.supported) {
        setPushMessage('Remote push registration is not enabled for this platform.');
      } else if (!result.granted) {
        setPushMessage('Notification permission was not granted.');
      } else {
        setPushMessage('This device is registered for push notifications.');
      }
    } catch (error) {
      setPushMessage(error instanceof Error ? error.message : 'Push registration failed.');
    } finally {
      setPushBusy(false);
    }
  };

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
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Notifications</Text>
          <Text style={{ color: colors.textMuted, lineHeight: 22 }}>
            Register this signed-in device with the configured Appwrite push provider.
          </Text>
          {pushMessage ? <Text style={{ color: colors.textMuted }}>{pushMessage}</Text> : null}
          <AppButton label="Enable push notifications" variant="secondary" loading={pushBusy} onPress={enablePush} />
        </AppCard>
        <AppCard>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Account</Text>
          <AppButton label="Sign out" variant="danger" loading={isBusy} onPress={signOut} />
        </AppCard>
      </View>
    </AppScreen>
  );
}
