import * as Crypto from 'expo-crypto';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { getNativeAppwrite } from '@/core/appwrite/services.native';
import { AppError } from '@/core/errors/AppError';
import { persistence } from '@/core/persistence/persistence';

import type { NotificationAdapter } from './types';

const TARGET_ID_KEY = 'core.push-target-id';

async function getTargetId() {
  const existing = await persistence.get(TARGET_ID_KEY);
  if (existing) return existing;
  const created = Crypto.randomUUID();
  await persistence.set(TARGET_ID_KEY, created);
  return created;
}

async function getPermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return current;
  if (!current.canAskAgain) return current;
  return Notifications.requestPermissionsAsync();
}

export const notificationAdapter: NotificationAdapter = {
  async registerPushTarget(input) {
    const permission = await getPermission();
    if (!permission.granted) {
      return { supported: true, granted: false };
    }

    const deviceToken = await Notifications.getDevicePushTokenAsync();
    if (typeof deviceToken.data !== 'string') {
      throw new AppError(
        'configuration',
        'This platform did not return an APNs/FCM string token.',
      );
    }

    const targetId = await getTargetId();
    const account = getNativeAppwrite().account;

    try {
      await account.createPushTarget({
        targetId,
        identifier: deviceToken.data,
        providerId: input?.providerId,
      });
    } catch (error) {
      const code =
        typeof error === 'object' && error && 'code' in error
          ? Number((error as { code?: unknown }).code)
          : undefined;
      if (code !== 409) throw error;
      await account.updatePushTarget({
        targetId,
        identifier: deviceToken.data,
      });
    }

    return {
      supported: true,
      granted: true,
      targetId,
      token: deviceToken.data,
    };
  },

  async unregisterPushTarget() {
    const targetId = await persistence.get(TARGET_ID_KEY);
    if (!targetId) return;
    await getNativeAppwrite().account.deletePushTarget({ targetId });
    await persistence.remove(TARGET_ID_KEY);
  },
};
