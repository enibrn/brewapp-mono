<script
  lang="ts"
  setup
>
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import type { Direction, ProcessNode, ProcessEdge } from '~/types/layouting'

const initialPos = { x: 0, y: 0 }
const type = 'process'
const data = { status: null }

const initialNodes: ProcessNode[] = [
  {
    id: '1',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2a',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2b',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2c',
    position: initialPos,
    type,
    data,
  },
  {
    id: '2d',
    position: initialPos,
    type,
    data,
  },
  {
    id: '3',
    position: initialPos,
    type,
    data,
  },
  {
    id: '4',
    position: initialPos,
    type,
    data,
  },
  {
    id: '5',
    position: initialPos,
    type,
    data,
  },
  {
    id: '6',
    position: initialPos,
    type,
    data,
  },
  {
    id: '7',
    position: initialPos,
    type,
    data,
  },
]

const initialEdges: ProcessEdge[] = [
  { id: 'e1-2', source: '1', target: '2', type },
  { id: 'e1-3', source: '1', target: '3', type },
  { id: 'e2-2a', source: '2', target: '2a', type },
  { id: 'e2-2b', source: '2', target: '2b', type },
  { id: 'e2-2c', source: '2', target: '2c', type },
  { id: 'e2c-2d', source: '2c', target: '2d', type },
  { id: 'e3-7', source: '3', target: '4', type },
  { id: 'e4-5', source: '4', target: '5', type },
  { id: 'e5-6', source: '5', target: '6', type },
  { id: 'e5-7', source: '5', target: '7', type },
]

const nodes = ref(initialNodes)
const edges = ref(initialEdges)
const cancelOnError = ref(true)

const { graph, layout } = useLayouting()
const { run, stop, reset, isRunning } = useRunProcess({ graph, cancelOnError })
const { fitView } = useVueFlow()

async function layoutGraph(direction: Direction) {
  // Stop the current execution process
  await stop()

  // Reset the nodes to their initial status
  reset(nodes.value)

  // Layout the graph
  nodes.value = layout(nodes.value, edges.value, direction)

  // Fit the view to the graph
  nextTick(() => {
    fitView()
  })
}
</script>

<template>
  <div class="layout-flow">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :default-edge-options="{ type: 'process', animated: true }"
      @nodes-initialized="layoutGraph('LR')"
    >
      <template #node-process="processNodeProps">
        <LayoutingProcessNode v-bind="processNodeProps" />
      </template>

      <template #edge-process="processEdgeProps">
        <LayoutingProcessEdge v-bind="processEdgeProps" />
      </template>

      <Background />

      <Panel
        class="process-panel"
        position="top-right"
      >
        <div class="layout-panel">
          <button
            v-if="isRunning"
            class="stop-btn"
            title="stop"
            @click="stop"
          >
            <LayoutingIcon name="stop" />
            <span class="spinner" />
          </button>
          <button
            v-else
            title="start"
            @click="run(nodes)"
          >
            <LayoutingIcon name="play" />
          </button>

          <button
            title="set horizontal layout"
            @click="layoutGraph('LR')"
          >
            <LayoutingIcon name="horizontal" />
          </button>

          <button
            title="set vertical layout"
            @click="layoutGraph('TB')"
          >
            <LayoutingIcon name="vertical" />
          </button>
        </div>

        <div class="checkbox-panel">
          <label>Cancel on error</label>
          <input
            v-model="cancelOnError"
            type="checkbox"
          >
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<style scoped>
.layout-flow {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.vue-flow {
  width: 100%;
  height: 100%;
}

.process-panel {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.layout-panel {
  display: flex;
  gap: 0.5rem;
}

.layout-panel button {
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout-panel button:hover {
  background-color: #e5e5e5;
}

.layout-panel svg {
  width: 1.5rem;
  height: 1.5rem;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #2563eb;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

.stop-btn {
  position: relative;
  color: #ef4444;
}

.stop-btn svg {
  opacity: 0.5;
  z-index: 2;
}

.stop-btn .spinner {
  position: absolute;
  border-color: #ef4444;
  border-top-color: transparent;
  z-index: 1;
}

.checkbox-panel {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

