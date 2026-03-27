<script
  setup
  lang="ts"
>
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 }
  }
])

definePageMeta({
  title: 'Connection Line Example',
  description: 'Vue Flow custom connection line example'
})
</script>

<template>
  <VueFlow :nodes="nodes">
    <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
      <CustomConnectionLine
        :source-x="sourceX"
        :source-y="sourceY"
        :target-x="targetX"
        :target-y="targetY"
      />
    </template>
  </VueFlow>
</template>
