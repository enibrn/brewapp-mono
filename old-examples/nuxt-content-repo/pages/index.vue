<script
  setup
  lang="ts"
>

const { data: posts } = await useAsyncData('docs', () => queryCollection('docs').all());

</script>

<template>
  <div>
    <h1>Documentation</h1>
    <div>
      <details
        v-for="post in posts"
        :key="post.id"
      >
        <summary>{{ post.title || ('Post ' + post.id) }}</summary>
        <pre>{{ JSON.stringify(post, null, 2) }}</pre>
      </details>
    </div>
  </div>
</template>
