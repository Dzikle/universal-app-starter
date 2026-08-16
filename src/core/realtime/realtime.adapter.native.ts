import { getNativeAppwrite } from '@/core/appwrite/services.native';

import { toAppwriteChannel } from './channel';
import type {
  RealtimeAdapter,
  RealtimeChannel,
  RealtimeEvent,
  RealtimeUnsubscribe,
} from './types';

type NativeUnsubscribe = () => void;
const activeSubscriptions = new Set<NativeUnsubscribe>();

export const realtimeAdapter: RealtimeAdapter = {
  async subscribe<T>(
    channel: RealtimeChannel | RealtimeChannel[],
    callback: (event: RealtimeEvent<T>) => void,
  ): Promise<RealtimeUnsubscribe> {
    const channels = (Array.isArray(channel) ? channel : [channel]).map(
      toAppwriteChannel,
    );

    const unsubscribe = getNativeAppwrite().client.subscribe<T>(
      channels,
      (response) => {
        callback({
          events: response.events,
          channels: response.channels,
          timestamp: response.timestamp,
          payload: response.payload,
        });
      },
    );

    activeSubscriptions.add(unsubscribe);

    return async () => {
      if (activeSubscriptions.delete(unsubscribe)) {
        unsubscribe();
      }
    };
  },

  async disconnect() {
    for (const unsubscribe of [...activeSubscriptions]) {
      unsubscribe();
    }
    activeSubscriptions.clear();
  },
};
