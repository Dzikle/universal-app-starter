import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { AppError } from '@/core/errors/AppError';

import { authAdapter } from './auth.adapter';
import type { AppUser, OAuthProviderId } from './types';

if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const asString = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export async function signInWithOAuth(
  provider: OAuthProviderId,
  scopes?: string[],
): Promise<AppUser | null> {
  const redirectUrl = Linking.createURL('oauth/callback');
  const separator = redirectUrl.includes('?') ? '&' : '?';
  const failureUrl = `${redirectUrl}${separator}oauthError=1`;
  const authUrl = authAdapter.createOAuthTokenUrl({
    provider,
    success: redirectUrl,
    failure: failureUrl,
    scopes,
  });

  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
  if (result.type !== 'success' || !result.url) return null;

  const parsed = Linking.parse(result.url);
  const userId = asString(parsed.queryParams?.userId as string | string[] | undefined);
  const secret = asString(parsed.queryParams?.secret as string | string[] | undefined);
  const oauthError = asString(
    parsed.queryParams?.oauthError as string | string[] | undefined,
  );

  if (oauthError) {
    throw new AppError('authentication', 'Social sign-in was not completed.');
  }
  if (!userId || !secret) {
    throw new AppError(
      'authentication',
      'The social sign-in callback did not contain a valid session token.',
    );
  }

  return authAdapter.createTokenSession({ userId, secret });
}
