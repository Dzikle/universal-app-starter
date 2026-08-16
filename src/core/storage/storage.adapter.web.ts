import { ID } from 'appwrite';

import { getWebAppwrite } from '@/core/appwrite/services.web';

import { normalizeFile } from './normalize';
import type { StorageAdapter } from './types';

const storage = () => getWebAppwrite().storage;

export const storageAdapter: StorageAdapter = {
  async upload(input) {
    const response = await fetch(input.asset.uri);
    const blob = await response.blob();
    const file = new File([blob], input.asset.name, {
      type: input.asset.mimeType || blob.type,
    });

    return normalizeFile(
      await storage().createFile({
        bucketId: input.bucketId,
        fileId: input.fileId ?? ID.unique(),
        file,
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
