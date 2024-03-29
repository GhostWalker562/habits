<template>
  <LayoutRoundedPage class="flex flex-col">
    <h1 class="text-4xl font-bold">Create a Habit</h1>
    <div class="flex-1 py-4 space-y-4">
      <InputLabeled
        v-model="name"
        label="Habit Name"
        placeholder="Eating breakfast everyday"
        type="text"
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
    <div class="flex space-x-2">
      <button
        class="primary-button !px-8 !py-2 w-fit"
        @click="$router.push('/dashboard')"
      >
        Return
      </button>
      <button class="primary-button !px-8 !py-2 w-fit" @click="deleteHabit">
        <h3 v-if="!loading">Delete</h3>
        <div v-else>...</div>
      </button>
      <button class="primary-button !px-8 !py-2 w-fit" @click="editHabit">
        <h3 v-if="!loading">Save and Edit</h3>
        <div v-else>...</div>
      </button>
    </div>
  </LayoutRoundedPage>
</template>

<script setup lang="ts">
import { useHabitsStore } from "~~/stores/habits";

const { $modal } = useNuxtApp();

const habits = useHabitsStore();
const route = useRoute();
const router = useRouter();

const loading = ref(false);

const habitId = ref("");
const name = ref("");
const description = ref("");
const frequency = ref("");

const editHabit = async () => {
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

    await habits.updateHabit({
      id: habitId.value,
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

const deleteHabitAndRoute = async () => {
  try {
    await habits.deleteHabit(habitId.value);
    router.push("/dashboard");
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

const deleteHabit = async () => {
  loading.value = true;
  try {
    $modal.show({
      title: "Delete Habit",
      body: "Are you sure you want to delete this habit?",
      primary: {
        label: "Delete",
        action: deleteHabitAndRoute,
        theme: "red",
      },
      secondary: {
        label: "Cancel",
        action: () => {},
        theme: "white",
      },
    });
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
};

onMounted(() => {
  const habit = habits.getHabit(route.params.id as string);

  // If the habit is not found, we go back.
  if (!habit) return router.push("/dashboard");

  habitId.value = habit!.id;
  name.value = habit!.name;
  description.value = habit!.description;
  frequency.value = habit!.frequency.toString();
});
</script>

<style scoped></style>
