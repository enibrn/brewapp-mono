<script
  setup
  lang="ts"
>
import { BaseEdge, getBezierPath, useVueFlow, type Position } from '@vue-flow/core'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String as () => Position,
    required: true,
  },
  targetPosition: {
    type: String as () => Position,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
})

const { findNode } = useVueFlow()

const path = computed(() => getBezierPath(props))

const markerId = computed(() => `${props.id}-marker`)

const markerColor = computed(() => {
  const sourceNode = findNode(props.source)
  const targetNode = findNode(props.target)

  if (sourceNode?.selected) {
    return '#ff0072'
  }

  if (targetNode?.selected) {
    return '#2563eb'
  }

  return '#4a5568'
})

const markerType = computed(() => {
  const sourceNode = findNode(props.source)
  const targetNode = findNode(props.target)

  if (sourceNode?.selected) {
    return 'diamond'
  }

  if (targetNode?.selected) {
    return 'circle'
  }

  return 'square'
})
</script>

<template>
  <BaseEdge
    :id="id"
    :path="path[0]"
    :marker-end="`url(#${markerId})`"
    :marker-start="`url(#${markerId})`"
    :label="`${markerType} marker`"
    :label-x="path[1]"
    :label-y="path[2]"
    :label-bg-style="{ fill: 'whitesmoke' }"
  />

  <CustomMarker
    :id="markerId"
    :type="markerType"
    :stroke="markerColor"
    :stroke-width="2"
    :width="20"
    :height="20"
  />
</template>
