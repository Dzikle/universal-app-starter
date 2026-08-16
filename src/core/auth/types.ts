export type AppUser = {
  id: string;
  email: string;
  name: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = SignInInput & {
  name: string;
};

export type CompleteRecoveryInput = {
  userId: string;
  secret: string;
  password: string;
};

export type OAuthProviderId =
  | 'google'
  | 'apple'
  | 'github'
  | 'facebook'
  | 'microsoft';

export type OAuthUrlInput = {
  provider: OAuthProviderId;
  success: string;
  failure?: string;
  scopes?: string[];
};

export interface AuthAdapter {
  getCurrentUser(): Promise<AppUser | null>;
  signIn(input: SignInInput): Promise<AppUser>;
  signUp(input: SignUpInput): Promise<AppUser>;
  signOut(): Promise<void>;
  updateName(name: string): Promise<AppUser>;
  sendPasswordRecovery(email: string, redirectUrl: string): Promise<void>;
  completePasswordRecovery(input: CompleteRecoveryInput): Promise<void>;
  createOAuthTokenUrl(input: OAuthUrlInput): string;
  createTokenSession(input: { userId: string; secret: string }): Promise<AppUser>;
}
