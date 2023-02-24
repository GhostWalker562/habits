<template>
  <LayoutRoundedPage>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold">Welcome Anon!</h1>
      <NuxtLink to="/habits/create">
        <button class="primary-button !px-8 !py-2">Create Habit</button>
      </NuxtLink>
    </div>
    <div class="mt-4 space-y-4">
      <template v-if="habits.items.length > 0">
        <DashboardHabitCard v-for="(e, i) in habits.items" :habit="e">
        </DashboardHabitCard>
      </template>
      <template v-else>
        <div class="center flex-col space-y-8 py-40">
          <img src="~~/assets/images/lifestyle.png" class="h-40" />
          <h1 class="text-2xl font-bold">
            You have no habits. Let's create one!
          </h1>
          <NuxtLink to="/habits/create">
            <button class="primary-button !px-8 !py-2">Create Habit</button>
          </NuxtLink>
        </div>
      </template>
    </div>
  </LayoutRoundedPage>
</template>

<script setup lang="ts">
import { useHabitsStore } from "~~/stores/habits";

const habits = useHabitsStore();

onMounted(() => {
  useHabitsStore().refresh();
});
</script>

<style scoped></style>
