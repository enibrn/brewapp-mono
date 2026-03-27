<script
  setup
  lang="ts"
>
import { Position, VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    type: 'menu',
    data: { label: 'toolbar top', toolbarPosition: Position.Top },
    position: { x: 200, y: 0 },
  },
  {
    id: '2',
    type: 'menu',
    data: { label: 'toolbar right', toolbarPosition: Position.Right },
    position: { x: -50, y: 100 },
  },
  {
    id: '3',
    type: 'menu',
    data: { label: 'toolbar bottom', toolbarPosition: Position.Bottom },
    position: { x: 0, y: 200 },
  },
  {
    id: '4',
    type: 'menu',
    data: { label: 'toolbar left', toolbarPosition: Position.Left },
    position: { x: 200, y: 300 },
  },
  {
    id: '5',
    type: 'menu',
    data: { label: 'toolbar always open', toolbarPosition: Position.Top, toolbarVisible: true },
    position: { x: 0, y: -100 },
  },
])
</script>

<template>
  <VueFlow
    :nodes="nodes"
    fit-view-on-init
  >
    <template #node-menu="props">
      <ToolbarNode
        :id="props.id"
        :data="props.data"
      />
    </template>
  </VueFlow>
</template>

<style>
@import '../../assets/node-toolbar-style.css';
</style>
