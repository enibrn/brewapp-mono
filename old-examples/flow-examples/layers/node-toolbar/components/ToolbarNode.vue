<script
  setup
  lang="ts"
>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

const props = defineProps<{
  id: string
  data: {
    label: string
    toolbarPosition: Position
    toolbarVisible?: boolean
    action?: string
  }
}>()

const actions = ['👎', '✋', '👍']

const { updateNodeData } = useVueFlow()
</script>

<template>
  <NodeToolbar
    :is-visible="data.toolbarVisible"
    :position="data.toolbarPosition"
  >
    <button
      v-for="action of actions"
      :key="action"
      type="button"
      :class="{ selected: action === data.action }"
      @click="updateNodeData(props.id, { action })"
    >
      {{ action }}
    </button>
  </NodeToolbar>

  <div>
    {{ data.label }}
  </div>

  <Handle
    type="target"
    :position="Position.Left"
  />
  <Handle
    type="source"
    :position="Position.Right"
  />
</template>