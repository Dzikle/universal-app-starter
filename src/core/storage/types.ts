export type UploadAsset = {
  uri: string;
  name: string;
  mimeType: string;
  size: number;
};

export type StoredFile = {
  id: string;
  bucketId: string;
  name: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  permissions: string[];
};

export interface StorageAdapter {
  upload(input: {
    bucketId: string;
    asset: UploadAsset;
    fileId?: string;
    permissions?: string[];
  }): Promise<StoredFile>;
  get(input: { bucketId: string; fileId: string }): Promise<StoredFile>;
  delete(input: { bucketId: string; fileId: string }): Promise<void>;
  getViewUrl(input: { bucketId: string; fileId: string; token?: string }): string;
  getDownloadUrl(input: { bucketId: string; fileId: string; token?: string }): string;
}
