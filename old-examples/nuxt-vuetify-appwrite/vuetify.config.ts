import { md3 } from 'vuetify/blueprints';
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';

export default defineVuetifyConfiguration({
  defaults: {
    VBtn: { color: 'blue' },
  },
  blueprint: md3,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
      },
    },
  }
});