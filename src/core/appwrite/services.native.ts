import 'react-native-url-polyfill/auto';

import { Platform } from 'react-native';
import {
  Account,
  Client,
  Functions,
  Storage,
  TablesDB,
} from 'react-native-appwrite';

import { env, isAppwriteConfigured } from '@/core/config/env';
import { AppError } from '@/core/errors/AppError';

type NativeAppwriteServices = {
  client: Client;
  account: Account;
  tables: TablesDB;
  storage: Storage;
  functions: Functions;
};

let services: NativeAppwriteServices | null = null;

export function getNativeAppwrite(): NativeAppwriteServices {
  if (!isAppwriteConfigured) {
    throw new AppError(
      'configuration',
      'Appwrite is not configured. Copy .env.example to .env and set the endpoint and project ID.',
    );
  }

  if (!services) {
    const platformId =
      Platform.OS === 'ios' ? env.iosBundleId : env.androidPackage;

    const client = new Client()
      .setEndpoint(env.appwriteEndpoint)
      .setProject(env.appwriteProjectId)
      .setPlatform(platformId);

    services = {
      client,
      account: new Account(client),
      tables: new TablesDB(client),
      storage: new Storage(client),
      functions: new Functions(client),
    };
  }

  return services;
}
