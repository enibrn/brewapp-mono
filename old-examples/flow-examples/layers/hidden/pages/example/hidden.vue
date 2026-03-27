<script
  setup
  lang="ts"
>
import { Background } from '@vue-flow/background'
import { Panel, VueFlow } from '@vue-flow/core'
import { hiddenInitialNodes, hiddenInitialEdges } from '../../assets/hidden-initial-elements.js'

const { nodes, edges, isHidden, toggleHidden } = useHiddenToggle(hiddenInitialNodes, hiddenInitialEdges)

definePageMeta({
  title: 'Hidden Example',
  description: 'Vue Flow example demonstrating how to hide/show nodes and edges'
})
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    fit-view-on-init
  >
    <Background />

    <Panel position="top-right">
      <HiddenToggleButton
        :is-hidden="isHidden"
        @toggle="toggleHidden"
      />
    </Panel>
  </VueFlow>
</template>

<style>
@import '../../assets/hidden-style.css';
</style>
