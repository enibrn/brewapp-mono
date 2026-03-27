<template>
  <div class="login-form" style="background-color: #ffcc00; padding: 20px; border-radius: 8px;">
    <h2 style="color: #ff5733;">Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username" style="color: #333;">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password" style="color: #333;">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" style="background-color: #ff5733; color: white; border: none; padding: 10px 15px; border-radius: 5px;">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UseAuth } from '../composables/UseAuth';

export default defineComponent({
  setup() {
    const { login } = UseAuth();
    const username = ref('');
    const password = ref('');

    const handleLogin = () => {
      login(username.value, password.value);
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
}
</style>