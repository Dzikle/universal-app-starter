import { Link } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { AppTextField } from '@/components/AppTextField';
import { SetupBanner } from '@/components/SetupBanner';
import { useAuth } from '@/core/auth/AuthProvider';
import { useTheme } from '@/core/theme/ThemeProvider';

export default function SignInScreen() {
  const { colors, spacing } = useTheme();
  const { signIn, isBusy, errorMessage, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ gap: spacing.lg }}>
        <View style={{ gap: spacing.sm }}>
          <Text style={{ color: colors.text, fontSize: 34, fontWeight: '800' }}>Welcome</Text>
          <Text style={{ color: colors.textMuted, fontSize: 16, lineHeight: 24 }}>
            Generic authentication shell powered through the starter's auth adapter.
          </Text>
        </View>

        <SetupBanner />

        <AppCard>
          <AppTextField
            label="Email"
            value={email}
            onChangeText={(value) => { clearError(); setEmail(value); }}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <AppTextField
            label="Password"
            value={password}
            onChangeText={(value) => { clearError(); setPassword(value); }}
            secureTextEntry
            autoComplete="current-password"
          />
          {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
          <AppButton
            label="Sign in"
            loading={isBusy}
            disabled={!email || password.length < 8}
            onPress={() => signIn({ email: email.trim(), password })}
          />
          <Link href="/forgot-password" style={{ color: colors.primary, textAlign: 'center' }}>
            Forgot password?
          </Link>
        </AppCard>

        <Text style={{ color: colors.textMuted, textAlign: 'center' }}>
          New here?{' '}
          <Link href="/sign-up" style={{ color: colors.primary, fontWeight: '700' }}>
            Create an account
          </Link>
        </Text>
      </View>
    </AppScreen>
  );
}
