<script
  setup
  lang="ts"
>
import { VueFlow, useVueFlow } from '@vue-flow/core';

const { onConnect, addEdges } = useVueFlow();

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragDrop();

const nodes = ref([]);

onConnect(addEdges);

// Add page metadata
definePageMeta({
  title: 'Drag and Drop',
  description: 'Vue Flow drag and drop example'
});
</script>

<template>
  <div
    class="dnd-flow"
    @drop="onDrop"
  >
    <VueFlow
      :nodes="nodes"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
    </VueFlow>

    <NodesSidebar />
  </div>
</template>

<style>
@import '../../assets/dnd-style.css';
</style>
