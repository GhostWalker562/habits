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

type CompletionResponse = {
  id: string;
  habit_id: string;
  created_at: Date;
};

export { InsertHabit, HabitResponse, CompletionResponse };
