import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { AppTextField } from '@/components/AppTextField';
import { SetupBanner } from '@/components/SetupBanner';
import { useAuth } from '@/core/auth/AuthProvider';
import type { OAuthProviderId } from '@/core/auth/types';
import { env } from '@/core/config/env';
import { useForm } from '@/core/forms/useForm';
import { useTheme } from '@/core/theme/ThemeProvider';
import { email, password } from '@/core/validation/common';

const socialProviders: Array<{ provider: OAuthProviderId; label: string; enabled: boolean }> = [
  { provider: 'google', label: 'Continue with Google', enabled: env.oauth.google },
  { provider: 'apple', label: 'Continue with Apple', enabled: env.oauth.apple },
  { provider: 'github', label: 'Continue with GitHub', enabled: env.oauth.github },
  { provider: 'facebook', label: 'Continue with Facebook', enabled: env.oauth.facebook },
];

export default function SignInScreen() {
  const { colors, spacing } = useTheme();
  const { signIn, signInWithOAuth, isBusy, errorMessage, clearError } = useAuth();
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate(values) {
      return {
        email: email(values.email),
        password: password(values.password),
      };
    },
    onSubmit(values) {
      clearError();
      return signIn({ email: values.email.trim(), password: values.password });
    },
  });
  const enabledSocial = socialProviders.filter((provider) => provider.enabled);

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
            value={form.values.email}
            error={form.errors.email}
            onChangeText={(value) => { clearError(); form.setValue('email', value); }}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <AppTextField
            label="Password"
            value={form.values.password}
            error={form.errors.password}
            onChangeText={(value) => { clearError(); form.setValue('password', value); }}
            secureTextEntry
            autoComplete="current-password"
          />
          {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
          <AppButton
            label="Sign in"
            loading={isBusy || form.isSubmitting}
            onPress={form.submit}
          />
          <Link href="/forgot-password" style={{ color: colors.primary, textAlign: 'center' }}>
            Forgot password?
          </Link>
        </AppCard>

        {enabledSocial.length ? (
          <View style={{ gap: spacing.sm }}>
            {enabledSocial.map(({ provider, label }) => (
              <AppButton
                key={provider}
                label={label}
                variant="secondary"
                loading={isBusy}
                onPress={() => signInWithOAuth(provider)}
              />
            ))}
          </View>
        ) : null}

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
