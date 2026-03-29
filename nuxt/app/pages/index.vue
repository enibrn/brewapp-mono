<template>
  <v-row>
    <template v-for="n in 4" :key="n">
      <v-col
        class="mt-2"
        cols="12"
      >
        <strong>Category {{ n }}</strong>
      </v-col>

      <v-col
        v-for="j in 6"
        :key="`${n}${j}`"
        cols="6"
        md="2"
      >
        <v-sheet height="150" color="grey-darken-2" class="d-flex align-center justify-center">
          Item {{ j }}
        </v-sheet>
      </v-col>
    </template>
  </v-row>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const { isAuthenticated, init } = useAuth()
const router = useRouter()

onMounted(async () => {
  await init()
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})
</script>
