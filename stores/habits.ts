import { defineStore } from "pinia";
import { HabitService } from "~~/services/HabitService";
import { HabitObject } from "./habitsTypes";

export const useHabitsStore = defineStore("habits", {
  state: (): {
    items: HabitObject[];
  } => ({
    items: [],
  }),
  actions: {
    getHabit(id: string) {
      return this.items.find((e) => e.id === id);
    },
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
    async updateHabit(props: {
      id: string;
      name: string;
      description: string;
      frequency: number;
    }) {
      try {
        await HabitService.updateHabit(props);
        // Edit the item in the items
        this.items = this.items.filter((e) => e.id !== props.id);
        this.items.push(props as HabitObject);
      } catch (error) {
        throw error;
      }
    },
    async deleteHabit(id: string) {
      try {
        await HabitService.deleteHabit({ id });
        this.items = this.items.filter((e) => e.id !== id);
      } catch (error) {
        throw error;
      }
    },
    async refresh() {
      try {
        const habits = await HabitService.getHabits();
        this.items = [];
        habits.forEach((e) => {
          this.items.push({
            ...e,
            id: e.id.toString(),
            completions: [],
          } as HabitObject);
        });
      } catch (error) {
        throw error;
      }
    },
  },
});
