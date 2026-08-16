# Universal App Starter

A reusable, domain-neutral foundation for Android, iOS, and web applications.

The goal is simple: **new products should add domain logic, not rebuild application infrastructure.**

## Core stack

- Expo SDK 57 + Expo Router
- React Native + React Native Web
- TypeScript
- Appwrite Auth with email/password, recovery, and optional OAuth providers
- Appwrite TablesDB through a provider-neutral data port
- Appwrite Storage through a universal upload/file port
- Appwrite Realtime through provider-neutral channel subscriptions
- Appwrite Functions through a generic execution port
- Native APNs/FCM registration into Appwrite Messaging
- Secure native/local web persistence boundary
- Reusable form/validation primitives
- EAS development, preview, and production build profiles
- GitHub Actions verification

## Principles

1. **Core only.** No travel, marketplace, property, commerce, or other product-specific logic belongs here.
2. **Universal first.** Android, iOS, and web are first-class targets.
3. **Appwrite stays behind adapters.** Feature code must not call Appwrite SDKs directly.
4. **Runnable before backend setup.** The shell boots without Appwrite credentials and clearly reports that backend configuration is missing.
5. **Clone, rename, configure, build the domain.** This repository is intended to become a GitHub template.

## Quick start

```bash
npm install
cp .env.example .env
npm run start
```

For native capabilities such as remote push notifications and reliable OAuth deep-link redirects, use an Expo development build:

```bash
npx eas build --profile development --platform android
# or
npx eas build --profile development --platform ios
```

## Appwrite setup

Set the values from `.env.example`, then add three platforms in the Appwrite Console:

- Web: your local/production hostname
- Android: the package name from `app.json`
- Apple: the bundle identifier from `app.json`

The client contains no server API keys. Never place Appwrite server keys or other secrets in an `EXPO_PUBLIC_*` variable.

Tables, buckets, permissions, and function IDs are intentionally **not** hard-coded in the starter. A product supplies those identifiers from its own feature/config layer.

### Authentication

Email/password works through the auth adapter. Password recovery is enabled when `EXPO_PUBLIC_PASSWORD_RECOVERY_URL` is set and allowed by Appwrite.

Optional social buttons are controlled by the `EXPO_PUBLIC_AUTH_*_ENABLED` flags. Before enabling one, configure that OAuth provider in Appwrite and allow the generated `/oauth/callback` redirect URL. Native OAuth should be tested in a development or production build rather than relying on Expo Go.

### Push notifications

The starter requests a native APNs/FCM device token and registers it as an Appwrite push target. Configure APNs/FCM credentials and an Appwrite Messaging push provider first. `EXPO_PUBLIC_APPWRITE_PUSH_PROVIDER_ID` is optional; when omitted Appwrite can use the first configured push provider.

Remote push registration is intentionally a user-triggered action in Settings rather than an automatic permission prompt at startup.

## Core ports

Feature code should import the generic adapter, not an Appwrite SDK:

```ts
import { dataAdapter } from '@/core/data/data.adapter';
import { storageAdapter } from '@/core/storage/storage.adapter';
import { realtimeAdapter } from '@/core/realtime/realtime.adapter';
import { functionAdapter } from '@/core/functions/functions.adapter';
```

For example, a product repository may create its own `tripRepository` or `propertyRepository` that uses `dataAdapter`, while domain code depends only on that repository.

### Native compatibility note

The pinned React Native Appwrite SDK currently exposes Realtime through `Client.subscribe()` rather than the newer Web `Realtime` service, and native file uploads use a `{ uri, name, type, size }` object. Those differences are contained entirely inside the native adapters so feature code sees one API.

## Scripts

```bash
npm run start
npm run android
npm run ios
npm run web
npm run build:web
npm run typecheck
```

## Repository layout

```text
app/                    Expo Router routes
src/components/         Generic reusable UI primitives
src/core/appwrite/      Shared platform-specific Appwrite clients/services
src/core/auth/          Authentication + OAuth port/adapters
src/core/data/          Generic TablesDB row/query port + adapter
src/core/storage/       Universal file/storage port + adapter
src/core/realtime/      Generic realtime channels + adapter
src/core/functions/     Generic function execution port + adapter
src/core/notifications/ Push registration abstraction
src/core/persistence/   Secure native / local web key-value storage
src/core/forms/         Small reusable form-state hook
src/core/validation/    Common validation rules
src/core/config/        Environment/configuration
src/core/errors/        Application error boundary types
src/core/logging/       Logging boundary
src/core/theme/         Design tokens + theme provider
src/providers/          Root providers
.github/workflows/      CI
```

See `AGENTS.md` before extending the starter.
