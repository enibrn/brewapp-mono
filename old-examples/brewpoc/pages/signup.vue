<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="attemptSignup">
              <v-text-field
                v-model="data.username"
                label="Username"
                required
              ></v-text-field>
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
              >Sign Up</v-btn><v-btn
                color="secondary"
                @click="navigateTo('/login')"
              >Back to Login</v-btn>
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
import { type UserSignup } from '@/types/userTypes';
import { ErrorUtils } from '@/utils/errors';

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
});
useHead({
  title: 'Sign Up',
});

const account = useMyAccountStore();
const { subscribe } = useGuestWatcher();
subscribe();

const data = ref({
  username: '',
  email: '',
  password: ''
} as UserSignup);

async function attemptSignup() {
  try {
    await account.createByEmailPassword(
      data.value.email,
      data.value.password,
      data.value.username,
    );
    navigateTo('/login');
  } catch (err) {
    ErrorUtils.alertError(err);
  }
}

</script>