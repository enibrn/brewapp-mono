<script
  setup
  lang="ts"
>
import { Panel, VueFlow, useVueFlow } from "@vue-flow/core";
import { initialNodes } from "../../assets/intersection-initial-elements.js";

/**
 * You can either use `getIntersectingNodes` to check if a given node intersects with others
 * or `isNodeIntersecting` to check if a node is intersecting with a given area
 */
const {
  onNodeDrag,
  getIntersectingNodes,
  isNodeIntersecting,
  updateNode,
  screenToFlowCoordinate,
} = useVueFlow();

const nodes = ref(initialNodes);

const panelEl = ref();

const isIntersectingWithPanel = ref(false);

const panelPosition = computed(() => {
  if (!panelEl.value) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  const { left, top, width, height } =
    panelEl.value.$el.getBoundingClientRect();

  return {
    ...screenToFlowCoordinate({ x: left, y: top }),
    width,
    height,
  };
});

onNodeDrag(({ node: draggedNode }) => {
  const intersections = getIntersectingNodes(draggedNode);
  const intersectionIds = intersections.map((intersection) => intersection.id);

  isIntersectingWithPanel.value = isNodeIntersecting(
    draggedNode,
    panelPosition.value,
  );

  for (const node of nodes.value) {
    const isIntersecting = intersectionIds.includes(node.id);

    updateNode(node.id, { class: isIntersecting ? "intersecting" : "" });
  }
});

definePageMeta({
  title: "Intersection Example",
  description: "Vue Flow intersection detection example",
});
</script>

<template>
  <VueFlow
    :nodes="nodes"
    fit-view-on-init
  >
    <Panel
      ref="panelEl"
      position="bottom-right"
      :class="{ intersecting: isIntersectingWithPanel }"
    />
  </VueFlow>
</template>

<style>
@import "../../assets/intersection-style.css";
</style>
