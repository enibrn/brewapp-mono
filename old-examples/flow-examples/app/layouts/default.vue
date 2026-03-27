<script
  setup
  lang="ts"
>
import type { RouteRecordNormalized } from 'vue-router';

const drawer = ref(false);
const router = useRouter();

// Get all routes and filter out index.vue
const pageRoutes = computed(() => {
  return router
    .getRoutes()
    .filter(route => route.name !== 'index')
    .sort((a, b) => {
      const nameA = String(a.name);
      const nameB = String(b.name);
      return nameA.localeCompare(nameB);
    })
});

// Format route name to capitalized title
// Example: "add-random" becomes "Add Random"
const formatRouteTitle = (route: RouteRecordNormalized) => {
  const routeName = String(route.name);
  return routeName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :width="300"
    >
      <v-list>
        <v-list-item
          v-for="pageRoute in pageRoutes"
          :key="pageRoute.path"
          :to="pageRoute.path"
          :title="formatRouteTitle(pageRoute)"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title>Flow Examples</v-app-bar-title>

      <v-spacer />

      <v-btn
        icon
        to="/"
        title="Home"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';
@import '@vue-flow/node-resizer/dist/style.css';

html,
body,
#__nuxt {
  margin: 0;
  height: 100%;
}

#__nuxt {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}
</style>