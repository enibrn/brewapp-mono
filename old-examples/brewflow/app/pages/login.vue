<template>
  <div>
    <v-form
      ref="form"
      @submit.prevent="handleLogin"
    >
      <v-text-field
        v-model="username"
        label="Nome utente"
        prepend-icon="mdi-account"
        :rules="[rules.required]"
        required
      />

      <v-text-field
        v-model="password"
        label="Password"
        prepend-icon="mdi-lock"
        type="password"
        :rules="[rules.required]"
        required
      />

      <v-alert
        v-if="errorMessage"
        type="error"
        class="mb-4"
      >
        {{ errorMessage }}
      </v-alert> <v-btn
        type="submit"
        color="secondary"
        block
        size="large"
        :loading="loading"
        class="mt-4"
      >
        Login
      </v-btn>
    </v-form>

    <v-divider class="my-4" />

    <v-btn
      color="primary"
      variant="outlined"
      block
      size="large"
      :loading="guestLoading"
      class="mb-4"
      @click="handleGuestLogin"
    >
      <v-icon left>mdi-account-question</v-icon>
      Continue as Guest
    </v-btn> <v-card-text class="text-center">
      <p class="text-caption">
        Use <strong>demo</strong> as username and password to login
      </p>
      <p class="text-caption text-grey">
        As a guest, you can use the app with temporary offline data
      </p>
    </v-card-text>
  </div>
</template>

<script
  setup
  lang="ts"
>
// Use guest layout for this page
definePageMeta({
  layout: 'guest'
})

const { login, loginAsGuest } = useAuth()

const username = ref('')
const password = ref('')
const loading = ref(false)
const guestLoading = ref(false)
const errorMessage = ref('')

const rules = {
  required: (value: string) => !!value || 'Required field'
}

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    const result = await login(username.value, password.value)
    if (!result.success) {
      errorMessage.value = result.error || 'Login error'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Login error'
  } finally {
    loading.value = false
  }
}

const handleGuestLogin = async () => {
  guestLoading.value = true
  try {
    await loginAsGuest()
  } catch (error) {
    console.error('Guest login error:', error)
    errorMessage.value = 'Guest login error'
  } finally {
    guestLoading.value = false
  }
}
</script>
