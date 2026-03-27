<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue'
import { extendedVuetifyRenderers } from '@jsonforms/vue-vuetify'
import { markRaw, ref } from 'vue'

// Types
interface FormData {
  name: string
  email: string
  age: number
}

interface JsonFormsChangeEvent {
  data: FormData
}

const renderers = markRaw([
  ...extendedVuetifyRenderers,
  // here you can add custom renderers
])

// Reactive data properties
const data = ref<FormData>({
  name: '',
  email: '',
  age: 0,
})

const schema = ref({
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email',
    },
    age: {
      type: 'integer',
      title: 'Age',
      minimum: 0,
    },
  },
  required: ['name', 'email'],
})

const uischema = ref({
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'Control',
      scope: '#/properties/email',
    },
    {
      type: 'Control',
      scope: '#/properties/age',
    },
  ],
})

// Methods
const onChange = (event: JsonFormsChangeEvent) => {
  data.value = event.data
}
</script>

<template>
  <div class="pa-6">
    <h1 class="text-h3 mb-6">JSONForms + Vuetify Example</h1>
    
    <v-row>
      <v-col cols="12" md="6">
        <h2 class="text-h5 mb-4">Form</h2>
        <JsonForms
          :data="data"
          :renderers="renderers"
          :schema="schema"
          :uischema="uischema"
          @change="onChange"
        />
      </v-col>
      
      <v-col cols="12" md="6">
        <h2 class="text-h5 mb-4">Form Data</h2>
        <v-card>
          <v-card-text>
            <pre>{{ JSON.stringify(data, null, 2) }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style>
@import '@jsonforms/vue-vuetify/lib/jsonforms-vue-vuetify.css';
</style>
