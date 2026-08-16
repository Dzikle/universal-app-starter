const clean = (value: string | undefined) => value?.trim() ?? '';

export const env = {
  appwriteEndpoint: clean(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT),
  appwriteProjectId: clean(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID),
  iosBundleId:
    clean(process.env.EXPO_PUBLIC_IOS_BUNDLE_ID) || 'com.dzikle.universalstarter',
  androidPackage:
    clean(process.env.EXPO_PUBLIC_ANDROID_PACKAGE) || 'com.dzikle.universalstarter',
  passwordRecoveryUrl: clean(process.env.EXPO_PUBLIC_PASSWORD_RECOVERY_URL),
};

export const isAppwriteConfigured = Boolean(
  env.appwriteEndpoint && env.appwriteProjectId,
);
