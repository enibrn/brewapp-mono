<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item>
        <v-list-item-title class="text-h6">
          Control Panel
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-title>Add Elements</v-list-item-title>
        </v-list-item>
        
        <v-list-item>
          <v-btn 
            block
            color="primary"
            @click="addNode"
          >
            <v-icon left>mdi-plus</v-icon>
            Add Node
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>App</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <VueFlow 
        v-model="elements"
        @connect="onConnect"
        @node-click="onNodeClick"
        @edge-click="onEdgeClick"
        @pane-click="onPaneClick"
      >
        <Background pattern-color="#aaa" :gap="16" class="dark-background" />
        <Controls />
        <MiniMap />
      </VueFlow>
    </v-main>
  </v-app>
</template>

<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';

const drawer = ref(null);
let nodeIdCounter = 3; // Starting from 3 since we already have nodes 1 and 2
let edgeIdCounter = 2; // Starting from 2 since we already have one edge

// State to keep track of selected elements
const selectedNodeId = ref(null);
const selectedEdgeId = ref(null);

// Function to generate a unique ID for new nodes
const generateUniqueId = () => {
  return String(nodeIdCounter++);
}

// Function to generate a unique ID for new edges
const generateUniqueEdgeId = () => {
  return `e${edgeIdCounter++}`;
}

// Function to add a new node
const addNode = () => {
  const id = generateUniqueId();
  
  // Calculate a random position for the new node
  const xPos = 100 + Math.random() * 400;
  const yPos = 100 + Math.random() * 300;
  
  // Create the new node
  const newNode = {
    id,
    label: `Node ${id}`,
    position: { x: xPos, y: yPos },
    data: { label: `Node ${id}` },
    class: '' // Add an empty class that will be modified when the node is selected
  };
  
  // Add the new node to the elements array
  elements.value = [...elements.value, newNode];
};

// Function to handle node selection
const onNodeClick = (event, node) => {
  // Remove the 'selected' class from all nodes
  elements.value = elements.value.map(el => {
    if (el.class && el.class.includes('selected')) {
      return { ...el, class: el.class.replace('selected', '').trim() };
    }
    return el;
  });
  
  // If we clicked on a node different from the one already selected
  if (selectedNodeId.value !== node.id) {
    // Set the new selected node
    selectedNodeId.value = node.id;
    selectedEdgeId.value = null;
    
    // Add the 'selected' class to the selected node
    elements.value = elements.value.map(el => {
      if (el.id === node.id) {
        return { ...el, class: (el.class || '') + ' selected' };
      }
      return el;
    });
  } else {
    // Otherwise deselect everything
    selectedNodeId.value = null;
  }
};

// Function to handle edge selection
const onEdgeClick = (event, edge) => {
  // Remove the 'selected' class from all elements
  elements.value = elements.value.map(el => {
    if (el.class && el.class.includes('selected')) {
      return { ...el, class: el.class.replace('selected', '').trim() };
    }
    return el;
  });
  
  // If we clicked on an edge different from the one already selected
  if (selectedEdgeId.value !== edge.id) {
    // Set the new selected edge
    selectedEdgeId.value = edge.id;
    selectedNodeId.value = null;
    
    // Add the 'selected' class to the selected edge
    elements.value = elements.value.map(el => {
      if (el.id === edge.id) {
        return { ...el, class: (el.class || '') + ' selected' };
      }
      return el;
    });
  } else {
    // Otherwise deselect everything
    selectedEdgeId.value = null;
  }
};

// Function to handle click on the panel (deselect everything)
const onPaneClick = () => {
  // Remove the 'selected' class from all elements
  elements.value = elements.value.map(el => {
    if (el.class && el.class.includes('selected')) {
      return { ...el, class: el.class.replace('selected', '').trim() };
    }
    return el;
  });
  
  // Reset selections
  selectedNodeId.value = null;
  selectedEdgeId.value = null;
};

// Function to handle the creation of new connections
const onConnect = (params) => {
  // Create a new edge with the connection properties
  const newEdge = {
    id: generateUniqueEdgeId(),
    source: params.source,
    target: params.target,
    sourceHandle: params.sourceHandle,
    targetHandle: params.targetHandle,
    class: '' // Add an empty class that will be modified when the edge is selected
  };
  
  // Add the new edge to the elements array
  elements.value = [...elements.value, newEdge];
};

// Minimal definition of graph elements
const elements = ref([
  // Nodes
  {
    id: '1',
    label: 'Node 1',
    position: { x: 100, y: 100 },
    data: { label: 'Node 1' },
    class: ''
  },
  {
    id: '2',
    label: 'Node 2',
    position: { x: 300, y: 200 },
    data: { label: 'Node 2' },
    class: ''
  },
  // Connection
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    class: ''
  }
]);
</script>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>

<style>
.dark-background {
  background-color: #1e1e1e !important;
}

/* Styles for selected elements */
.vue-flow__node.selected {
  box-shadow: 0 0 0 2px #1976D2;
  border-color: #1976D2;
  z-index: 10;
}

.vue-flow__edge.selected .vue-flow__edge-path {
  stroke: #1976D2;
  stroke-width: 2;
  filter: drop-shadow(0 0 2px rgba(25, 118, 210, 1));  /* More defined shadow */
}

.vue-flow__node.selected .vue-flow__handle {
  border-color: #1976D2;
}
</style>