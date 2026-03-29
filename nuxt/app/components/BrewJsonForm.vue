<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue'
import { extendedVuetifyRenderers } from '@jsonforms/vue-vuetify'
import { markRaw } from 'vue'

const props = defineProps<{
  schema: any
  uischema: any
  modelValue: any
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'error', errors: any): void
}>()

const renderers = markRaw([
  ...extendedVuetifyRenderers
])

const onChange = (event: any) => {
  console.log('BrewJsonForm onChange', event.data)
  emit('update:modelValue', event.data)
  emit('error', event.errors)
}
</script>

<template>
  <div class="brew-json-form">
    <JsonForms
      :data="modelValue"
      :renderers="renderers"
      :schema="schema"
      :uischema="uischema"
      @change="onChange"
    />
  </div>
</template>

<style>
@import '@jsonforms/vue-vuetify/lib/jsonforms-vue-vuetify.css';
</style>
