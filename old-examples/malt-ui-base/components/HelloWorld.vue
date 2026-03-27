<script setup lang="ts">
const { baseLayer } = useAppConfig()
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <pre>{{ baseLayer.name }}</pre>
  </div>
</template>