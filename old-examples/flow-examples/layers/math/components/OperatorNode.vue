<script
  setup
  lang="ts"
>
import { Handle, Position, useVueFlow } from '@vue-flow/core'

interface Props {
  id: string
  data: {
    operator: string
  }
}

const props = defineProps<Props>()

const operators = ['+', '-', '*', '/']

const { updateNodeData } = useVueFlow()
</script>

<template>
  <div class="buttons nodrag">
    <button
      v-for="operator of operators"
      :key="`${id}-${operator}-operator`"
      :class="{ selected: data.operator === operator }"
      @click="updateNodeData(props.id, { operator })"
    >
      <MathIcon :name="operator" />
    </button>
  </div>

  <Handle
    type="source"
    :position="Position.Right"
    :connectable="false"
  />
  <Handle
    id="target-a"
    type="target"
    :position="Position.Left"
    :connectable="false"
  />
  <Handle
    id="target-b"
    type="target"
    :position="Position.Left"
    :connectable="false"
  />
</template>
