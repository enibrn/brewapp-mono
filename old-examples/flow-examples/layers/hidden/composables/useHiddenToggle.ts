import type { Node, Edge } from '@vue-flow/core'

export function useHiddenToggle(initialNodes: Node[], initialEdges: Edge[]) {
  const nodes = ref(initialNodes)
  const edges = ref(initialEdges)
  const isHidden = ref(false)

  const toggleHidden = () => {
    isHidden.value = !isHidden.value
    nodes.value = nodes.value.map((node) => ({ ...node, hidden: isHidden.value }))
    edges.value = edges.value.map((edge) => ({ ...edge, hidden: isHidden.value }))
  }

  return {
    nodes,
    edges,
    isHidden,
    toggleHidden
  }
}
