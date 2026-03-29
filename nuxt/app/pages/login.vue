<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                data-testid="email-input"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                data-testid="password-input"
              ></v-text-field>
              
              <v-alert v-if="error" type="error" class="mt-3" data-testid="login-error">{{ error }}</v-alert>

              <v-card-actions class="mt-4">
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" data-testid="login-btn">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { login } = useAuth()
const router = useRouter()
const email = ref('test@example.com')
const password = ref('password')
const error = ref('')

async function handleLogin() {
  error.value = ''
  const result = await login(email.value, password.value)
  if (result.error) {
    error.value = result.error
  } else {
    router.push('/')
  }
}
</script>
