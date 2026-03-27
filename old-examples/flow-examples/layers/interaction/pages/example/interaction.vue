<script
  setup
  lang="ts"
>
import { VueFlow } from '@vue-flow/core'
import { interactionInitialNodes, interactionInitialEdges } from '../../assets/interaction-initial-elements.js'

const nodes = ref(interactionInitialNodes)
const edges = ref(interactionInitialEdges)

definePageMeta({
  title: 'Interaction Example',
  description: 'Vue Flow example demonstrating various interaction controls and event handling'
})
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    class="interaction-flow"
    fit-view-on-init
  >
    <InteractionControls />
  </VueFlow>
</template>

<style>
@import '../../assets/interaction-style.css';
</style>
