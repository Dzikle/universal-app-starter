import { getNativeAppwrite } from '@/core/appwrite/services.native';

import { toAppwriteChannel } from './channel';
import type { RealtimeAdapter, RealtimeEvent } from './types';

const realtime = () => getNativeAppwrite().realtime;

export const realtimeAdapter: RealtimeAdapter = {
  async subscribe(channel, callback) {
    const channels = (Array.isArray(channel) ? channel : [channel]).map(
      toAppwriteChannel,
    );
    const subscription = await realtime().subscribe(channels, (response) => {
      callback(response as RealtimeEvent);
    });

    return async () => {
      await subscription.unsubscribe();
    };
  },

  async disconnect() {
    await realtime().disconnect();
  },
};
