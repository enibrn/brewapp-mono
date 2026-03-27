<script lang="ts" setup>
// Metadata
useHead({
  title: 'JSONForms + Vuetify + Nuxt',
  meta: [
    { name: 'description', content: 'Un\'implementazione completa di JSONForms con Vuetify in ambiente Nuxt 3' }
  ]
})
</script>

<template>
  <div class="fill-height d-flex flex-column">
    <!-- Hero Section -->
    <v-row class="fill-height align-center justify-center">
      <v-col cols="12" md="8" lg="6" class="text-center">
        <v-card
          elevation="8"
          class="pa-8 ma-4"
          rounded="xl"
        >
          <v-card-text>
            <v-avatar
              size="80"
              color="primary"
              class="mb-6"
            >
              <v-icon size="40" color="white">mdi-form-textbox</v-icon>
            </v-avatar>
            
            <h1 class="text-h3 font-weight-bold mb-4 text-primary">
              JSONForms + Vuetify + Nuxt
            </h1>
            
            <p class="text-h6 text-medium-emphasis mb-6">
              Un'implementazione completa di JSONForms con Vuetify in ambiente Nuxt 3
            </p>
            
            <p class="text-body-1 mb-6">
              Esplora come creare form dinamici e interattivi utilizzando JSONForms, 
              con un'interfaccia moderna e responsive grazie a Vuetify.
            </p>

            <v-divider class="my-6" />

            <v-row class="justify-center">
              <v-col cols="12" sm="6" md="5">
                <v-card
                  variant="outlined"
                  class="pa-4 h-100"
                  hover
                >
                  <v-card-title class="text-center">
                    <v-icon color="primary" class="mb-2">mdi-form-select</v-icon>
                    <div class="text-h6">Simple Form</div>
                  </v-card-title>
                  <v-card-text class="text-center">
                    <p class="text-body-2">
                      Un esempio base con campi essenziali per iniziare
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
              
              <v-col cols="12" sm="6" md="5">
                <v-card
                  variant="outlined"
                  class="pa-4 h-100"
                  hover
                >
                  <v-card-title class="text-center">
                    <v-icon color="secondary" class="mb-2">mdi-cog</v-icon>
                    <div class="text-h6">Advanced Form</div>
                  </v-card-title>
                  <v-card-text class="text-center">
                    <p class="text-body-2">
                      Funzionalità avanzate con validazioni e campi complessi
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-alert
              type="info"
              variant="tonal"
              class="mt-6"
              rounded="lg"
            >
              <v-icon>mdi-information</v-icon>
              <strong>Suggerimento:</strong> Usa la sidebar per navigare tra gli esempi
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Features Section -->
    <v-row class="mt-8">
      <v-col cols="12">
        <v-card
          variant="outlined"
          class="pa-6"
          rounded="xl"
        >
          <v-card-title class="text-center mb-6">
            <v-icon class="me-2">mdi-star</v-icon>
            Caratteristiche Principali
          </v-card-title>
          
          <v-row>
            <v-col
              v-for="feature in features"
              :key="feature.title"
              cols="12"
              sm="6"
              md="3"
            >
              <div class="text-center">
                <v-avatar
                  :color="feature.color"
                  size="48"
                  class="mb-3"
                >
                  <v-icon color="white">{{ feature.icon }}</v-icon>
                </v-avatar>
                <h3 class="text-h6 mb-2">{{ feature.title }}</h3>
                <p class="text-body-2">{{ feature.description }}</p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      features: [
        {
          title: 'JSONForms',
          icon: 'mdi-form-textbox',
          color: 'primary',
          description: 'Generazione automatica di form da schemi JSON'
        },
        {
          title: 'Vuetify',
          icon: 'mdi-vuetify',
          color: 'blue',
          description: 'UI moderna e responsive con Material Design'
        },
        {
          title: 'Nuxt 3',
          icon: 'mdi-nuxt',
          color: 'green',
          description: 'Framework Vue.js full-stack con SSR/SSG'
        },
        {
          title: 'TypeScript',
          icon: 'mdi-language-typescript',
          color: 'blue-darken-1',
          description: 'Tipizzazione statica per codice più robusto'
        }
      ]
    }
  }
}
</script>

<style scoped>
.v-card:hover {
  transition: transform 0.2s ease-in-out;
  transform: translateY(-2px);
}
</style>
