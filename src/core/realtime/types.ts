export type RealtimeChannel =
  | { kind: 'account' }
  | { kind: 'rows' }
  | { kind: 'tableRows'; databaseId: string; tableId: string; rowId?: string }
  | { kind: 'files' }
  | { kind: 'bucketFiles'; bucketId: string; fileId?: string }
  | { kind: 'function'; functionId: string }
  | { kind: 'execution'; executionId?: string };

export type RealtimeEvent<T = unknown> = {
  events: string[];
  channels: string[];
  timestamp: string;
  payload: T;
};

export type RealtimeUnsubscribe = () => Promise<void>;

export interface RealtimeAdapter {
  subscribe<T = unknown>(
    channel: RealtimeChannel | RealtimeChannel[],
    callback: (event: RealtimeEvent<T>) => void,
  ): Promise<RealtimeUnsubscribe>;
  disconnect(): Promise<void>;
}
