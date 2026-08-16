import type { KeyValueStorage } from './types';

const hasStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export const persistence: KeyValueStorage = {
  async get(key) {
    return hasStorage() ? window.localStorage.getItem(key) : null;
  },
  async set(key, value) {
    if (hasStorage()) window.localStorage.setItem(key, value);
  },
  async remove(key) {
    if (hasStorage()) window.localStorage.removeItem(key);
  },
};
