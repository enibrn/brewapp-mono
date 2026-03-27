// Tipi specifici per i nodi
import type { Node } from '@vue-flow/core'

export type CustomNodeData = {
  label: string
  // Altre proprietà specifiche dei nodi
}

export interface CustomNode extends Node {
  data: CustomNodeData
  // Estensioni specifiche del nodo
}
