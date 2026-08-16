import * as SecureStore from 'expo-secure-store';

import type { KeyValueStorage } from './types';

export const persistence: KeyValueStorage = {
  get(key) {
    return SecureStore.getItemAsync(key);
  },
  async set(key, value) {
    await SecureStore.setItemAsync(key, value);
  },
  async remove(key) {
    await SecureStore.deleteItemAsync(key);
  },
};
