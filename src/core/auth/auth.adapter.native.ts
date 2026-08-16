import { ID } from 'react-native-appwrite';

import { getNativeAppwrite } from '@/core/appwrite/services.native';
import { isAppwriteConfigured } from '@/core/config/env';

import type {
  AppUser,
  AuthAdapter,
  CompleteRecoveryInput,
  SignInInput,
  SignUpInput,
} from './types';

type RawUser = { $id: string; email: string; name: string };

const account = () => getNativeAppwrite().account;

const toUser = (user: RawUser): AppUser => ({
  id: user.$id,
  email: user.email,
  name: user.name,
});

export const authAdapter: AuthAdapter = {
  async getCurrentUser() {
    if (!isAppwriteConfigured) return null;
    try {
      return toUser(await account().get());
    } catch {
      return null;
    }
  },

  async signIn(input: SignInInput) {
    await account().createEmailPasswordSession(input);
    return toUser(await account().get());
  },

  async signUp(input: SignUpInput) {
    await account().create({
      userId: ID.unique(),
      email: input.email,
      password: input.password,
      name: input.name,
    });
    await account().createEmailPasswordSession({
      email: input.email,
      password: input.password,
    });
    return toUser(await account().get());
  },

  async signOut() {
    await account().deleteSession({ sessionId: 'current' });
  },

  async updateName(name: string) {
    return toUser(await account().updateName({ name }));
  },

  async sendPasswordRecovery(email: string, redirectUrl: string) {
    await account().createRecovery({ email, url: redirectUrl });
  },

  async completePasswordRecovery(input: CompleteRecoveryInput) {
    await account().updateRecovery({
      userId: input.userId,
      secret: input.secret,
      password: input.password,
    });
  },
};
