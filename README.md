# Universal App Starter

A reusable, domain-neutral foundation for Android, iOS, and web applications.

The goal is simple: **new products should add domain logic, not rebuild application infrastructure.**

## Core stack

- Expo SDK 57
- Expo Router
- React Native + React Native Web
- TypeScript
- Appwrite Auth through platform adapters
- Appwrite TablesDB through a provider-neutral data port
- Appwrite Storage through a universal upload/file port
- Appwrite Realtime through provider-neutral channel subscriptions
- Appwrite Functions through a generic execution port
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

Open Android, iOS, or web from the Expo development server.

## Appwrite setup

Set the values from `.env.example`, then add three platforms in the Appwrite Console:

- Web: your local/production hostname
- Android: the package name from `app.json`
- Apple: the bundle identifier from `app.json`

The client contains no server API keys. Never place Appwrite server keys or other secrets in an `EXPO_PUBLIC_*` variable.

Tables, buckets, permissions, and function IDs are intentionally **not** hard-coded in the starter. A product supplies those identifiers from its own feature/config layer.

## Core ports

Feature code should import the generic adapter, not an Appwrite SDK:

```ts
import { dataAdapter } from '@/core/data/data.adapter';
import { storageAdapter } from '@/core/storage/storage.adapter';
import { realtimeAdapter } from '@/core/realtime/realtime.adapter';
import { functionAdapter } from '@/core/functions/functions.adapter';
```

For example, a product repository may create its own `tripRepository` or `propertyRepository` that uses `dataAdapter`, while domain code depends only on that repository.

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
src/core/auth/          Authentication port + adapter
src/core/data/          Generic TablesDB row/query port + adapter
src/core/storage/       Universal file/storage port + adapter
src/core/realtime/      Generic realtime channels + adapter
src/core/functions/     Generic function execution port + adapter
src/core/config/        Environment/configuration
src/core/errors/        Application error boundary types
src/core/logging/       Logging boundary
src/core/theme/         Design tokens + theme provider
src/providers/          Root providers
.github/workflows/      CI
```

See `AGENTS.md` before extending the starter.
