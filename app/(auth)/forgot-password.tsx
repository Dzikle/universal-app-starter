import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { AppTextField } from '@/components/AppTextField';
import { useAuth } from '@/core/auth/AuthProvider';
import { env } from '@/core/config/env';
import { useTheme } from '@/core/theme/ThemeProvider';

export default function ForgotPasswordScreen() {
  const { colors, spacing } = useTheme();
  const { sendPasswordRecovery, isBusy, errorMessage } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const send = async () => {
    if (!env.passwordRecoveryUrl) return;
    setSent(await sendPasswordRecovery(email.trim(), env.passwordRecoveryUrl));
  };

  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ gap: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: 34, fontWeight: '800' }}>Reset password</Text>
        <AppCard>
          <AppTextField label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoComplete="email" />
          {!env.passwordRecoveryUrl ? (
            <Text style={{ color: colors.textMuted }}>
              Set EXPO_PUBLIC_PASSWORD_RECOVERY_URL and allow that redirect in Appwrite before enabling this flow.
            </Text>
          ) : null}
          {sent ? <Text style={{ color: colors.success }}>Recovery email sent.</Text> : null}
          {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
          <AppButton label="Send recovery email" loading={isBusy} disabled={!email.trim() || !env.passwordRecoveryUrl} onPress={send} />
        </AppCard>
        <Link href="/sign-in" style={{ color: colors.primary, textAlign: 'center', fontWeight: '700' }}>
          Back to sign in
        </Link>
      </View>
    </AppScreen>
  );
}
