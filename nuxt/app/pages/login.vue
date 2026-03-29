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
              <BrewJsonForm
                v-model="formData"
                :schema="schema"
                :uischema="uischema"
                @error="handleFormError"
              />
              
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
import BrewJsonForm from '~/components/BrewJsonForm.vue'
import schema from '~/schemas/login.schema.json'
import uischema from '~/schemas/login.uischema.json'

const { login } = useAuth()
const router = useRouter()
const formData = ref({ email: 'test@example.com', password: 'password' })
const error = ref('')
const formErrors = ref([])

function handleFormError(errors) {
  formErrors.value = errors || []
}

async function handleLogin() {
  console.log('formErrors.value:', JSON.stringify(formErrors.value))
  console.log('formData.value:', JSON.stringify(formData.value))
  error.value = ''
  if (formErrors.value.length > 0) {
    error.value = 'Please fix the errors before submitting.'
    return
  }
  
  if (!formData.value.email || !formData.value.password) {
    error.value = 'Email and password are required.'
    return
  }
  
  const result = await login(formData.value.email, formData.value.password)
  if (result.error) {
    error.value = result.error
  } else {
    router.push('/')
  }
}
</script>
