<template>
  <v-app>
    <v-main>
      <!-- Hero Section for Login/Register -->
      <v-container
        fluid
        class="fill-height gradient"
      >
        <v-row
          justify="center"
          align="center"
          class="fill-height"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
          >
            <v-card class="elevation-8">
              <v-card-title class="text-center pa-6">
                <h1 class="text-h4">Brewflow</h1>
                <p class="text-subtitle-1 mt-2">Welcome to your app</p>
              </v-card-title>
              <v-card-text class="pa-6">
                <slot />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script
  setup
  lang="ts"
>
// Layout for non-authenticated pages (login, register, etc.)
</script>

<style scoped>
.fill-height {
  height: 100vh;
  overflow: hidden;
}
</style>
