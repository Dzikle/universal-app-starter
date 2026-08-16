import 'react-native-url-polyfill/auto';

import { Platform } from 'react-native';
import { Account, Client, ID } from 'react-native-appwrite';

import { env, isAppwriteConfigured } from '@/core/config/env';
import { AppError } from '@/core/errors/AppError';

import type {
  AppUser,
  AuthAdapter,
  CompleteRecoveryInput,
  SignInInput,
  SignUpInput,
} from './types';

type RawUser = { $id: string; email: string; name: string };

let account: Account | null = null;

if (isAppwriteConfigured) {
  const platformId =
    Platform.OS === 'ios' ? env.iosBundleId : env.androidPackage;

  const client = new Client()
    .setEndpoint(env.appwriteEndpoint)
    .setProject(env.appwriteProjectId)
    .setPlatform(platformId);

  account = new Account(client);
}

const requireAccount = () => {
  if (!account) {
    throw new AppError(
      'configuration',
      'Appwrite is not configured. Copy .env.example to .env and set the endpoint and project ID.',
    );
  }
  return account;
};

const toUser = (user: RawUser): AppUser => ({
  id: user.$id,
  email: user.email,
  name: user.name,
});

export const authAdapter: AuthAdapter = {
  async getCurrentUser() {
    if (!account) return null;
    try {
      return toUser(await account.get());
    } catch {
      return null;
    }
  },

  async signIn(input: SignInInput) {
    const service = requireAccount();
    await service.createEmailPasswordSession(input);
    return toUser(await service.get());
  },

  async signUp(input: SignUpInput) {
    const service = requireAccount();
    await service.create({
      userId: ID.unique(),
      email: input.email,
      password: input.password,
      name: input.name,
    });
    await service.createEmailPasswordSession({
      email: input.email,
      password: input.password,
    });
    return toUser(await service.get());
  },

  async signOut() {
    await requireAccount().deleteSession({ sessionId: 'current' });
  },

  async updateName(name: string) {
    return toUser(await requireAccount().updateName({ name }));
  },

  async sendPasswordRecovery(email: string, redirectUrl: string) {
    await requireAccount().createRecovery({ email, url: redirectUrl });
  },

  async completePasswordRecovery(input: CompleteRecoveryInput) {
    await requireAccount().updateRecovery({
      userId: input.userId,
      secret: input.secret,
      password: input.password,
    });
  },
};
