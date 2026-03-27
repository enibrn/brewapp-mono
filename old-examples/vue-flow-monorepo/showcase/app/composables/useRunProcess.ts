import type { Node } from '@vue-flow/core'
import { useVueFlow } from '@vue-flow/core'
import type dagre from '@dagrejs/dagre'
import type { ProcessNode, ProcessStatus } from '~/types/layouting'

// Utility per aspettare fino a quando una condizione diventa true
async function until(condition: () => boolean): Promise<void> {
  return new Promise((resolve) => {
    if (condition()) {
      resolve()
    } else {
      const interval = setInterval(() => {
        if (condition()) {
          clearInterval(interval)
          resolve()
        }
      }, 100)
    }
  })
}

interface UseRunProcessOptions {
  graph: MaybeRefOrGetter<dagre.graphlib.Graph<Node>>
  cancelOnError?: MaybeRefOrGetter<boolean>
}

/**
 * Composable to simulate running a process tree.
 *
 * It loops through each node, pretends to run an async process, and updates the node's data indicating whether the process has finished.
 * When one node finishes, the next one starts.
 *
 * When a node has multiple descendants, it will run them in parallel.
 *
 * @param options
 * @param options.graph The graph object containing the nodes and edges.
 * @param options.cancelOnError Whether to cancel the process if an error occurs.
 */
export function useRunProcess({ graph: dagreGraph, cancelOnError = true }: UseRunProcessOptions) {
  const { updateNodeData, getConnectedEdges } = useVueFlow()

  const graph = toRef(() => toValue(dagreGraph))

  const isRunning = ref(false)

  const runningTasks = new Map<string, NodeJS.Timeout>()

  const executedNodes = new Set<string>()

  const upcomingTasks = new Set<string>()

  /**
   * Helper to update a node's status.
   *
   * @param nodeId The ID of the node to update.
   * @param status The new status.
   */
  function updateNodeStatus(nodeId: string, status: ProcessStatus | null) {
    updateNodeData(nodeId, { status })
  }

  /**
   * Run the process on a node.
   * It will mark the node as running, simulate an async process, and then mark the node as finished or errored.
   *
   * @param nodeId The ID of the node to run.
   * @param isStart Whether this is a starting node.
   */
  async function runNode(nodeId: string, isStart = false) {
    if (executedNodes.has(nodeId)) {
      return
    }

    // save the upcoming task in case it gets cancelled before we even start it
    upcomingTasks.add(nodeId)

    // get all incoming edges to this node
    const incomers = getConnectedEdges(nodeId).filter((connection) => connection.target === nodeId)

    // wait for edge animations to finish before starting the process
    await Promise.all(incomers.map((incomer) => until(() => !incomer.data?.isAnimating)))

    // remove the upcoming task since we are about to start it
    upcomingTasks.clear()

    if (!isRunning.value) {
      // The process was stopped
      return
    }

    // mark the node as executed, so it doesn't run again
    executedNodes.add(nodeId)

    updateNodeStatus(nodeId, 'running' as ProcessStatus)

    // simulate an async process with a random timeout between 1-2 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000

    return new Promise((resolve) => {
      const timeout = setTimeout(
        async () => {
          // get all children of this node
          const children = graph.value.successors(nodeId) || []

          // randomly decide whether the node will throw an error
          const willThrowError = Math.random() < 0.15

          // we avoid throwing an error on the starting node
          if (!isStart && willThrowError) {
            updateNodeStatus(nodeId, 'error' as ProcessStatus)

            // if cancelOnError is true, we stop the process and mark all descendants as skipped
            if (toValue(cancelOnError)) {
              await skipDescendants(nodeId)
              runningTasks.delete(nodeId)

              resolve(true)
              return
            }
          }

          updateNodeStatus(nodeId, 'finished' as ProcessStatus)
          runningTasks.delete(nodeId)

          if (children.length > 0) {
            // run the process on the children in parallel
            await Promise.all(children.map((child) => runNode(child.id)))
          }

          resolve(true)
        },
        // if this is a starting node, we don't want to wait
        isStart ? 0 : delay,
      )

      // save the timeout so we can cancel it if needed
      runningTasks.set(nodeId, timeout)
    })
  }

  /**
   * Run a sequence of nodes.
   * It will start with the nodes that have no predecessors and then run the process on each node in sequence.
   * If a node has multiple descendants, it will run them in parallel.
   * If an error occurs, it will stop the process and mark all descendants as skipped.
   * If cancelOnError is true, it will stop the process if an error occurs.
   * If the process is stopped, it will mark all running nodes as cancelled.
   *
   * @param nodes The nodes to run.
   */
  async function run(nodes: ProcessNode[]) {
    // if the process is already running, we don't want to start it again
    if (isRunning.value) {
      return
    }

    // reset all nodes to their initial state
    reset(nodes)

    isRunning.value = true

    // get all starting nodes (nodes with no predecessors)
    const startingNodes = nodes.filter((node) => graph.value.predecessors(node.id)?.length === 0)

    // run the process on all starting nodes in parallel
    await Promise.all(startingNodes.map((node) => runNode(node.id, true)))

    isRunning.value = false
    executedNodes.clear()
    upcomingTasks.clear()
  }

  /**
   * Reset all nodes to their initial state.
   *
   * @param nodes The nodes to reset.
   */
  function reset(nodes: ProcessNode[]) {
    clear()

    for (const node of nodes) {
      updateNodeStatus(node.id, null)
    }
  }

  /**
   * Skip all descendants of a node.
   *
   * @param nodeId The ID of the node to skip descendants for.
   */
  async function skipDescendants(nodeId: string) {
    const children = graph.value.successors(nodeId) || []

    for (const child of children) {
      updateNodeStatus(child.id, 'skipped' as ProcessStatus)
      await skipDescendants(child.id)
    }
  }

  /**
   * Clear all running tasks and reset state.
   */
  function clear() {
    for (const [, task] of runningTasks) {
      clearTimeout(task)
    }

    runningTasks.clear()
    executedNodes.clear()
    upcomingTasks.clear()
    isRunning.value = false
  }

  /**
   * Stop the process.
   *
   * It will mark all running nodes as cancelled and skip all upcoming tasks.
   */
  async function stop() {
    isRunning.value = false

    for (const nodeId of upcomingTasks) {
      clearTimeout(runningTasks.get(nodeId))
      runningTasks.delete(nodeId)
      updateNodeStatus(nodeId, 'cancelled' as ProcessStatus)
      await skipDescendants(nodeId)
    }

    for (const [nodeId, task] of runningTasks) {
      clearTimeout(task)
      runningTasks.delete(nodeId)
      updateNodeStatus(nodeId, 'cancelled' as ProcessStatus)
      await skipDescendants(nodeId)
    }

    executedNodes.clear()
    upcomingTasks.clear()
  }

  return { run, stop, reset, isRunning }
}
