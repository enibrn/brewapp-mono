<template>
  <UForm :state="{}" class="flex gap-4">
    <UCard>
      <template #header>
        <h1>AntiOp of type {{ opType }}</h1>
      </template>

      <UInput
        v-model.number="a"
        type="number"
        placeholder="Enter number"
      />

      <UButton @click="calculate">Calculate</UButton>

      <p>Result: {{ result }}</p>
    </UCard>
  </UForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const a = ref(0);
const result = ref(0);
const { $antiOp } = useNuxtApp();

const opType = ref($antiOp.getType());

const calculate = () => {
  result.value = $antiOp.perform(a.value);
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

