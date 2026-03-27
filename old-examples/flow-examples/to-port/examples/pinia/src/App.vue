<script lang="ts" setup>
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core';
import useStore from './store';
import Icon from './Icon.vue';

const store = useStore();

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
          <Icon name="shuffle" />
        </button>
        <button @click="store.toggleClass">
          <Icon name="moon" />
        </button>
        <button @click="store.log">
          <Icon name="log" />
        </button>
        <button @click="store.reset">
          <Icon name="reset" />
        </button>
      </div>
    </Panel>
  </VueFlow>
</template>
