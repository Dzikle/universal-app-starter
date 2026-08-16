import type { StoredFile } from './types';

type RawFile = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[];
  bucketId: string;
  name: string;
  mimeType: string;
  sizeOriginal: number;
};

export function normalizeFile(file: RawFile): StoredFile {
  return {
    id: file.$id,
    bucketId: file.bucketId,
    name: file.name,
    mimeType: file.mimeType,
    size: file.sizeOriginal,
    createdAt: file.$createdAt,
    updatedAt: file.$updatedAt,
    permissions: file.$permissions ?? [],
  };
}
