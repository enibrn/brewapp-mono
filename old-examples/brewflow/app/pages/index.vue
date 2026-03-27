<template>
  <div>
    <!-- Dashboard Header -->
    <DashboardHeader
      :user="user"
      :stats="headerStats"
    />

    <!-- Dashboard Stats -->
    <div class="mt-6">
      <DashboardStats :stats="dashboardStats" />
    </div>

    <!-- Dashboard Charts and Activity -->
    <div class="mt-6">
      <DashboardChart />
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
// Apply authentication middleware
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

// Header stats data
const headerStats = {
  totalProjects: 12,
  completedTasks: 85,
  pendingTasks: 23
}

// Dashboard stats data
const dashboardStats = [
  {
    title: 'Total Revenue',
    value: '$45,290',
    icon: 'mdi-currency-usd',
    color: 'success',
    trend: {
      text: '+12.5% from last month',
      icon: 'mdi-trending-up',
      color: 'text-success'
    }
  },
  {
    title: 'New Customers',
    value: '1,429',
    icon: 'mdi-account-plus',
    color: 'primary',
    trend: {
      text: '+8.2% from last week',
      icon: 'mdi-trending-up',
      color: 'text-success'
    }
  },
  {
    title: 'Orders',
    value: '892',
    icon: 'mdi-shopping',
    color: 'warning',
    trend: {
      text: '-2.1% from yesterday',
      icon: 'mdi-trending-down',
      color: 'text-error'
    }
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    icon: 'mdi-chart-line-variant',
    color: 'info',
    trend: {
      text: '+0.5% from last month',
      icon: 'mdi-trending-up',
      color: 'text-success'
    }
  }
]
</script>
