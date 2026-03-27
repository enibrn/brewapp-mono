import { useVueFlow } from '@vue-flow/core'

export function useInteractionControls() {
  const {
    nodesDraggable,
    nodesConnectable,
    elementsSelectable,
    zoomOnScroll,
    zoomOnDoubleClick,
    zoomOnPinch,
    panOnScroll,
    panOnScrollMode,
    panOnDrag,
    onConnect,
    onNodeDragStop,
    onPaneClick,
    onPaneScroll,
    onPaneContextMenu,
    onNodeDragStart,
    onMoveEnd,
    addEdges,
  } = useVueFlow()

  const captureZoomClick = ref(false)
  const captureZoomScroll = ref(false)

  // Event handlers
  onConnect((params) => addEdges(params))
  onNodeDragStart((e) => console.log('drag start', e))
  onNodeDragStop((e) => console.log('drag stop', e))
  onPaneClick((event) => captureZoomClick.value && console.log('pane click', event))
  onPaneScroll((event) => captureZoomScroll.value && console.log('pane scroll', event))
  onPaneContextMenu((event) => captureZoomClick.value && console.log('pane ctx menu', event))
  onMoveEnd((flowTransform) => console.log('move end', flowTransform))

  return {
    // Flow properties
    nodesDraggable,
    nodesConnectable,
    elementsSelectable,
    zoomOnScroll,
    zoomOnDoubleClick,
    zoomOnPinch,
    panOnScroll,
    panOnScrollMode,
    panOnDrag,
    // Capture flags
    captureZoomClick,
    captureZoomScroll,
  }
}
