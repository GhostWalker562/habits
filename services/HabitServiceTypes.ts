type InsertHabit = {
  uid: string;
  name: string;
  description: string;
  frequency: number;
};

type HabitResponse = {
  id: string;
  description: string;
  frequency: number;
  name: string;
};

export { InsertHabit, HabitResponse };
