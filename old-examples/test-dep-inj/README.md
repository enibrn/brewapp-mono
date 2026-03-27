# Nuxt 3 Dependency Injection Test

Questo progetto è stato creato per testare l'implementazione della dependency injection in un'applicazione Nuxt 3. Utilizza plugin per iniettare operazioni matematiche che possono essere utilizzate nei componenti Vue.

## Struttura del Progetto

- **plugins/operation.ts**: Inietta un'operazione matematica basata sulla configurazione runtime.
- **plugins/antiOp.ts**: Inietta un'operazione inversa basata sulla configurazione runtime.
- **components/operation-calculator.vue**: Componente per eseguire calcoli con l'operazione iniettata.
- **components/antiOp-calculator.vue**: Componente per eseguire calcoli con l'operazione inversa iniettata.
- **pages/index.vue**: Pagina principale che utilizza i componenti di calcolo.

## Configurazione

La configurazione delle operazioni viene gestita tramite il file `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  // ...existing code...
  runtimeConfig: {
    public: {
      operation: 'add', // Tipo di operazione (es. 'add', 'mul')
      antiOp: 'mul', // Tipo di operazione inversa (es. 'add', 'mul')
    },
  },
  plugins: ['~/plugins/operation.ts', '~/plugins/antiOp.ts'],
})
```

## Come Eseguire

1. Clona il repository.
2. Installa le dipendenze con `npm install`.
3. Avvia il server di sviluppo con `npm run dev`.

## Scopo

L'obiettivo di questo progetto è dimostrare come utilizzare la dependency injection in Nuxt 3 per gestire operazioni matematiche in modo modulare e configurabile.
