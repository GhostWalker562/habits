<template>
  <LayoutRoundedPage class="flex flex-col">
    <h1 class="text-4xl font-bold">Create a Habit</h1>
    <div class="flex-1 py-4 space-y-4">
      <InputLabeled
        v-model="name"
        label="Habit Name"
        placeholder="Eating breakfast everyday"
        type="text"
        disabled
      />
      <InputLabeledMultiline
        v-model="description"
        label="Habit Description"
        placeholder="Eating breakfast everyday refers to the practice of consuming a meal in the morning, typically within a few hours of waking up. This meal is often considered the most important meal of
..."
      />
      <InputLabeled
        v-model="frequency"
        label="Frequency (out of 7 days)"
        placeholder="2"
        type="number"
      />
    </div>
    <button class="primary-button !px-8 !py-2 w-fit" @click="createHabit">
      <h3 v-if="!loading">Save and Create</h3>
      <div v-else>...</div>
    </button>
  </LayoutRoundedPage>
</template>

<script setup lang="ts">
import { useHabitsStore } from "~~/stores/habits";

const habits = useHabitsStore();
const router = useRouter();

const loading = ref(false);

const name = ref("");
const description = ref("");
const frequency = ref("");

const createHabit = async () => {
  loading.value = true;
  try {
    const insert = {
      name: name.value,
      description: description.value,
      frequency: frequency.value as any as number,
    };

    if (insert.name.length === 0) {
      throw new Error("Name cannot be empty");
    }

    if (insert.description.length === 0) {
      throw new Error("Description cannot be empty");
    }

    if (insert.frequency < 1 || insert.frequency > 7) {
      throw new Error("Frequency must be between 1 and 7");
    }

    await habits.createHabit({
      name: name.value,
      description: description.value,
      frequency: frequency.value as unknown as number,
    });
    router.push("/dashboard");
  } catch (error: any) {
    console.log(error);
    alert(error.error_description || error.message);
  }
  loading.value = false;
};
</script>

<style scoped></style>
