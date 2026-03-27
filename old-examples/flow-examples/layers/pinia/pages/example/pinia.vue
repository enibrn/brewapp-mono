<script
  lang="ts"
  setup
>
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core';
import { useVueFlowStore } from '../../stores/useVueFlowStore';
import PiniaIcon from '../../components/PiniaIcon.vue';

const store = useVueFlowStore();

const { onConnect, addEdges } = useVueFlow();

onConnect((params) => addEdges([params]));
</script>

<template>
  <VueFlow
    v-model:nodes="store.nodes"
    v-model:edges="store.edges"
    class="pinia-flow"
    fit-view-on-init
  >
    <Panel position="top-right">
      <div class="buttons-panel">
        <button @click="store.updatePositions">
          <PiniaIcon name="shuffle" />
        </button>
        <button @click="store.toggleClass">
          <PiniaIcon name="moon" />
        </button>
        <button @click="store.log">
          <PiniaIcon name="log" />
        </button>
        <button @click="store.reset">
          <PiniaIcon name="reset" />
        </button>
      </div>
    </Panel>
  </VueFlow>
</template>

<style>
@import '../../assets/pinia-style.css';
</style>
