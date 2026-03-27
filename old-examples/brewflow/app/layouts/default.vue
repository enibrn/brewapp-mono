<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar
      class="gradient"
      dark
      prominent
      app
    > <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Brewflow App</v-toolbar-title>
      <v-spacer />
      <span class="mr-4 text-body-2">
        Hi, {{ user?.username }}
      </span>
      <v-btn
        icon
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sidebar -->    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          prepend-icon="mdi-home"
          title="Home"
          to="/"
        />
        
        <!-- Collapsible Example Section -->
        <v-list-group value="examples">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-flask"
              title="Examples"
            />
          </template>
          
          <v-list-item
            prepend-icon="mdi-table"
            title="CRUD"
            to="/example/crud"
          />
          <v-list-item
            prepend-icon="mdi-cog"
            title="Settings"
            to="/example/settings"
          />
        </v-list-group>
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

    <!-- Global Notifications -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
      location="top right"
    >
      {{ snackbarMessage }}
      <template #actions>
        <v-btn
          variant="text"
          @click="hideNotification"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script
  setup
  lang="ts"
>
const { user, logout } = useAuth();
const { showSnackbar, snackbarMessage, snackbarColor, snackbarTimeout, hideNotification } = useNotifications();
const drawer = ref(false)
</script>
