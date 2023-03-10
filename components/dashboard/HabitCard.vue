<template>
  <div class="bg-salmon/20 p-4 rounded-lg flex justify-between">
    <div>
      <h1 class="text-lg text-purple font-bold">
        {{ habit.name }}
      </h1>
      <h3>{{ habit.description }}</h3>
    </div>
    <div class="flex space-x-2 items-center">
      <button
        v-if="!loading"
        @click="completeHabit"
        class="circular-button aspect-square"
        :disabled="loading || isCompleted"
        :class="[isCompleted ? '!bg-emerald-500' : '']"
      >
        <CheckIcon v-if="isCompleted" class="w-6 h-6" />
        <div v-else class="w-6 h-6"></div>
      </button>
      <div v-else>Completing...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";
import { useHabitsStore } from "~~/stores/habits";
import { HabitObject } from "~~/stores/habitsTypes";

const loading = ref(false);

const habits = useHabitsStore();
const router = useRouter();
const props = defineProps<{ habit: HabitObject }>();

const isCompleted = computed(() => habits.isCompleted(props.habit.id));

const completeHabit = async () => {
  loading.value = true;
  try {
    await habits.completeHabit(props.habit.id);
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
  loading.value = false;
};

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
