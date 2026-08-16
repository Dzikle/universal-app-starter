import { ID, InputFile } from 'react-native-appwrite';

import { getNativeAppwrite } from '@/core/appwrite/services.native';

import { normalizeFile } from './normalize';
import type { StorageAdapter } from './types';

const storage = () => getNativeAppwrite().storage;

export const storageAdapter: StorageAdapter = {
  async upload(input) {
    return normalizeFile(
      await storage().createFile({
        bucketId: input.bucketId,
        fileId: input.fileId ?? ID.unique(),
        file: InputFile.fromPath(input.asset.uri, input.asset.name),
        permissions: input.permissions,
      }),
    );
  },

  async get(input) {
    return normalizeFile(await storage().getFile(input));
  },

  async delete(input) {
    await storage().deleteFile(input);
  },

  getViewUrl(input) {
    return storage().getFileView(input).toString();
  },

  getDownloadUrl(input) {
    return storage().getFileDownload(input).toString();
  },
};
