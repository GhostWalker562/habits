type InsertHabit = {
  uid: string;
  name: string;
  description: string;
  frequency: number;
};

type HabitResponse = {
  description: string;
  frequency: number;
  name: string;
};

export { InsertHabit, HabitResponse };
