import type { RealtimeChannel } from './types';

export function toAppwriteChannel(channel: RealtimeChannel): string {
  switch (channel.kind) {
    case 'account':
      return 'account';
    case 'rows':
      return 'rows';
    case 'tableRows':
      return channel.rowId
        ? `tablesdb.${channel.databaseId}.tables.${channel.tableId}.rows.${channel.rowId}`
        : `tablesdb.${channel.databaseId}.tables.${channel.tableId}.rows`;
    case 'files':
      return 'files';
    case 'bucketFiles':
      return channel.fileId
        ? `buckets.${channel.bucketId}.files.${channel.fileId}`
        : `buckets.${channel.bucketId}.files`;
    case 'function':
      return `functions.${channel.functionId}`;
    case 'execution':
      return channel.executionId
        ? `executions.${channel.executionId}`
        : 'executions';
  }
}
