// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', 'nuxt-appwrite'],
  appwrite: {
    endpoint: 'https://cloud.appwrite.io/v1',
    project: 'nuxt-playground',
  }
})