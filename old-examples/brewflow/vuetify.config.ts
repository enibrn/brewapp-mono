import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          success: '#4a7c59',    // Dark pastel green
          error: '#a05d56',      // Dark pastel red  
          warning: '#b8860b',    // Dark pastel yellow/orange
          info: '#667eea',       // Same as primary color
        }
      },
      light: {
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          success: '#4a7c59',    // Dark pastel green
          error: '#a05d56',      // Dark pastel red
          warning: '#b8860b',    // Dark pastel yellow/orange
          info: '#667eea',       // Same as primary color
        }
      }
    }
  },
})
