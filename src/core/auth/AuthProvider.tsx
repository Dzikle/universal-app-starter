import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { toAppError } from '@/core/errors/AppError';
import { logger } from '@/core/logging/logger';

import { authAdapter } from './auth.adapter';
import { signInWithOAuth as runOAuthSignIn } from './oauth';
import type {
  AppUser,
  CompleteRecoveryInput,
  OAuthProviderId,
  SignInInput,
  SignUpInput,
} from './types';

type AuthContextValue = {
  user: AppUser | null;
  isReady: boolean;
  isBusy: boolean;
  errorMessage: string | null;
  clearError(): void;
  refresh(): Promise<void>;
  signIn(input: SignInInput): Promise<boolean>;
  signUp(input: SignUpInput): Promise<boolean>;
  signInWithOAuth(provider: OAuthProviderId, scopes?: string[]): Promise<boolean>;
  signOut(): Promise<void>;
  updateName(name: string): Promise<boolean>;
  sendPasswordRecovery(email: string, redirectUrl: string): Promise<boolean>;
  completePasswordRecovery(input: CompleteRecoveryInput): Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = useCallback(() => setErrorMessage(null), []);

  const run = useCallback(async <T,>(work: () => Promise<T>) => {
    setIsBusy(true);
    setErrorMessage(null);
    try {
      return { ok: true as const, value: await work() };
    } catch (error) {
      const appError = toAppError(error);
      logger.warn('Auth operation failed', { code: appError.code, message: appError.message });
      setErrorMessage(appError.message);
      return { ok: false as const };
    } finally {
      setIsBusy(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    const currentUser = await authAdapter.getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    refresh()
      .catch((error) => logger.error('Failed to bootstrap auth', error))
      .finally(() => setIsReady(true));
  }, [refresh]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isBusy,
      errorMessage,
      clearError,
      refresh,
      async signIn(input) {
        const result = await run(() => authAdapter.signIn(input));
        if (!result.ok) return false;
        setUser(result.value);
        return true;
      },
      async signUp(input) {
        const result = await run(() => authAdapter.signUp(input));
        if (!result.ok) return false;
        setUser(result.value);
        return true;
      },
      async signInWithOAuth(provider, scopes) {
        const result = await run(() => runOAuthSignIn(provider, scopes));
        if (!result.ok || !result.value) return false;
        setUser(result.value);
        return true;
      },
      async signOut() {
        const result = await run(() => authAdapter.signOut());
        if (result.ok) setUser(null);
      },
      async updateName(name) {
        const result = await run(() => authAdapter.updateName(name));
        if (!result.ok) return false;
        setUser(result.value);
        return true;
      },
      async sendPasswordRecovery(email, redirectUrl) {
        const result = await run(() =>
          authAdapter.sendPasswordRecovery(email, redirectUrl),
        );
        return result.ok;
      },
      async completePasswordRecovery(input) {
        const result = await run(() => authAdapter.completePasswordRecovery(input));
        return result.ok;
      },
    }),
    [clearError, errorMessage, isBusy, isReady, refresh, run, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
