<template>
  <div>
    <h3 class="font-medium mb-2">{{ label }}</h3>
    <input
      :value="modelValue"
      :type="type"
      class="border py-2 px-4 rounded-md max-w-lg w-full"
      :placeholder="placeholder"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  placeholder: string;
  type?: string;
  modelValue?: string;
}>();
defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
