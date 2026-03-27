import { ref } from 'vue'

/**
 * In a real world example you would want to avoid creating refs in a global scope like this
 */
const isVisible = ref(false)
const message = ref('')
let resolveCallback: ((value: boolean) => void) | undefined

export function useDialogState() {
  return {
    isVisible,
    message,
    resolve: (value: boolean) => {
      if (resolveCallback) {
        resolveCallback(value)
      }
    },
  }
}

export function useDialog() {
  return {
    confirm(msg: string) {
      isVisible.value = true
      message.value = msg
      return new Promise<boolean>((resolve) => {
        resolveCallback = resolve
      })
    },
  }
}
