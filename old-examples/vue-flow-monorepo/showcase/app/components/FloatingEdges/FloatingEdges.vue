<script
  lang="ts"
  setup
>
import { MarkerType, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background, BackgroundVariant } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

const { createElements } = useEdges();
const { addEdges, onConnect } = useVueFlow({
  modelValue: createElements(),
})

onConnect((params) => addEdges({ ...params, type: 'floating', markerEnd: MarkerType.Arrow }))
</script>

<template>
  <div class="floatingedges">
    <VueFlow fit-view-on-init>
      <Background
        :variant="BackgroundVariant.Lines"
        :gap="24"
      />

      <MiniMap />

      <Controls />

      <template #connection-line="props">
        <FloatingEdgesConnectionLine v-bind="props" />
      </template>

      <template #edge-floating="props">
        <FloatingEdgesEdge v-bind="props" />
      </template>
    </VueFlow>
  </div>
</template>

<style>
.floatingedges {
  flex-direction: column;
  display: flex;
  height: 100%;
}

.floatingedges .vue-flow__handle {
  opacity: 0;
}
</style>
