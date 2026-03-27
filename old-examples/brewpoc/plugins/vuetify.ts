import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
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
  app.vueApp.use(vuetify);
});