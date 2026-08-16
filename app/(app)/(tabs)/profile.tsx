import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { AppScreen } from '@/components/AppScreen';
import { AppTextField } from '@/components/AppTextField';
import { useAuth } from '@/core/auth/AuthProvider';
import { useTheme } from '@/core/theme/ThemeProvider';

export default function ProfileScreen() {
  const { colors, spacing } = useTheme();
  const { user, updateName, isBusy, errorMessage } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [saved, setSaved] = useState(false);

  useEffect(() => setName(user?.name ?? ''), [user?.name]);

  const save = async () => {
    setSaved(await updateName(name.trim()));
  };

  return (
    <AppScreen>
      <View style={{ gap: spacing.lg }}>
        <Text style={{ color: colors.text, fontSize: 30, fontWeight: '800' }}>Profile</Text>
        <AppCard>
          <Text style={{ color: colors.textMuted }}>{user?.email}</Text>
          <AppTextField label="Display name" value={name} onChangeText={(value) => { setSaved(false); setName(value); }} autoComplete="name" />
          {saved ? <Text style={{ color: colors.success }}>Profile updated.</Text> : null}
          {errorMessage ? <Text style={{ color: colors.danger }}>{errorMessage}</Text> : null}
          <AppButton label="Save profile" loading={isBusy} disabled={!name.trim() || name.trim() === user?.name} onPress={save} />
        </AppCard>
      </View>
    </AppScreen>
  );
}
