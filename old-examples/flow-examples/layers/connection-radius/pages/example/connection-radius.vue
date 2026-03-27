<script
  setup
  lang="ts"
>
import { VueFlow } from "@vue-flow/core";
import type { Node } from "@vue-flow/core";

const nodes = ref<Node[]>([
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 200, y: 0 },
  },
]);

definePageMeta({
  title: "Connection Radius Example",
  description: "Vue Flow connection radius and snapping example",
});
</script>

<template>
  <VueFlow
    :nodes="nodes"
    :connection-radius="30"
    auto-connect
    fit-view-on-init
  >
    <template
#connection-line="{
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      sourceNode,
      sourceHandle,
      targetNode,
      targetHandle,
      connectionStatus,
      markerStart,
      markerEnd
    }">
      <SnappableConnectionLine
        :source-x="sourceX"
        :source-y="sourceY"
        :target-x="targetX"
        :target-y="targetY"
        :source-position="sourcePosition"
        :target-position="targetPosition"
        :source-node="sourceNode"
        :source-handle="sourceHandle"
        :target-node="targetNode"
        :target-handle="targetHandle"
        :connection-status="connectionStatus"
        :marker-start="markerStart"
        :marker-end="markerEnd"
      />
    </template>
  </VueFlow>
</template>
