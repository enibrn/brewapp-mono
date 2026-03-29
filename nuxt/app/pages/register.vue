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
              <BrewJsonForm
                v-model="formData"
                :schema="schema"
                :uischema="uischema"
                @error="handleFormError"
              />
              
              <v-alert v-if="error" type="error" class="mt-3" data-testid="reg-error">{{ error }}</v-alert>

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
import BrewJsonForm from '~/components/BrewJsonForm.vue'
import schema from '~/schemas/register.schema.json'
import uischema from '~/schemas/register.uischema.json'

const { signup } = useAuth()
const router = useRouter()
const formData = ref({ name: '', email: '', password: '', confirmPassword: '' })
const error = ref('')
const formErrors = ref([])

function handleFormError(errors) {
  formErrors.value = errors || []
}

async function handleRegister() {
  console.log('formErrors.value:', formErrors.value)
  console.log('formData.value:', formData.value)
  error.value = ''
  if (formErrors.value.length > 0) {
    error.value = 'Please fix the errors before submitting.'
    return
  }

  if (!formData.value.name || !formData.value.email || !formData.value.password || !formData.value.confirmPassword) {
    error.value = 'All fields are required.'
    return
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match.'
    return
  }

  const result = await signup(formData.value.email, formData.value.password)
  if (result.error) {
    error.value = result.error
  } else {
    router.push('/')
  }
}
</script>
