<template>
  <div>
    <h1>Benvenuto in Base Red</h1>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@/components/LoginForm.vue';

export default defineComponent({
  components: {
    LoginForm
  }
});
</script>

<style scoped>
/* Aggiungi qui eventuali stili specifici per la pagina */
</style>