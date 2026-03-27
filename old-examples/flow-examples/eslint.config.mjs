// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    // Base configuration for all files
    rules: {}
  },
  {
    // Specific configuration for Vue files in layers/*/pages/** paths
    files: ['**/layers/*/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
])
