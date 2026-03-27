<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { users } from '../users';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  const user = users.find(u => u.username === username.value && u.password === password.value);
  if (user) {
    localStorage.setItem('authenticated', 'true');
    router.push('/');
  } else {
    alert('Invalid username or password');
  }
};
</script>

<style scoped>
/* Aggiungi il tuo stile qui */
</style>