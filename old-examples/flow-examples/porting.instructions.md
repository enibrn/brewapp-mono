# Instructions for Porting Vue Flow Examples to Nuxt 3 Layers

This document outlines the process and best practices for porting Vue Flow examples from standalone Vue 3 applications to Nuxt 3 layers structure.

## Directory Structure

```
layers/[example-name]/
├── components/                    # Example-specific components
│   └── [ComponentName].vue        # Reusable components 
├── composables/                   # Example-specific composables
│   └── use[FeatureName].ts        # Logic extracted to composables
├── assets/                        # Only if necessary
│   └── [example-name]-[asset].ext # Example-specific assets with namespacing
└── pages/
    └── example/
        └── [example-name].vue     # Main page component
```

## Coding Guidelines

### Vue Components

1. **Script Setup with TypeScript**
   - Always use `<script setup lang="ts">` instead of `<script setup>`
   - Do not add semicolons at the end of statements

2. **Auto-imports and Imports**
   - **Keep imports from external libraries** like `@vue-flow/core`, `@vue-flow/background`, etc.
   - **Do NOT import from Vue core** (`ref`, `computed`, etc.) as they are auto-imported by Nuxt
   - **Do NOT import composables** from the same layer (they are auto-imported)
   - **Only import `h`** from Vue if you need to create virtual nodes: `import { h } from 'vue'`

3. **Page Component**
   - Place in `pages/example/[example-name].vue`
   - **Do NOT add `definePageMeta()`** - keep the component simple
   - Use composition API style with `<script setup lang="ts">`

4. **Structure Fidelity**
   - **Follow the original example structure exactly** - if the original has only one file, create only one page file
   - **Do NOT create composables or components** unless they exist in the original example
   - **Do NOT over-engineer** - keep the same level of complexity as the original

### Composables

1. **TypeScript**
   - Always use TypeScript (`.ts` extension)
   - Add proper type definitions for parameters and return values

2. **Naming Convention**
   - Prefix with `use`: `useFeature.ts`
   - Export named functions, not default exports

### Assets

1. **Asset Naming**
   - Use `[example-name]-[original-name].[ext]` pattern
   - Example: `basic-style.css`, `layout-initial-elements.js`

2. **Import Path**
   - For JS/TS assets: Import using relative paths: `import { data } from '../assets/basic-initial-elements.js'`
   - For CSS: Use style imports instead of direct imports:
     ```vue
     <!-- CORRECT -->
     <style>
     @import '../../assets/example-style.css';
     </style>

     <!-- INCORRECT - Will cause build errors -->
     import '../assets/example-style.css';
     ```

## Porting Process

### 1. Analyze Source Files

- Review the original example structure
- **Count the number of files** - this determines how many files you should create
- Identify components, utilities, and assets
- **DO NOT create additional structure** that doesn't exist in the original

### 2. Create Layer Structure

```powershell
# PowerShell command (Windows)
mkdir -Path "layers/[example-name]/pages/example", "layers/[example-name]/components", "layers/[example-name]/composables", "layers/[example-name]/assets"
```

### 3. Layer Configuration

Create a simple `nuxt.config.ts` file in the layer root with minimal configuration:

```typescript
export default defineNuxtConfig({});
```

**Important:** Do NOT add `extends: ['../..']` or any other configuration. Keep it minimal to avoid conflicts.

### 4. Port Components

1. **Convert to TypeScript**
   - Add `lang="ts"` to script tags
   - Add proper type definitions

2. **Adjust Imports**
   - Keep imports from external libraries like `@vue-flow/core`
   - Remove Vue core imports like `ref`, `computed`, etc. (auto-imported)
   - Remove imports for auto-imported composables
   - Only keep `h` import if virtual nodes are needed

3. **Update Relative Imports**
   - Update asset imports to use the correct paths

### 5. Test & Validate

- Test the ported example for visual correctness
- Verify all interactions work as expected
- Check for TypeScript errors

## Example: Converting a Basic Component

### Original (Vue 3)

```vue
<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { initialNodes, initialEdges } from './initial-elements.js'

const { onConnect } = useVueFlow()

const nodes = ref(initialNodes)
const edges = ref(initialEdges)

onConnect((params) => {
  edges.value.push(params)
})
</script>
```

### Ported (Nuxt 3)

```vue
<script setup lang="ts">
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'

const { onConnect } = useVueFlow()

const nodes = ref(initialNodes)
const edges = ref(initialEdges)

onConnect((params) => {
  edges.value.push(params)
})
</script>
```

### Important: Structure Fidelity Example

**WRONG Approach (Over-engineering):**
```
Original: 1 file (App.vue)
Ported: 3 files (page.vue + composable.ts + component.vue)
```

**CORRECT Approach (Faithful porting):**
```
Original: 1 file (App.vue)
Ported: 1 file (example-name.vue)
```

## Common Issues

1. **Component Not Found**
   - Make sure the component is in the correct directory
   - Nuxt auto-imports only work for components in the `components/` directory

2. **TypeScript Errors**
   - Add proper type definitions for parameters and return values
   - Use TypeScript interfaces for complex data structures

3. **Assets Not Found**
   - Check the import path
   - Make sure the asset is in the correct directory
   - For CSS files, ensure they are imported in the `<style>` section with `@import`, not as a script import

4. **Styling Issues**
   - Make sure styles are properly scoped or global as needed
   - Check for CSS conflicts with Nuxt's built-in styles
