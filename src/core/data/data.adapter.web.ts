import { ID, Query } from 'appwrite';

import { getWebAppwrite } from '@/core/appwrite/services.web';

import { normalizeRow } from './normalize';
import type { DataAdapter, DataQuery } from './types';

function compileQuery(query: DataQuery): string {
  switch (query.kind) {
    case 'equal':
      return Query.equal(query.column, query.value);
    case 'notEqual':
      return Query.notEqual(query.column, query.value);
    case 'search':
      return Query.search(query.column, query.value);
    case 'orderAsc':
      return Query.orderAsc(query.column);
    case 'orderDesc':
      return Query.orderDesc(query.column);
    case 'limit':
      return Query.limit(query.value);
    case 'offset':
      return Query.offset(query.value);
    case 'cursorAfter':
      return Query.cursorAfter(query.rowId);
    case 'cursorBefore':
      return Query.cursorBefore(query.rowId);
  }
}

const tables = () => getWebAppwrite().tables;

export const dataAdapter: DataAdapter = {
  async createRow(input) {
    const row = await tables().createRow({
      databaseId: input.databaseId,
      tableId: input.tableId,
      rowId: input.rowId ?? ID.unique(),
      data: input.data,
      permissions: input.permissions,
    });
    return normalizeRow(row);
  },

  async getRow(input) {
    return normalizeRow(
      await tables().getRow({
        databaseId: input.databaseId,
        tableId: input.tableId,
        rowId: input.rowId,
      }),
    );
  },

  async listRows(input) {
    const result = await tables().listRows({
      databaseId: input.databaseId,
      tableId: input.tableId,
      queries: input.queries?.map(compileQuery),
      total: input.includeTotal ?? true,
    });

    return {
      total: result.total,
      rows: result.rows.map((row) => normalizeRow(row)),
    };
  },

  async updateRow(input) {
    return normalizeRow(
      await tables().updateRow({
        databaseId: input.databaseId,
        tableId: input.tableId,
        rowId: input.rowId,
        data: input.data,
        permissions: input.permissions,
      }),
    );
  },

  async deleteRow(input) {
    await tables().deleteRow(input);
  },
};
