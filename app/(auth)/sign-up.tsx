import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { AppTextField } from '@/components/AppTextField';
import { SetupBanner } from '@/components/SetupBanner';
import { useAuth } from '@/core/auth/AuthProvider';
import { useForm } from '@/core/forms/useForm';
import { useTheme } from '@/core/theme/ThemeProvider';
import { email, password, required } from '@/core/validation/common';

export default function SignUpScreen() {
  const { colors, spacing } = useTheme();
  const { signUp, isBusy, errorMessage, clearError } = useAuth();
  const form = useForm({
    initialValues: { name: '', email: '', password: '' },
    validate(values) {
      return {
        name: required(values.name, 'Name'),
        email: email(values.email),
        password: password(values.password),
      };
    },
    onSubmit(values) {
      clearError();
      return signUp({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
    },
  });

  return (
    <AppScreen contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ gap: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: 34, fontWeight: '800' }}>Create account</Text>
        <SetupBanner />
        <AppCard>
          <AppTextField label="Name" value={form.values.name} error={form.errors.name} onChangeText={(value) => { clearError(); form.setValue('name', value); }} autoComplete="name" />
          <AppTextField label="Email" value={form.values.email} error={form.errors.email} onChangeText={(value) => { clearError(); form.setValue('email', value); }} autoCapitalize="none" keyboardType="email-address" autoComplete="email" />
          <AppTextField label="Password" value={form.values.password} error={form.errors.password} onChangeText={(value) => { clearError(); form.setValue('password', value); }} secureTextEntry autoComplete="new-password" />
          {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
          <AppButton label="Create account" loading={isBusy || form.isSubmitting} onPress={form.submit} />
        </AppCard>
        <Link href="/sign-in" style={{ color: colors.primary, textAlign: 'center', fontWeight: '700' }}>
          Back to sign in
        </Link>
      </View>
    </AppScreen>
  );
}
