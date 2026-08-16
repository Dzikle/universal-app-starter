export type AppErrorCode =
  | 'configuration'
  | 'authentication'
  | 'validation'
  | 'network'
  | 'unknown';

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly cause?: unknown;

  constructor(code: AppErrorCode, message: string, cause?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.cause = cause;
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError('unknown', error.message, error);
  }

  return new AppError('unknown', 'Something went wrong.', error);
}
