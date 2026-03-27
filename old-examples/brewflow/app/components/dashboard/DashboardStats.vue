<template>
  <v-row>
    <v-col
      v-for="stat in stats"
      :key="stat.title"
      cols="12"
      sm="6"
      md="3"
    >
      <v-card
        class="pa-4 text-center"
        :color="stat.color"
        variant="tonal"
      >
        <v-icon
          :icon="stat.icon"
          size="48"
          :color="stat.color"
          class="mb-2"
        />
        <div class="text-h4 font-weight-bold mb-1">
          {{ stat.value }}
        </div>
        <div class="text-subtitle-1 text-medium-emphasis">
          {{ stat.title }}
        </div>
        <div
          class="text-caption mt-2"
          :class="stat.trend.color"
        >
          <v-icon
            :icon="stat.trend.icon"
            size="small"
            class="mr-1"
          />
          {{ stat.trend.text }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script
  setup
  lang="ts"
>
interface StatItem {
  title: string
  value: string | number
  icon: string
  color: string
  trend: {
    text: string
    icon: string
    color: string
  }
}

interface Props {
  stats: StatItem[]
}

const _props = defineProps<Props>()
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>