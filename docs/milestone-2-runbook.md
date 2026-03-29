 ### 1. Setup delle dipendenze JSON Forms e Componente Base (Task 1)                         
                                                                                             
 - Ho installato nel progetto Nuxt i pacchetti necessari: @jsonforms/core, @jsonforms/vue,   
 @jsonforms/vue-vuetify e ajv.                                                               
 - Ho creato un nuovo componente condiviso e riutilizzabile in                               
 nuxt/app/components/BrewJsonForm.vue. Questo componente accetta schema, uischema e usa      
 v-model per sincronizzare i dati. Impiega i extendedVuetifyRenderers avvolti in markRaw     
 come da indicazioni per le performance di Vue.                                              
                                                                                             
 ### 2. Definizione degli Schemi JSON Forms (Task 2)                                         
                                                                                             
 - Ho creato i file di schema e di UI schema in nuxt/app/schemas/:                           
     - login.schema.json e login.uischema.json per gestire le credenziali (Email, Password). 
     - register.schema.json e register.uischema.json per la registrazione (Nome, Email,      
 Password, Conferma Password).                                                               
                                                                                             
 ### 3. Refactoring View Login e Register (Task 3)                                           
                                                                                             
 - Ho convertito interamente nuxt/app/pages/login.vue e nuxt/app/pages/register.vue          
 rimpiazzando i v-text-field manuali con il nostro <BrewJsonForm>.                           
 - I bottoni di submit sono rimasti all'esterno del componente form, come richiesto, e       
 orchestrano le chiamate alla validazione prima di passare all'infrastruttura Dummy Auth     
 (useAuth).                                                                                  
                                                                                             
 ### 4. Gestione Avanzata degli Errori (Task 4)                                              
                                                                                             
 - Lato client: Se un utente lascia campi vuoti o immette email scorrette, i controlli di    
 Vuetify diventano rossi col relativo messaggio fornito da ajv in JSON Forms.                
 - Il form intercetta nativamente l'evento di errore di JSON Forms tramite la funzione       
 @error="handleFormError" e inibisce il submit finché non viene sanato.                      
 - Lato Globale: È stato mantenuto un avviso generale (v-alert) che mostra all'utente sia    
 l'invito a correggere i campi rossi sul client-side, sia eventuali messaggi restituiti dal  
 BaaS (es. Invalid credentials).                                                             
                                                                                             
 ### 5. Aggiornamento Test E2E (Task 5)                                                      
                                                                                             
 - I test in nuxt/e2e/auth.spec.ts sono stati aggiornati dato il cambiamento dei selettori   
 UI causato dai renderer di jsonforms-vue-vuetify (che usano strutture diverse dal semplice  
 Vuetify puro).                                                                              
 - Ho aggiunto i nuovi Negative Tests: login a vuoto, email non valida, registrazione vuota  
 e credenziali errate.                              