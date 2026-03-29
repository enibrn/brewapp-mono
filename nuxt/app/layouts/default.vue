<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>

      <v-icon class="mr-2">mdi-square</v-icon>
      <v-icon class="mr-2">mdi-circle</v-icon>
      <v-icon class="mr-4">mdi-triangle</v-icon>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" size="small" variant="text">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleLogout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-system-bar>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item prepend-icon="mdi-home" title="Home" to="/" />
        <v-list-item prepend-icon="mdi-login" title="Login" to="/login" />
        <v-list-item prepend-icon="mdi-account-plus" title="Register" to="/register" />
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-darken-3">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const drawer = ref(null)
const router = useRouter()
const { logout } = useAuth()

async function handleLogout() {
  await logout()
  router.push('/login')
}
</script>
