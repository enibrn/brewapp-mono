<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue'
import { extendedVuetifyRenderers } from '@jsonforms/vue-vuetify'
import { markRaw, ref } from 'vue'

// Types
interface PersonData {
  firstName: string
  lastName: string
  email: string
  age: number
  birthDate: string
  nationality: string
  address: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  interests: string[]
  newsletter: boolean
  rating: number
}

interface JsonFormsChangeEvent {
  data: PersonData
}

const renderers = markRaw([
  ...extendedVuetifyRenderers,
  // here you can add custom renderers
])

// Reactive data properties
const data = ref<PersonData>({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  age: 25,
  birthDate: '1998-05-15',
  nationality: 'US',
  address: {
    street: '123 Main St',
    city: 'New York',
    postalCode: '10001',
    country: 'USA'
  },
  interests: ['Technology', 'Music'],
  newsletter: true,
  rating: 4
})

const schema = ref({
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First Name',
      minLength: 2
    },
    lastName: {
      type: 'string',
      title: 'Last Name',
      minLength: 2
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email Address'
    },
    age: {
      type: 'integer',
      title: 'Age',
      minimum: 0,
      maximum: 150
    },
    birthDate: {
      type: 'string',
      format: 'date',
      title: 'Birth Date'
    },
    nationality: {
      type: 'string',
      title: 'Nationality',
      enum: ['US', 'DE', 'FR', 'IT', 'ES', 'UK', 'Other']
    },
    address: {
      type: 'object',
      title: 'Address',
      properties: {
        street: {
          type: 'string',
          title: 'Street'
        },
        city: {
          type: 'string',
          title: 'City'
        },
        postalCode: {
          type: 'string',
          title: 'Postal Code'
        },
        country: {
          type: 'string',
          title: 'Country'
        }
      },
      required: ['street', 'city']
    },
    interests: {
      type: 'array',
      title: 'Interests',
      items: {
        type: 'string',
        enum: ['Technology', 'Music', 'Sports', 'Art', 'Travel', 'Reading', 'Gaming', 'Cooking']
      },
      uniqueItems: true
    },
    newsletter: {
      type: 'boolean',
      title: 'Subscribe to Newsletter'
    },
    rating: {
      type: 'integer',
      title: 'Rate our service (1-5)',
      minimum: 1,
      maximum: 5
    }
  },
  required: ['firstName', 'lastName', 'email', 'age']
})

const uischema = ref({
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'Personal Information',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/firstName'
            },
            {
              type: 'Control',
              scope: '#/properties/lastName'
            }
          ]
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/email'
            },
            {
              type: 'Control',
              scope: '#/properties/age'
            }
          ]
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/birthDate'
            },
            {
              type: 'Control',
              scope: '#/properties/nationality'
            }
          ]
        }
      ]
    },
    {
      type: 'Group',
      label: 'Address',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/address/properties/street'
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/address/properties/city'
            },
            {
              type: 'Control',
              scope: '#/properties/address/properties/postalCode'
            }
          ]
        },
        {
          type: 'Control',
          scope: '#/properties/address/properties/country'
        }
      ]
    },
    {
      type: 'Group',
      label: 'Preferences',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/interests'
        },
        {
          type: 'Control',
          scope: '#/properties/newsletter'
        },
        {
          type: 'Control',
          scope: '#/properties/rating'
        }
      ]
    }
  ]
})

// Methods
const onChange = (event: JsonFormsChangeEvent) => {
  data.value = event.data
}
</script>

<template>
  <div class="pa-6">
    <h1 class="text-h3 mb-6 text-center">Advanced JSONForms + Vuetify Example</h1>
    
    <v-row>
      <v-col cols="12" lg="7">
        <v-card elevation="2">
          <v-card-title>
            <v-icon class="me-2">mdi-form-select</v-icon>
            Dynamic Form
          </v-card-title>
          <v-card-text>
            <JsonForms
              :data="data"
              :renderers="renderers"
              :schema="schema"
              :uischema="uischema"
              @change="onChange"
            />
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" lg="5">
        <v-card elevation="2" class="sticky-card">
          <v-card-title>
            <v-icon class="me-2">mdi-code-json</v-icon>
            Form Data (Real-time)
          </v-card-title>
          <v-card-text>
            <v-code tag="pre">{{ JSON.stringify(data, null, 2) }}</v-code>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style>
@import '@jsonforms/vue-vuetify/lib/jsonforms-vue-vuetify.css';

.sticky-card {
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}
</style>
