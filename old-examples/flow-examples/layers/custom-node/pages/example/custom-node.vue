<script
  setup
  lang="ts"
>
import { ref, toRef } from 'vue'
import { MiniMap } from '@vue-flow/minimap'
import { Position, VueFlow, type Node } from '@vue-flow/core'
import { presets } from '../../assets/custom-node-presets.js'

const nodes = ref([
  {
    id: '1',
    type: 'color-selector',
    data: { color: presets.ayame, isGradient: false },
    position: { x: 0, y: 50 }
  },
  {
    id: '2',
    type: 'output',
    position: { x: 350, y: 114 },
    targetPosition: Position.Left
  }
])

const edges = ref([
  {
    id: 'e1a-2',
    source: '1',
    sourceHandle: 'a',
    target: '2',
    animated: true,
    style: {
      stroke: presets.ayame
    }
  }
])

const colorSelectorData = toRef(() => nodes.value[0]?.data)

// minimap stroke color functions
function nodeStroke(n: Node) {
  switch (n.type) {
    case 'input':
      return '#0041d0'
    case 'color-selector':
      return n.data.color
    case 'output':
      return '#ff0072'
    default:
      return '#eee'
  }
}

function nodeColor(n: Node) {
  if (n.type === 'color-selector') {
    return n.data.color
  }

  return '#fff'
}

definePageMeta({
  title: 'Custom Node Example',
  description: 'Vue Flow custom node example'
})
</script>

<template>
  <VueFlow
    v-model:nodes="nodes"
    :edges="edges"
    class="custom-node-flow"
    :class="[colorSelectorData?.isGradient ? 'animated-bg-gradient' : '']"
    :style="{ backgroundColor: colorSelectorData?.color }"
    fit-view-on-init
  >
    <template #node-color-selector="props">
      <ColorSelectorNode
        :id="props.id"
        :data="props.data"
      />
    </template>

    <template #node-output>
      <OutputNode />
    </template>

    <MiniMap
      :node-stroke-color="nodeStroke"
      :node-color="nodeColor"
    />
  </VueFlow>
</template>

<style>
@import '../../assets/custom-node-style.css';
</style>
