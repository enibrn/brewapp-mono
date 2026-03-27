<script
  setup
  lang="ts"
>
import { BaseEdge, getBezierPath, type Position } from '@vue-flow/core'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  sourceX: {
    type: Number,
    required: true
  },
  sourceY: {
    type: Number,
    required: true
  },
  targetX: {
    type: Number,
    required: true
  },
  targetY: {
    type: Number,
    required: true
  },
  sourcePosition: {
    type: String as () => Position,
    required: true
  },
  targetPosition: {
    type: String as () => Position,
    required: true
  },
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  markerEnd: {
    type: String,
    required: false,
    default: ''
  },
  style: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

const path = computed(() => getBezierPath(props))
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <BaseEdge
    :id="id"
    :style="style"
    :path="path[0]"
    :marker-end="markerEnd"
    :label="data.text"
    :label-x="path[1]"
    :label-y="path[2]"
    :label-style="{ fill: 'white' }"
    :label-show-bg="true"
    :label-bg-style="{ fill: 'red' }"
    :label-bg-padding="[2, 4]"
    :label-bg-border-radius="2"
  />
</template>
