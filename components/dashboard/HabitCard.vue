<template>
  <div
    @click="editHabit"
    class="bg-salmon/20 p-4 rounded-lg flex justify-between transition-all hover:scale-98 active:scale-95 cursor-pointer"
    :class="[isCompleted ? '!bg-emerald-500/30' : '']"
  >
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
        class="circular-button aspect-square h-8 w-8"
        :disabled="loading || isCompleted"
        :class="[isCompleted ? 'hidden' : '']"
      >
        <div v-if="isCompleted" class="w-8 h-8" />
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

const editHabit = async () => {
  router.push(`/habits/edit/${props.habit.id}`);
};
</script>

<style scoped></style>
