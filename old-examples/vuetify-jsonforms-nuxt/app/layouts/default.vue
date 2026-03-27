<script setup lang="ts">
const drawer = ref(false)

const navigationItems = [
  {
    title: 'Home',
    icon: 'mdi-home',
    to: '/'
  },
  {
    title: 'Simple Form',
    icon: 'mdi-form-select',
    to: '/simple'
  },
  {
    title: 'Advanced Form',
    icon: 'mdi-cog',
    to: '/advanced'
  }
]
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar
      color="primary"
      dark
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>JSONForms + Vuetify + Nuxt</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon="mdi-theme-light-dark"
        @click="$vuetify.theme.global.name = $vuetify.theme.global.current.dark ? 'light' : 'dark'"
      />
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
    
    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

