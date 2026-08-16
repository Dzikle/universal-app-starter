import { getWebAppwrite } from '@/core/appwrite/services.web';

import { toAppwriteChannel } from './channel';
import type {
  RealtimeAdapter,
  RealtimeChannel,
  RealtimeEvent,
  RealtimeUnsubscribe,
} from './types';

const realtime = () => getWebAppwrite().realtime;

export const realtimeAdapter: RealtimeAdapter = {
  async subscribe<T>(
    channel: RealtimeChannel | RealtimeChannel[],
    callback: (event: RealtimeEvent<T>) => void,
  ): Promise<RealtimeUnsubscribe> {
    const channels = (Array.isArray(channel) ? channel : [channel]).map(
      toAppwriteChannel,
    );
    const subscription = await realtime().subscribe<T>(channels, (response) => {
      callback({
        events: response.events,
        channels: response.channels,
        timestamp: response.timestamp,
        payload: response.payload,
      });
    });

    return async () => {
      await subscription.unsubscribe();
    };
  },

  async disconnect() {
    await realtime().disconnect();
  },
};
