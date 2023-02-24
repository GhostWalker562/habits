import { defineStore } from "pinia";
import { HabitService } from "~~/services/HabitService";
import { HabitObject } from "./habitsTypes";

export const useHabitsStore = defineStore("habits", {
  state: (): any => ({
    items: [],
  }),
  actions: {
    async createHabit(props: {
      name: string;
      description: string;
      frequency: number;
    }) {
      try {
        await HabitService.createHabit(props);
        this.items.push(props as HabitObject);
      } catch (error) {
        throw error;
      }
    },
    async refresh() {
      try {
        const habits = await HabitService.getHabits();
        this.items = [];
        habits.forEach((e) => {
          this.items.push({ ...e, completions: [] } as HabitObject);
        });
      } catch (error) {
        throw error;
      }
    },
  },
});
