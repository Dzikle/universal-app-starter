import { useState } from 'react';

export type FormErrors<T extends Record<string, string>> = Partial<
  Record<keyof T, string>
>;

type UseFormInput<T extends Record<string, string>> = {
  initialValues: T;
  validate(values: T): FormErrors<T>;
  onSubmit(values: T): void | Promise<unknown>;
};

export function useForm<T extends Record<string, string>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormInput<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = async () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return false;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    setErrors,
    submit,
  };
}
