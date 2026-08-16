export type PushRegistration = {
  supported: boolean;
  granted: boolean;
  targetId?: string;
  token?: string;
};

export interface NotificationAdapter {
  registerPushTarget(input?: { providerId?: string }): Promise<PushRegistration>;
  unregisterPushTarget(): Promise<void>;
}
