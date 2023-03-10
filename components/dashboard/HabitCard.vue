<template>
  <div class="flex items-center space-x-4">
    <div
      @click="editHabit"
      class="bg-salmon/20 p-4 rounded-lg flex justify-between transition-all hover:scale-98 active:scale-95 cursor-pointer w-full"
      :class="[
        isCompleted ? 'bg-gradient-to-r from-purple-800 to-purple-600' : '',
      ]"
    >
      <div :class="[isCompleted ? '!text-white' : '']">
        <h1 class="text-lg font-bold !text-white">
          {{ habit.name }}
        </h1>
        <h3 class="opacity-70">
          {{ habit.description }}
        </h3>
      </div>
      <div
        class="flex space-x-4 items-center"
        v-if="streaks > 0"
        :class="[isCompleted ? '!text-white' : '']"
      >
        <div
          class="mx-4 text-xl font-bold bg-purple-400/10 rounded-lg px-4 py-2"
        >
          🔥 {{ streaks }}
        </div>

        <div
          class="mx-4 text-xl font-medium bg-purple-400/10 rounded-lg px-4 py-2"
        >
          🚀 Goal: {{ daysCompletedInTheWeek }} / {{ habit.frequency }}
        </div>
      </div>
    </div>
    <button
      v-if="!loading && !isCompleted"
      @click="completeHabit"
      class="circular-button aspect-square h-12"
      :disabled="loading || isCompleted"
      :class="[isCompleted ? 'hidden' : '']"
    ></button>
    <div v-else-if="!isCompleted">Completing...</div>
  </div>
</template>

<script setup lang="ts">
import {
  findMostRecentConsecutiveDays,
  getDatesInCurrentWeek,
} from "~~/helpers/dateHelpers";
import { useHabitsStore } from "~~/stores/habits";
import { HabitObject } from "~~/stores/habitsTypes";

const loading = ref(false);

const habits = useHabitsStore();
const router = useRouter();
const props = defineProps<{ habit: HabitObject }>();

const isCompleted = computed(() => habits.isCompleted(props.habit.id));
const streaks = computed(() =>
  findMostRecentConsecutiveDays(props.habit.completions)
);

const daysCompletedInTheWeek = computed(
  () => getDatesInCurrentWeek(props.habit.completions).length
);

const completeHabit = async () => {
  loading.value = true;
  try {
    await habits.completeHabit(props.habit.id);
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
