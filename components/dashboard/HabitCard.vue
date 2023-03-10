<template>
  <div class="bg-salmon/20 p-4 rounded-lg flex justify-between">
    <div>
      <h1 class="text-lg text-purple font-bold">
        {{ habit.name }}
      </h1>
      <h3>{{ habit.description }}</h3>
    </div>
    <div class="flex space-x-2">
      <button @click="editHabit()">Edit</button>
      <button @click="deleteHabit()">
        <div v-if="!loading">Delete</div>
        <div v-else>Deleting...</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHabitsStore } from "~~/stores/habits";
import { HabitObject } from "~~/stores/habitsTypes";

const loading = ref(false);

const habits = useHabitsStore();
const router = useRouter();
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

const editHabit = async () => {
  router.push(`/habits/edit/${props.habit.id}`);
};
</script>

<style scoped></style>
