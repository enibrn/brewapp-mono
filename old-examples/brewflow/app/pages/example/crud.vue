<template>
  <CrudDataTable />
</template>

<script
  setup
  lang="ts"
>
// Apply authentication middleware
definePageMeta({
  middleware: 'auth'
})
</script>
