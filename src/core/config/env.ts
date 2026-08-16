const clean = (value: string | undefined) => value?.trim() ?? '';
const enabled = (value: string | undefined) => clean(value).toLowerCase() === 'true';

export const env = {
  appwriteEndpoint: clean(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT),
  appwriteProjectId: clean(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID),
  iosBundleId:
    clean(process.env.EXPO_PUBLIC_IOS_BUNDLE_ID) || 'com.dzikle.universalstarter',
  androidPackage:
    clean(process.env.EXPO_PUBLIC_ANDROID_PACKAGE) || 'com.dzikle.universalstarter',
  passwordRecoveryUrl: clean(process.env.EXPO_PUBLIC_PASSWORD_RECOVERY_URL),
  appwritePushProviderId: clean(
    process.env.EXPO_PUBLIC_APPWRITE_PUSH_PROVIDER_ID,
  ),
  oauth: {
    google: enabled(process.env.EXPO_PUBLIC_AUTH_GOOGLE_ENABLED),
    apple: enabled(process.env.EXPO_PUBLIC_AUTH_APPLE_ENABLED),
    github: enabled(process.env.EXPO_PUBLIC_AUTH_GITHUB_ENABLED),
    facebook: enabled(process.env.EXPO_PUBLIC_AUTH_FACEBOOK_ENABLED),
  },
};

export const isAppwriteConfigured = Boolean(
  env.appwriteEndpoint && env.appwriteProjectId,
);
