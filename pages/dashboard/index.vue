<template>
  <LayoutRoundedPage>
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold">Welcome {{ username }}!</h1>
    </div>

    <h2 class="text-lg">Start your day with a challenge</h2>

    <div class="mt-4">
      <template v-if="loading">
        <div class="center flex-col space-y-8 py-40">
          <h1 class="text-2xl font-bold">Loading...</h1>
        </div>
      </template>
      <template v-else-if="habits.items.length > 0">
        <div class="space-y-4">
          <div class="max-w-2xl grid grid-cols-3 gap-4">
            <DashboardMetricCard
              title="Today"
              :value="uncompletedItems"
              v-motion-slide-left
            >
              <CalendarDaysIcon />
            </DashboardMetricCard>
            <DashboardMetricCard
              title="Finished"
              :value="completedItems"
              v-motion-slide-left
            >
              <CheckCircleIcon />
            </DashboardMetricCard>
            <DashboardMetricCard
              title="Points"
              :value="points"
              v-motion-slide-left
            >
              <CurrencyDollarIcon />
            </DashboardMetricCard>
          </div>

          <div class="space-y-4">
            <DashboardHabitCard
              v-for="(e, i) in habits.items"
              :habit="e"
              v-motion
              :initial="{
                scale: 2,
                y: 100,
                opacity: 0,
              }"
              :enter="{
                scale: 1,
                y: 0,
                opacity: 1,
                transition: {
                  delay: 50 * i,
                },
              }"
            />
          </div>

          <div>
            <NuxtLink to="/habits/create">
              <button class="primary-button !px-8 !py-2">Create Habit</button>
            </NuxtLink>
          </div>
        </div>
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
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";

import { useHabitsStore } from "~~/stores/habits";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const habits = useHabitsStore();

const loading = ref(true);
const username = ref("Anon");

const uncompletedItems = computed(
  () => habits.items.filter((e) => !habits.isCompleted(e.id)).length
);

const completedItems = computed(
  () => habits.items.filter((e) => habits.isCompleted(e.id)).length
);

const points = computed(() => habits.points);

async function fetchProfile() {
  loading.value = true;
  if (user.value == null) return "User does not exist";
  const { data, error } = await supabase
    .from("profiles")
    .select(`username`)
    .eq("id", user.value.id)
    .single();

  if (error) {
    alert(error.message);
  } else {
    username.value = data?.username || "";
  }

  loading.value = false;
}

onMounted(async () => {
  loading.value = true;

  try {
    await fetchProfile();
    await useHabitsStore().refresh();
  } catch (error) {}
  loading.value = false;
});
</script>

<style scoped></style>
