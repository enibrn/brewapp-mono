import type { Node, Edge, CustomEvent } from '@vue-flow/core'

export enum ProcessStatus {
  ERROR = 'error',
  SKIPPED = 'skipped',
  CANCELLED = 'cancelled',
  FINISHED = 'finished',
  RUNNING = 'running',
}

export interface ProcessData {
  status: ProcessStatus | null
}

export type ProcessNode = Node<ProcessData, Record<string, CustomEvent>, 'process'>

export interface ProcessEdgeData {
  isAnimating?: boolean
}

export type ProcessEdge = Edge<ProcessEdgeData, Record<string, CustomEvent>, 'process'>

// Tipo per la direzione del layout
export type Direction = 'LR' | 'TB'
