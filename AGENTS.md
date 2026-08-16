# Agent instructions

This repository is a **domain-neutral universal application starter**.

## Non-negotiable architecture rules

- Do not add product/domain logic to the starter core.
- Do not import Appwrite SDKs from routes, components, or future domain features.
- All backend-provider calls go through a port/adapter under `src/core`.
- Prefer Expo/React Native primitives that work on Android, iOS, and web.
- Platform-specific behavior must be isolated with `.native.ts` / `.web.ts` modules or a documented adapter.
- `EXPO_PUBLIC_*` values are public client configuration. Never store secrets there.
- Keep new dependencies minimal. A dependency belongs in the starter only when it solves a broadly reusable infrastructure problem.
- Keep screens visually generic. Branding and product-specific design belong in projects created from this starter.

## Before changing core

Ask: "Would at least several unrelated applications need this?"

If the answer is no, implement it in the product repository, not here.

## Verification

Before opening or updating a PR:

```bash
npm install
npm run typecheck
npm run build:web
```

For native-facing changes, also run the app on Android and iOS when an appropriate environment is available.
