export type DataValue = string | number | boolean;

export type DataQuery =
  | { kind: 'equal'; column: string; value: DataValue | DataValue[] }
  | { kind: 'notEqual'; column: string; value: DataValue | DataValue[] }
  | { kind: 'search'; column: string; value: string }
  | { kind: 'orderAsc'; column: string }
  | { kind: 'orderDesc'; column: string }
  | { kind: 'limit'; value: number }
  | { kind: 'offset'; value: number }
  | { kind: 'cursorAfter'; rowId: string }
  | { kind: 'cursorBefore'; rowId: string };

export type DataRow<T extends Record<string, unknown>> = {
  id: string;
  createdAt: string;
  updatedAt: string;
  permissions: string[];
  data: T;
};

export type DataPage<T extends Record<string, unknown>> = {
  total: number;
  rows: DataRow<T>[];
};

export type CreateRowInput<T extends Record<string, unknown>> = {
  databaseId: string;
  tableId: string;
  data: T;
  rowId?: string;
  permissions?: string[];
};

export type RowLocator = {
  databaseId: string;
  tableId: string;
  rowId: string;
};

export interface DataAdapter {
  createRow<T extends Record<string, unknown>>(
    input: CreateRowInput<T>,
  ): Promise<DataRow<T>>;
  getRow<T extends Record<string, unknown>>(
    input: RowLocator,
  ): Promise<DataRow<T>>;
  listRows<T extends Record<string, unknown>>(input: {
    databaseId: string;
    tableId: string;
    queries?: DataQuery[];
    includeTotal?: boolean;
  }): Promise<DataPage<T>>;
  updateRow<T extends Record<string, unknown>>(
    input: RowLocator & { data: Partial<T>; permissions?: string[] },
  ): Promise<DataRow<T>>;
  deleteRow(input: RowLocator): Promise<void>;
}
