import { Account, Client, Functions, Realtime, Storage, TablesDB } from 'appwrite';

import { env, isAppwriteConfigured } from '@/core/config/env';
import { AppError } from '@/core/errors/AppError';

type WebAppwriteServices = {
  client: Client;
  account: Account;
  tables: TablesDB;
  storage: Storage;
  realtime: Realtime;
  functions: Functions;
};

let services: WebAppwriteServices | null = null;

export function getWebAppwrite(): WebAppwriteServices {
  if (!isAppwriteConfigured) {
    throw new AppError(
      'configuration',
      'Appwrite is not configured. Copy .env.example to .env and set the endpoint and project ID.',
    );
  }

  if (!services) {
    const client = new Client()
      .setEndpoint(env.appwriteEndpoint)
      .setProject(env.appwriteProjectId);

    services = {
      client,
      account: new Account(client),
      tables: new TablesDB(client),
      storage: new Storage(client),
      realtime: new Realtime(client),
      functions: new Functions(client),
    };
  }

  return services;
}
