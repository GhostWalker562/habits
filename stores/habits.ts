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
    isCompleted(id: string) {
      const habit = this.items.find((e) => e.id === id);
      if (!habit) return false;
      return habit.completions.some(
        (e) => e.toDateString() === new Date().toDateString()
      );
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
    async completeHabit(id: string) {
      try {
        await HabitService.completeHabitForDay(id);

        this.items
          .find((f) => f.id === id.toString())
          ?.completions.push(new Date());
      } catch (error) {
        throw error;
      }
    },
    async refresh() {
      try {
        this.items = [];

        const habits = await HabitService.getHabits();
        habits.forEach((e) => {
          this.items.push({
            ...e,
            id: e.id.toString(),
            completions: [],
          } as HabitObject);
        });

        const completions = await HabitService.getCompletions(
          habits.map((e) => e.id)
        );

        completions.forEach((e) => {
          this.items
            .find((f) => f.id === e.habit_id.toString())
            ?.completions.push(new Date(e.created_at));
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
});
