<template>
  <v-row>
    <!-- Sales Chart -->
    <v-col
      cols="12"
      md="8"
    >
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-chart-line</v-icon>
          Sales Overview
        </v-card-title>
        <v-card-text>
          <div class="chart-container">
            <canvas
              ref="salesChart"
              width="400"
              height="200"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Task Distribution -->
    <v-col
      cols="12"
      md="4"
    >
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-chart-donut</v-icon>
          Task Distribution
        </v-card-title>
        <v-card-text>
          <div class="chart-container">
            <canvas
              ref="donutChart"
              width="200"
              height="200"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Recent Activity -->
    <v-col
      cols="12"
      md="6"
    >
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-clock-outline</v-icon>
          Recent Activity
        </v-card-title>
        <v-card-text>
          <v-list density="compact">
            <v-list-item
              v-for="activity in recentActivities"
              :key="activity.id"
              :prepend-icon="activity.icon"
              :title="activity.title"
              :subtitle="activity.time"
            >
              <template #append>
                <v-chip
                  :color="activity.status.color"
                  size="small"
                  variant="tonal"
                >
                  {{ activity.status.text }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Quick Actions -->
    <v-col
      cols="12"
      md="6"
    >
      <v-card>
        <v-card-title>
          <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
          Quick Actions
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="action in quickActions"
              :key="action.title"
              cols="6"
            >
              <v-btn
                :color="action.color"
                :prepend-icon="action.icon"
                variant="tonal"
                block
                class="mb-2"
                @click="handleQuickAction(action.action)"
              >
                {{ action.title }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script
  setup
  lang="ts"
>
import { useTheme } from 'vuetify'

interface Activity {
  id: number
  title: string
  time: string
  icon: string
  status: {
    text: string
    color: string
  }
}

interface QuickAction {
  title: string
  icon: string
  color: string
  action: string
}

const theme = useTheme()

// Mock data
const recentActivities: Activity[] = [
  {
    id: 1,
    title: 'New project created',
    time: '2 hours ago',
    icon: 'mdi-plus-circle',
    status: { text: 'New', color: 'success' }
  },
  {
    id: 2,
    title: 'Task completed by John',
    time: '4 hours ago',
    icon: 'mdi-check-circle',
    status: { text: 'Completed', color: 'primary' }
  },
  {
    id: 3,
    title: 'Meeting scheduled',
    time: '6 hours ago',
    icon: 'mdi-calendar',
    status: { text: 'Scheduled', color: 'warning' }
  },
  {
    id: 4,
    title: 'Report generated',
    time: '1 day ago',
    icon: 'mdi-file-document',
    status: { text: 'Generated', color: 'info' }
  }
]

const quickActions: QuickAction[] = [
  {
    title: 'New Project',
    icon: 'mdi-plus',
    color: 'primary',
    action: 'create-project'
  },
  {
    title: 'Add Task',
    icon: 'mdi-checkbox-marked',
    color: 'success',
    action: 'add-task'
  },
  {
    title: 'Schedule Meeting',
    icon: 'mdi-calendar-plus',
    color: 'warning',
    action: 'schedule-meeting'
  },
  {
    title: 'Generate Report',
    icon: 'mdi-file-chart',
    color: 'info',
    action: 'generate-report'
  }
]

const salesChart = ref<HTMLCanvasElement>()
const donutChart = ref<HTMLCanvasElement>()

const handleQuickAction = (action: string) => {
  console.log(`Quick action: ${action}`)
  // Here you would handle the actual action
}

onMounted(() => {
  drawSalesChart()
  drawDonutChart()
})

const drawSalesChart = () => {
  if (!salesChart.value) return

  const ctx = salesChart.value.getContext('2d')
  if (!ctx) return

  // Get primary color from Vuetify theme
  const primaryColor = theme.current.value.colors.primary

  // Simple mock chart drawing
  ctx.clearRect(0, 0, 400, 200)
  ctx.strokeStyle = primaryColor
  ctx.lineWidth = 3
  ctx.beginPath()

  const points = [
    [0, 150], [50, 120], [100, 80], [150, 90],
    [200, 60], [250, 40], [300, 70], [350, 30], [400, 50]
  ]

  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point[0], point[1])
    } else {
      ctx.lineTo(point[0], point[1])
    }
  })

  ctx.stroke()

  // Add gradient fill
  ctx.globalAlpha = 0.3
  ctx.fillStyle = primaryColor
  ctx.lineTo(400, 200)
  ctx.lineTo(0, 200)
  ctx.fill()
}

const drawDonutChart = () => {
  if (!donutChart.value) return

  const ctx = donutChart.value.getContext('2d')
  if (!ctx) return

  const centerX = 100
  const centerY = 100
  const outerRadius = 80
  const innerRadius = 50

  // Clear canvas
  ctx.clearRect(0, 0, 200, 200)

  // Get colors from Vuetify theme
  const primaryColor = theme.current.value.colors.primary
  const secondaryColor = theme.current.value.colors.secondary
  
  const data = [
    { value: 30, color: primaryColor },
    { value: 25, color: secondaryColor },
    { value: 20, color: '#f093fb' },
    { value: 25, color: '#4facfe' }
  ]

  let currentAngle = -Math.PI / 2

  data.forEach(segment => {
    const sliceAngle = (segment.value / 100) * 2 * Math.PI

    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle)
    ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true)
    ctx.closePath()
    ctx.fillStyle = segment.color
    ctx.fill()

    currentAngle += sliceAngle
  })
}
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

canvas {
  max-width: 100%;
  height: auto;
}
</style>