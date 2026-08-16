import { Text, TextInput, type TextInputProps, View } from 'react-native';

import { useTheme } from '@/core/theme/ThemeProvider';

type AppTextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function AppTextField({ label, error, style, ...props }: AppTextFieldProps) {
  const { colors, radius, spacing } = useTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      <Text style={{ color: colors.text, fontWeight: '600' }}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={error}
        placeholderTextColor={colors.textMuted}
        {...props}
        style={[
          {
            minHeight: 48,
            borderWidth: 1,
            borderColor: error ? colors.danger : colors.border,
            borderRadius: radius.md,
            backgroundColor: colors.surface,
            color: colors.text,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.md,
            fontSize: 16,
          },
          style,
        ]}
      />
      {error ? (
        <Text accessibilityRole="alert" style={{ color: colors.danger, fontSize: 13 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
