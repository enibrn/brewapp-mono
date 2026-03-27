<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="attemptLogin">
              <v-text-field
                v-model="data.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="data.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                class="me-4"
              >Login</v-btn>
              <v-btn
                color="secondary"
                @click="navigateTo('/signup')"
              >New? Sign Up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script
  lang="ts"
  setup
>
import { type UserLogin } from '@/types/userTypes';
import { ErrorUtils } from '@/utils/errors';

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
});
useHead({
  title: 'Log In',
});

const account = useMyAccountStore();
const sessionStore = useMySessionStore();
const { subscribe } = useGuestWatcher();
subscribe();

const data = ref({
  email: '',
  password: ''
} as UserLogin);

async function attemptLogin() {
  try {
    await sessionStore.createByEmailPassword(
      data.value.email, data.value.password);
    await account.init();
  } catch (err) {
    ErrorUtils.alertError(err);
  }
}

</script>
