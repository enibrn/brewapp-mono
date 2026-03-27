<template>
  <v-confirm-edit v-model="model">
    <template #default="{ model: proxyModel, actions }">
      <v-card
        class="mx-auto"
        max-width="320"
        title="Update Field"
      >
        <template #text>
          <v-text-field
            v-model="proxyModel.value"
            messages="Modify my value"
          />
        </template>

        <template #actions>
          <v-spacer />

          <component :is="actions" />
        </template>
      </v-card>
    </template>
  </v-confirm-edit>
</template>

<script
  setup
  lang="ts"
>
import { shallowRef } from 'vue'

const model = shallowRef('Egg plant')
</script>