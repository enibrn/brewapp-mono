# Piano di Migrazione: BrewApp Mono

Questo documento delinea il piano per l'analisi e la migrazione dei vecchi progetti di esempio presenti nella cartella `old-examples`.

## Obiettivo

L'obiettivo principale è analizzare, catalogare ed estrarre il valore dai vecchi esempi (precedentemente sotto `Nuxt`) per consolidarli e riscriverli in una nuova e moderna applicazione all'interno di questo monorepo.

## Stack Tecnologico Target

La nuova applicazione farà uso del seguente stack aggiornato:

- **Framework:** Nuxt 4
- **UI Library:** Vuetify 4
- **Form Management:** JSON Forms
- **Diagrams & Workflows:** Vue Flow
- **BaaS (Backend as a Service):** Appwrite

## Fasi Operative

1. **Analisi:** Revisione dei vari progetti in `old-examples` per identificare funzionalità chiave, componenti riutilizzabili e logiche di business rilevanti.
2. **Catalogazione:** Creazione di un inventario delle feature utili da portare nel nuovo sistema.
3. **Setup del Progetto:** Inizializzazione della nuova app con il nuovo stack.
4. **Porting e Refactoring:** Riscrittura e adattamento dei vecchi componenti e logiche verso Nuxt 4 e le nuove librerie, integrando il backend direttamente su Appwrite.
