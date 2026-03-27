<script
  setup
  lang="ts"
>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { initialEdges, initialNodes } from '../../assets/math-initial-elements.js'

const nodes = ref(initialNodes)
const edges = ref(initialEdges)
</script>

<template>
  <div class="math-container">
    <VueFlow
      class="math-flow"
      :nodes="nodes"
      :edges="edges"
      fit-view-on-init
    >
      <template #node-value="props">
        <ValueNode
          :id="props.id"
          :data="props.data"
        />
      </template>

      <template #node-operator="props">
        <OperatorNode
          :id="props.id"
          :data="props.data"
        />
      </template>

      <template #node-result="props">
        <ResultNode :id="props.id" />
      </template>

      <Background />
    </VueFlow>
  </div>
</template>

<style>
@import '../../assets/math-style.css';

.math-container {
  height: 100vh;
  width: 100%;
}
</style>
