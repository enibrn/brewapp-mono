<template>
  <div v-if="isAuthenticated">
    <h1 style="color: white;">Benvenuto utente!</h1>
  </div>
  <div v-else>
    <p>Non sei autenticato. <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { definePageMeta } from 'nuxt/app';

definePageMeta({
  middleware: 'auth'
});

const isAuthenticated = ref(false);

onMounted(() => {
  isAuthenticated.value = localStorage.getItem('authenticated') === 'true';
});
</script>

<style scoped>
/* Aggiungi il tuo stile qui */
</style>