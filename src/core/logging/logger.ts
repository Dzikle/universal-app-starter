type Metadata = Record<string, unknown> | undefined;

export const logger = {
  info(message: string, metadata?: Metadata) {
    if (__DEV__) console.info(message, metadata ?? '');
  },
  warn(message: string, metadata?: Metadata) {
    console.warn(message, metadata ?? '');
  },
  error(message: string, error?: unknown, metadata?: Metadata) {
    console.error(message, error, metadata ?? '');
  },
};
