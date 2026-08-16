# Security

## Client configuration

Everything prefixed with `EXPO_PUBLIC_` is bundled into the client and must be treated as public. Never place Appwrite server API keys, OAuth client secrets, signing keys, private credentials, or other secrets in those variables.

Use Appwrite client permissions for application access and keep privileged operations inside trusted server-side functions or services.

## Dependency policy

CI uses the committed npm lockfile, checks Expo package compatibility, and blocks critical npm audit findings. Dependabot checks npm and GitHub Actions dependencies weekly.

### Current Expo / Metro audit findings

At bootstrap time (2026-08-16), npm reports high-severity advisories in transitive Expo/React Native build-tool dependencies, primarily `image-size` through Metro, plus a moderate `uuid` advisory through Expo configuration tooling.

`npm audit fix --force` currently proposes downgrading Expo from SDK 57 to SDK 53, which is not an acceptable remediation for this starter. These findings are therefore tracked as upstream toolchain risks rather than silently force-fixed.

Re-evaluate this exception whenever Expo/React Native dependency updates land. Do not broaden the exception to unrelated critical vulnerabilities.

## Reporting

For a private product created from this starter, follow that product's security reporting process. Avoid publishing secrets, tokens, customer data, or exploit details in a public issue.
