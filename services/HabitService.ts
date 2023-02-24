import { HabitResponse } from "./HabitServiceTypes";

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
