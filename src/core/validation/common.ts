const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function required(value: string, label: string) {
  return value.trim() ? undefined : `${label} is required.`;
}

export function email(value: string) {
  if (!value.trim()) return 'Email is required.';
  return EMAIL_PATTERN.test(value.trim())
    ? undefined
    : 'Enter a valid email address.';
}

export function password(value: string) {
  if (!value) return 'Password is required.';
  return value.length >= 8
    ? undefined
    : 'Password must contain at least 8 characters.';
}
