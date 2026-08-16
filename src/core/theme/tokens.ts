export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  primary: string;
  onPrimary: string;
  border: string;
  danger: string;
  success: string;
};

export const lightColors: ThemeColors = {
  background: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF1F5',
  text: '#111827',
  textMuted: '#667085',
  primary: '#2563EB',
  onPrimary: '#FFFFFF',
  border: '#DDE2E8',
  danger: '#B42318',
  success: '#067647',
};

export const darkColors: ThemeColors = {
  background: '#0B0D10',
  surface: '#15181D',
  surfaceMuted: '#20242B',
  text: '#F5F7FA',
  textMuted: '#A5ADBA',
  primary: '#6EA8FE',
  onPrimary: '#071426',
  border: '#2B3038',
  danger: '#FDA29B',
  success: '#75E0A7',
};
