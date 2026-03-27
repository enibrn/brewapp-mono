<template>
  <v-row>
    <v-col cols="12">
      <v-card
        class="pa-6"
        variant="flat"
      >
        <div class="d-flex align-center">
          <div class="flex-grow-1">
            <h1 class="text-h3 text-white mb-2">
              Welcome back, {{ user?.username }}!
            </h1>
            <p class="text-h6 text-white opacity-90 mb-0">
              {{ currentDate }}
            </p>
          </div>
          <div class="text-right">
            <v-icon
              icon="mdi-view-dashboard"
              size="64"
              color="white"
              class="opacity-50"
            />
          </div>
        </div>

        <v-row class="mt-4">
          <v-col
            cols="12"
            sm="4"
          >
            <div class="text-center">
              <div class="text-h4 text-white">{{ stats.totalProjects }}</div>
              <div class="text-body-2 text-white opacity-75">Active Projects</div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <div class="text-center">
              <div class="text-h4 text-white">{{ stats.completedTasks }}</div>
              <div class="text-body-2 text-white opacity-75">Completed Tasks</div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <div class="text-center">
              <div class="text-h4 text-white">{{ stats.pendingTasks }}</div>
              <div class="text-body-2 text-white opacity-75">Pending Tasks</div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script
  setup
  lang="ts"
>
interface Props {
  user?: { username: string } | null
  stats: {
    totalProjects: number
    completedTasks: number
    pendingTasks: number
  }
}

const _props = defineProps<Props>()

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>