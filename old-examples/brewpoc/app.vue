<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script
  setup
  lang="ts"
>
const sessionStore = useMySessionStore();
const accountStore = useMyAccountStore();

const sessionInitAsyncData = useAsyncData('session-init', () => sessionStore.init(), {
  immediate: false,
});
const accountInitAsyncData = useAsyncData('account-init', () => accountStore.init(), {
  immediate: false,
});

function initSessionAndAccount() {
  sessionInitAsyncData.execute();
  accountInitAsyncData.execute();
}

onMounted(initSessionAndAccount);
</script>