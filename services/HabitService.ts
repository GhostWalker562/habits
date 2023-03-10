import { CompletionResponse, HabitResponse } from "./HabitServiceTypes";

export class HabitService {
  static async createHabit(props: {
    name: string;
    description: string;
    frequency: number;
  }) {
    const { name, description, frequency } = props;

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    const insert = {
      uid: user.value!.id,
      name: name,
      description: description,
      frequency: frequency,
    };

    let { error } = await supabase.from("habits").insert(
      insert as any,
      {
        returning: "minimal",
      } as any
    );
    if (error) throw error;
  }

  static async updateHabit(props: {
    id: string;
    name: string;
    description: string;
    frequency: number;
  }) {
    const { id, name, description, frequency } = props;

    const supabase = useSupabaseClient();

    const update: any = {
      name: name,
      description: description,
      frequency: frequency,
    };

    let { error } = await supabase
      .from("habits")
      .update(
        update as never,
        {
          returning: "minimal",
        } as any
      )
      .eq("id", id);
    if (error) throw error;
  }

  static async completeHabitForDay(id: string) {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    let { error } = await supabase.from("habit_completions").insert(
      { habit_id: id, uid: user.value!.id } as any,
      {
        returning: "minimal",
      } as any
    );

    if (error) throw error;
  }

  static async getCompletions(id: string[]) {
    const supabase = useSupabaseClient();

    let { data, error } = await supabase
      .from("habit_completions")
      .select("*")
      .in("habit_id", id);

    if (error) throw error;

    return data as CompletionResponse[];
  }

  static async deleteHabit(props: { id: string }) {
    const { id } = props;

    const supabase = useSupabaseClient();

    let { error: habitCompletionError } = await supabase
      .from("habit_completions")
      .delete()
      .eq("habit_id", id);

    if (habitCompletionError) throw habitCompletionError;

    let { error: habitError } = await supabase
      .from("habits")
      .delete()
      .eq("id", id);
    if (habitError) throw habitError;
  }

  static async getHabits(): Promise<HabitResponse[]> {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    let { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("uid", user.value!.id);
    if (error) throw error;
    return data as HabitResponse[];
  }
}
