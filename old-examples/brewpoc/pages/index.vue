<template>
  <HelloWorldVuetify />
</template>

<script setup>
definePageMeta({
  middleware: ['auth'],
});
</script>