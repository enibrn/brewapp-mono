## Completamento Milestone 1 (29 Marzo 2026)
La milestone è stata completata con successo nella directory `brewapp-mono/nuxt`. 
1. Struttura base Nuxt 4 configurata (`ssr: false`, `vuetify-nuxt-module`).
2. Implementato `useAuth.ts` con dummy methods (state in memoria).
3. UI implementata con Layout (default.vue) basato su blueprint Vuetify 3 in Dark mode e menu dropdown per il Logout.
4. E2E tests scritti ed eseguiti (passati al 100%) tramite Playwright su `/login`, `/register` e sul flusso globale.
5. Inserito un `.gitignore` per ignorare le cartelle di build e dei test (incluso `.nuxt` e `test-results`).