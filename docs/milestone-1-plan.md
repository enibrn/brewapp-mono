# Plan Milestone 1: Skeleton Nuxt 3 + Vuetify 3 (con ricerca DeepWiki)

Questa è la pianificazione aggiornata e dettagliata per la prima milestone, che include l'analisi preliminare del codice preesistente tramite la DeepWiki, come richiesto dalle direttive iniziali. L'obiettivo è creare l'impalcatura di base dell'applicazione usando le best practices già esplorate nei vecchi MVP.

## Task 0: Ricerca preliminare nella DeepWiki e nei vecchi esempi
Prima di scrivere nuovo codice, è fondamentale studiare le soluzioni adottate in precedenza per non reinventare la ruota:
- [ ] **Configurazione Nuxt + Vuetify:** Consultare `/root/workspace/enibrn-brewapp-mono-DeepWiki/Brewson-—-Vuetify-+-Test-Utils-Application.md` per capire come configurare in modo stabile Nuxt 3 con Vuetify 3, disabilitare l'SSR (`ssr: false`) e predisporre la future-compatibility a Nuxt 4 (`compatibilityVersion: 4`). Visionare poi il codice effettivo in `old-examples/brewson/nuxt.config.ts`.
- [ ] **Astrazione Autenticazione:** Leggere `/root/workspace/enibrn-brewapp-mono-DeepWiki/Authentication-Flow-and-Middleware.md` e `/root/workspace/enibrn-brewapp-mono-DeepWiki/Days-Before-Apps-—-BaaS-Abstraction-Library.md` per studiare il pattern dell'astrazione dell'autenticazione tramite un composable `useAuth`. Controllare come sono stati gestiti i metodi dummy e i middleware di protezione nei progetti passati (es. `old-examples/days-before-apps/base/base-app/composables/useAuth.ts`).

## Task 1: Setup dell'Applicazione
- [ ] **Inizializzazione progetto:** Creare una nuova applicazione Nuxt 3 nel monorepo -> nuova cartella chiamata nuxt
- [ ] **Configurazione SSR e Future-Proofing:** 
  - Impostare `ssr: false` nel file `nuxt.config.ts`.
  - Attivare l'impostazione `compatibilityVersion: 4` (servirà creare la cartella nuxt/app).
- [ ] **Integrazione Vuetify 3:**
  - Installare Vuetify 3 e il modulo Nuxt dedicato (es. `vuetify-nuxt-module` se applicabile, basandosi su quanto visto in `brewson`).
  - Abilitare la dark mode come default per corrispondere alle richieste.

## Task 2: Sviluppo del Layout e Homepage (Blueprint)
- [ ] **Implementazione Componente Base:** Tradurre il blueprint Vue fornito nel `ideas-dump.md` e inserirlo in un layout dedicato (`layouts/default.vue`).
- [ ] **Componenti Vuetify:** Inserire `v-system-bar`, `v-app-bar`, `v-navigation-drawer` e `v-main` secondo lo schema.
- [ ] **Icona Utente e Menu a tendina:** 
  - Aggiungere un'icona generica utente nella parte destra della `v-system-bar`.
  - Configurare un menu a tendina (`v-menu`) attivato al click sull'icona, contenente l'opzione "Logout".

## Task 3: Astrazione e Workflow di Autenticazione (Dummy)
- [ ] **Astrazione dei Servizi (Monolite Modulare):**
  - Implementare un sistema per l'auth (es. composables `useAuth`), basato su quanto studiato nel Task 0, ma tenendolo all'interno dell'app (niente package esterni per ora).
- [ ] **Implementazione dei Metodi Dummy:**
  - Creare logiche mock in memoria per `login` e `register` per simulare l'accesso.
  - Implementare la funzione di `logout` collegandola al menu della system bar.
- [ ] **Pagine/Componenti di UI:**
  - Creare interfacce molto basilari per le pagine di Login e Registrazione (in attesa di JSON Forms/Appwrite).

## Task 4: Configurazione e Scrittura Test E2E
- [ ] **Setup Framework:** Installare e configurare un framework di test E2E
  - Playwright è la scelta raccomandata ufficialmente dal team di Nuxt per i test E2E. Tramite @nuxt/test-utils, ottieni degli "helper" specifici che semplificano enormemente il lavoro:
  - Avvio automatico del server: Quando lanci i test, l'utility avvia un server Nuxt in background, esegue i test e poi lo spegne.
  - Helper dedicati: Ti fornisce funzioni come setup(), $fetch() e createPage() (se usi Playwright) per interagire direttamente con la tua app Nuxt renderizzata.
- [ ] **Sviluppo Use-Cases:**
  - Scrivere un test che verifichi il flusso di **Registrazione**.
  - Scrivere un test che verifichi il flusso di **Login**.
  - Scrivere un test che verifichi il **Logout** tramite la system bar. 
- [ ] **Verifica:** Assicurarsi che tutti i test passino usando l'implementazione dummy creata.
