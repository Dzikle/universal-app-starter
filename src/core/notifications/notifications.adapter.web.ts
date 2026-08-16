import type { NotificationAdapter } from './types';

export const notificationAdapter: NotificationAdapter = {
  async registerPushTarget() {
    return { supported: false, granted: false };
  },
  async unregisterPushTarget() {},
};
