# Universal App Starter

A reusable, domain-neutral foundation for Android, iOS, and web applications.

The goal is simple: **new products should add domain logic, not rebuild application infrastructure.**

## Core stack

- Expo SDK 57
- Expo Router
- React Native + React Native Web
- TypeScript
- Appwrite Auth through platform adapters
- Appwrite-ready database/storage/realtime boundary
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
src/core/auth/          Auth port + Appwrite platform adapters
src/core/config/        Environment/configuration
src/core/errors/        Application error boundary types
src/core/logging/       Logging boundary
src/core/theme/         Design tokens + theme provider
src/providers/          Root providers
.github/workflows/      CI
```

See `AGENTS.md` before extending the starter.
