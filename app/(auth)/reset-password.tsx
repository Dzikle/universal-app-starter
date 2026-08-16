import { Link, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { AppTextField } from '@/components/AppTextField';
import { useAuth } from '@/core/auth/AuthProvider';
import { useTheme } from '@/core/theme/ThemeProvider';

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams<{ userId?: string; secret?: string }>();
  const { colors, spacing } = useTheme();
  const { completePasswordRecovery, isBusy, errorMessage } = useAuth();
  const [password, setPassword] = useState('');
  const [complete, setComplete] = useState(false);

  const submit = async () => {
    if (!params.userId || !params.secret) return;
    setComplete(
      await completePasswordRecovery({
        userId: params.userId,
        secret: params.secret,
        password,
      }),
    );
  };

  const hasToken = Boolean(params.userId && params.secret);

  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ gap: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: 34, fontWeight: '800' }}>Choose new password</Text>
        <AppCard>
          {!hasToken ? <Text style={{ color: colors.danger }}>The recovery link is missing its token.</Text> : null}
          <AppTextField label="New password" value={password} onChangeText={setPassword} secureTextEntry autoComplete="new-password" />
          {complete ? <Text style={{ color: colors.success }}>Password updated. You can sign in now.</Text> : null}
          {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
          <AppButton label="Update password" loading={isBusy} disabled={!hasToken || password.length < 8 || complete} onPress={submit} />
        </AppCard>
        <Link href="/sign-in" style={{ color: colors.primary, textAlign: 'center', fontWeight: '700' }}>
          Go to sign in
        </Link>
      </View>
    </AppScreen>
  );
}
