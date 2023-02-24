<template>
  <div class="bg-salmon/20 p-4 rounded-lg flex justify-between">
    <div>
      <h1 class="text-lg text-purple font-bold">
        {{ habit.name }}
      </h1>
      <h3>{{ habit.description }}</h3>
    </div>
    <button @click="deleteHabit()">
      {{ !loading ? "Delete" : "Loading..." }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useHabitsStore } from "~~/stores/habits";
import { HabitObject } from "~~/stores/habitsTypes";

const loading = ref(false);

const habits = useHabitsStore();
const props = defineProps<{ habit: HabitObject }>();

const deleteHabit = async () => {
  loading.value = true;
  try {
    await habits.deleteHabit(props.habit.id);
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
  loading.value = false;
};
</script>

<style scoped></style>
