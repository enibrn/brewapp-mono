<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                data-testid="reg-email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                data-testid="reg-password"
              ></v-text-field>
              
              <v-card-actions class="mt-4">
                <v-spacer></v-spacer>
                <v-btn color="secondary" type="submit" data-testid="reg-btn">Register</v-btn>
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

const { signup } = useAuth()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

async function handleRegister() {
  error.value = ''
  const result = await signup(email.value, password.value)
  if (result.error) {
    error.value = result.error
  } else {
    router.push('/')
  }
}
</script>
