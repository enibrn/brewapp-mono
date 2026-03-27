<template>
  <UForm :state="{}" class="flex gap-4">
    <UCard>
      <template #header>
        <h1>Operation of type {{ opType }}</h1>
      </template>

      <UInput
        v-model.number="a"
        type="number"
        placeholder="Enter first number"
      />

      <UInput
        v-model.number="b"
        type="number"
        placeholder="Enter second number"
      />

      <UButton @click="calculate">Calculate</UButton>

      <p>Result: {{ result }}</p>
    </UCard>
  </UForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const a = ref(0);
const b = ref(0);
const result = ref(0);
const { $operation } = useNuxtApp();

const opType = ref($operation.getType());

const calculate = () => {
  result.value = $operation.perform(a.value, b.value);
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

