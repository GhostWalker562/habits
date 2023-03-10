<template>
  <div class="bg-salmon/20 p-4 rounded-md flex items-center justify-between">
    <div class="flex items-center space-x-2 font-medium">
      <div class="h-8 w-8">
        <slot />
      </div>
      <span>
        {{ title }}
      </span>
    </div>
    <div class="text-2xl">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; value: number }>();
</script>

<style scoped></style>
