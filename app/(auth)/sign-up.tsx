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

export default function SignUpScreen() {
  const { colors, spacing } = useTheme();
  const { signUp, isBusy, errorMessage, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ gap: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: 34, fontWeight: '800' }}>Create account</Text>
        <SetupBanner />
        <AppCard>
          <AppTextField label="Name" value={name} onChangeText={(value) => { clearError(); setName(value); }} autoComplete="name" />
          <AppTextField label="Email" value={email} onChangeText={(value) => { clearError(); setEmail(value); }} autoCapitalize="none" keyboardType="email-address" autoComplete="email" />
          <AppTextField label="Password" value={password} onChangeText={(value) => { clearError(); setPassword(value); }} secureTextEntry autoComplete="new-password" />
          <Text style={{ color: colors.textMuted, fontSize: 13 }}>Use at least 8 characters.</Text>
          {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
          <AppButton
            label="Create account"
            loading={isBusy}
            disabled={!name.trim() || !email.trim() || password.length < 8}
            onPress={() => signUp({ name: name.trim(), email: email.trim(), password })}
          />
        </AppCard>
        <Link href="/sign-in" style={{ color: colors.primary, textAlign: 'center', fontWeight: '700' }}>
          Back to sign in
        </Link>
      </View>
    </AppScreen>
  );
}
