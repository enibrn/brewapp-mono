<script
  setup
  lang="ts"
>
import { Handle, Position, useVueFlow } from '@vue-flow/core'

interface Props {
  id: string
  data: {
    value: number
  }
}

const props = defineProps<Props>()

const { updateNodeData } = useVueFlow()

const value = computed({
  get: () => props.data.value,
  set: (value: number) => updateNodeData(props.id, { value }),
})
</script>

<template>
  <input
    :id="`${id}-input`"
    v-model="value"
    type="number"
    class="nodrag"
  >

  <Handle
    type="source"
    :position="Position.Right"
    :connectable="false"
  />
</template>
