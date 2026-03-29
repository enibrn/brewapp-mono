# Plan: Milestone 2 - Form Driven Design (JSON Forms)

Questo documento definisce il piano di sviluppo per la **Milestone 2** del progetto `brewapp-mono`, tenendo conto del contesto delineato nel file `ideas-dump.md`, della Deep-Wiki e delle milestones passate e future.

## 1. Analisi del Contesto

### Milestone in esame: 2) Form Driven Design
L'obiettivo principale è introdurre la generazione dinamica dei form tramite JSON Forms. 
- **Librerie:** `@jsonforms/core`, `@jsonforms/vue`, e i renderer per Vuetify 3 (es. `@jsonforms/vue-vuetify`). In caso di difficoltà con i renderer ufficiali, si procederà con lo sviluppo di renderer custom.
- **Scope:** Applicare JSON Forms esclusivamente alle schermate di **Login** e **Register**.
- **Gestione Errori:** Gestire sia gli errori a livello di campo (validazione JSON Schema) sia gli errori generici a livello di form (es. credenziali errate dal sistema di auth dummy).
- **Test:** Adeguamento dei test E2E esistenti e aggiunta dei casi di fallimento/errore.
- **Deep-Wiki Insight:** Come descritto in `Vuetify-JSON-Forms-and-Other-Nuxt-Integrations.md`, esiste già un esempio (`vuetify-jsonforms-nuxt`) che dimostra l'integrazione di `@jsonforms/vue` con Vuetify 3. È importante ricordare l'uso di `markRaw` sui renderer per prevenire problemi di performance legati alla reattività profonda di Vue.

### Milestone passate (Milestone 1)
- Abbiamo un'app Nuxt 3 + Vuetify 3 funzionante, con SSR disabilitato.
- L'astrazione del workflow di Auth (login, register, logout) è già presente con un'implementazione dummy, pronta per essere agganciata ai nuovi form.
- Sono presenti test E2E di base (happy path).

### Milestone future (Bigger Picture)
- **Milestone 3 (BaaS Integration - Appwrite):** I form dovranno gestire errori reali provenienti dal server Appwrite (da mappare, se possibile, sui singoli campi o come errore globale del form). L'architettura del form deve prevedere un modo per iniettare errori "esterni" o "server-side".
- **Milestone 4 (Il primo CRUD) & Milestone 6/8:** Il componente JSON Form che andremo a creare ora dovrà essere altamente **riutilizzabile**. Verrà utilizzato per le impostazioni utente e altri CRUD passando semplicemente: `Schema`, `UI Schema` e `Data`. Non dobbiamo quindi "hardcodare" logica specifica di login nel componente form base.
- **Milestone 10 (Esternalizzazione):** Il componente form farà parte del layer condiviso.

---

## 2. Piano di Esecuzione (Task List)

### Task 1: Setup delle dipendenze JSON Forms
1. Installare i pacchetti necessari: `@jsonforms/core`, `@jsonforms/vue`, `@jsonforms/vue-vuetify` (o renderer custom) e `ajv`.
2. Creare un componente generico e riutilizzabile (es. `components/BrewJsonForm.vue`):
   - Deve accettare come `props`: `schema`, `uischema`, `data` (con two-way binding o emit di aggiornamento).
   - Deve gestire i renderer utilizzando `markRaw` per ottimizzare le performance.
   - Non deve contenere il tasto di submit al suo interno (come richiesto per la M4 "senza submit! non troppa carne al fuoco", il tasto di submit verrà gestito dal componente padre/view).

### Task 2: Definizione degli Schemi (Login e Register)
1. Creare i file di configurazione per il form di **Login**:
   - `login.schema.json`: Richiede `email` (formato email) e `password`.
   - `login.uischema.json`: Disposizione verticale dei campi.
2. Creare i file di configurazione per il form di **Register**:
   - `register.schema.json`: Richiede `email`, `password`, `conferma password` e `nome`.
   - `register.uischema.json`: Disposizione UX sensata (es. campi affiancati se necessario).

### Task 3: Refactoring delle View (Login & Register)
1. Sostituire il markup dei form attuali in `pages/login.vue` e `pages/register.vue` con il nuovo componente `BrewJsonForm.vue`.
2. Collegare il data binding del form allo state locale che verrà poi passato al layer di astrazione Auth Dummy (sviluppato in M1).
3. Aggiungere il tasto di Submit nella pagina (fuori dal `BrewJsonForm`), che valida i dati ed esegue l'azione.

### Task 4: Gestione Avanzata degli Errori
1. **Errori di campo (Client-side):** Assicurarsi che AJV stia validando correttamente i formati (es. email) e mostrando i messaggi di errore rossi sotto ai rispettivi campi Vuetify tramite i renderer.
2. **Errori generici di Form:** Predisporre un'area (es. un `v-alert` rosso) in prossimità del tasto Submit nelle pagine di Login e Register.
3. Creare un'interfaccia nel componente o nella View per accogliere "Errori esterni" (es. simulando un errore "Credenziali Errate" dal dummy auth) e visualizzarli a livello globale o mapparli sul campo. Questo preparerà il terreno per la Milestone 3 con Appwrite.

### Task 5: Aggiornamento Test E2E
1. Verificare ed eventualmente sistemare i test E2E esistenti sull'happy path, dato che i selettori CSS dei campi input potrebbero essere cambiati con JSON Forms.
2. Aggiungere nuovi test E2E (Negative Tests):
   - Tentativo di login/register con campi vuoti (verifica che appaiano gli errori di validazione sul campo).
   - Tentativo di inserimento di un'email non valida.
   - Tentativo di login con credenziali errate (se il mock le supporta) per verificare la comparsa dell'errore generico del form.

---

## 3. Criteri di Accettazione (Definition of Done)
- [ ] Le dipendenze per JSON Forms sono installate e configurate.
- [ ] Esiste un componente form riutilizzabile indipendente dal dominio (Login/Register).
- [ ] Le pagine di Login e Register utilizzano JSON Forms.
- [ ] La validazione lato client (campo specifico) funziona correttamente.
- [ ] È presente un sistema per mostrare un errore generico di form.
- [ ] Tutti i test E2E (happy path) passano con successo.
- [ ] Nuovi test E2E per i casi di errore passano con successo.
- [ ] L'implementazione mantiene la retrocompatibilità con l'interfaccia di Auth Dummy della Milestone 1.