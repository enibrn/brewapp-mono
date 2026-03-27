<script setup lang="ts">
import { connectionExists, getBezierPath, useVueFlow } from "@vue-flow/core";
import type {
  Connection,
  ConnectionLineProps,
  GraphNode,
  ConnectingHandle,
  HandleElement,
} from "@vue-flow/core";

// Define props using the proper ConnectionLineProps type
const props = defineProps<ConnectionLineProps>();

const { getNodes, connectionStartHandle, onConnectEnd, addEdges, edges } =
  useVueFlow();

// Define proper types for our data structures
interface ClosestNodeResult {
  distance: number;
  node: GraphNode | null;
}

interface ClosestData {
  node: GraphNode | null;
  handle: HandleElement | null;
  startHandle: ConnectingHandle | null;
}

const closest = reactive<ClosestData>({
  node: null,
  handle: null,
  startHandle: connectionStartHandle.value,
});

const canSnap = ref(false);

const HIGHLIGHT_COLOR = "#f59e0b";
const SNAP_HIGHLIGHT_COLOR = "#10b981";
const MIN_DISTANCE = 75;
const SNAP_DISTANCE = 30;

watch([() => props.targetY, () => props.targetX], (_, __, onCleanup) => {
  // Type the result properly
  const closestNode = getNodes.value.reduce<ClosestNodeResult>(
    (res, n) => {
      if (
        connectionStartHandle.value &&
        n.id !== connectionStartHandle.value.nodeId
      ) {
        const dx =
          props.targetX - (n.computedPosition.x + n.dimensions.width / 2);
        const dy =
          props.targetY - (n.computedPosition.y + n.dimensions.height / 2);
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < res.distance && d < MIN_DISTANCE) {
          return {
            distance: d,
            node: n,
          };
        }
      }

      return res;
    },
    {
      distance: Number.MAX_VALUE,
      node: null,
    },
  );

  if (!closestNode.node) {
    return;
  }

  canSnap.value = closestNode.distance < SNAP_DISTANCE;

  // Check if connectionStartHandle exists before using it
  if (!connectionStartHandle.value) return;

  const type =
    connectionStartHandle.value.type === "source" ? "target" : "source";

  // Use explicit types for the reduce function
  const closestHandle = closestNode.node.handleBounds[type]?.reduce(
    (prev, curr) => {
      const prevDistance = Math.sqrt(
        (prev.x - props.targetX) ** 2 + (prev.y - props.targetY) ** 2,
      );
      const currDistance = Math.sqrt(
        (curr.x - props.targetX) ** 2 + (curr.y - props.targetY) ** 2,
      );

      return prevDistance < currDistance ? prev : curr;
    },
  );

  if (!closestHandle) return;

  // Make sure connectionStartHandle exists before using it
  if (
    connectionStartHandle.value &&
    connectionExists(
      {
        source: connectionStartHandle.value.nodeId,
        sourceHandle: connectionStartHandle.value.id,
        target: closestNode.node.id,
        targetHandle: closestHandle.id,
      } as Connection,
      edges.value,
    )
  ) {
    return;
  }

  const el = document.querySelector(
    `[data-nodeid='${closestNode.node.id}']`,
  ) as HTMLElement;

  if (el) {
    // Cast as HTMLElement to access style
    const prevStyle = el.style.backgroundColor;
    el.style.backgroundColor = canSnap.value
      ? SNAP_HIGHLIGHT_COLOR
      : HIGHLIGHT_COLOR;
    closest.node = closestNode.node;
    closest.handle = closestHandle;

    onCleanup(() => {
      if (el) {
        el.style.backgroundColor = prevStyle;
      }
      closest.node = null;
      closest.handle = null;
    });
  }
});

const path = computed(() => getBezierPath(props));

onConnectEnd(() => {
  if (closest.startHandle && closest.handle && closest.node) {
    if (canSnap.value) {
      addEdges([
        {
          sourceHandle: closest.startHandle.id,
          source: closest.startHandle.nodeId,
          target: closest.node.id,
          targetHandle: closest.handle.id,
        } as Connection,
      ]);
    }
  }
});

const strokeColor = computed(() => {
  if (canSnap.value) {
    return SNAP_HIGHLIGHT_COLOR;
  }

  if (closest.node) {
    return HIGHLIGHT_COLOR;
  }

  return "#222";
});
</script>

<template>
  <g>
    <path :d="path[0]" class="vue-flow__connection-path" />
    <circle
      :cx="targetX"
      :cy="targetY"
      fill="#fff"
      :stroke="strokeColor"
      :r="3"
      :stroke-width="1.5"
    />
  </g>
</template>
