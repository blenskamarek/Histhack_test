# Histhack App

Projekt Expo z konfiguracją TypeScript, ESLint, Prettier, Husky oraz integracją narzędzi deweloperskich, nawigacji i zarządzania stanem.

## Wymagania

- Node.js 18+
- npm 9+
- Expo CLI (`npm install -g expo-cli`) - opcjonalnie

## Konfiguracja

```bash
npm install
```

Skopiuj plik `.env.example` do `.env` i dostosuj zmienne środowiskowe.

```bash
cp .env.example .env
```

## Dostępne skrypty

- `npm run start` – uruchomienie serwera deweloperskiego Expo.
- `npm run android` / `npm run ios` / `npm run web` – uruchomienie aplikacji na poszczególnych platformach.
- `npm run lint` – analiza statyczna kodu.
- `npm run typecheck` – sprawdzenie typów TypeScript.
- `npm test` – uruchomienie testów jednostkowych (Jest + Testing Library).
- `npm run format` – formatowanie kodu zgodnie z regułami Prettier.

## Struktura projektu

```
src/
  components/
  navigation/
  screens/
  services/
  store/
  theme/
```

## Git hooks

Husky uruchamia `lint-staged` dla plików TypeScript/JavaScript przed zatwierdzeniem zmian.

## CI/CD

GitHub Actions (workflow `CI`) wykonuje instalację zależności, linting, sprawdzanie typów i testy dla każdej gałęzi oraz pull requestu skierowanego do `main`.

## Stos technologiczny

- Expo 50 z React Native 0.73
- TypeScript 5
- React Navigation 6 (stack + tabs)
- Zustand do zarządzania stanem lokalnym
- @tanstack/react-query do pracy z API
- React Native Paper (motyw MD3)
- Axios, dotenv
- ESLint + Prettier + Husky + lint-staged
- GitHub Actions (lint, typecheck, test)
