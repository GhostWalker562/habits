<template>
  <LayoutRoundedPage>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold">Welcome Anon!</h1>
      <NuxtLink to="/habits/create">
        <button class="primary-button !px-8 !py-2">Create Habit</button>
      </NuxtLink>
    </div>
    <div class="mt-4 space-y-4">
      <div v-for="(e, i) in habits.items" class="bg-salmon/20 p-4 rounded-lg">
        <h1 class="text-lg text-purple font-bold">
          {{ e.name }}
        </h1>
        <h3>{{ e.description }}</h3>
      </div>
    </div>
  </LayoutRoundedPage>
</template>

<script setup lang="ts">
import { useHabitsStore } from "~~/stores/habits";

const habits = useHabitsStore();
const user = useSupabaseClient();

onMounted(() => {
  useHabitsStore().refresh();
});
</script>

<style scoped></style>
