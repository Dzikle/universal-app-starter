import type { DataRow } from './types';

type RawRow = Record<string, unknown> & {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions?: string[];
};

export function normalizeRow<T extends Record<string, unknown>>(
  row: RawRow,
): DataRow<T> {
  const data = Object.fromEntries(
    Object.entries(row).filter(([key]) => !key.startsWith('$')),
  ) as T;

  return {
    id: row.$id,
    createdAt: row.$createdAt,
    updatedAt: row.$updatedAt,
    permissions: row.$permissions ?? [],
    data,
  };
}
