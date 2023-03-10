import { CompletionResponse, HabitResponse } from "./HabitServiceTypes";

export class PointService {
  static async getPoints(): Promise<number> {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    const { data, error: retrieveError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.value!.id)
      .single();

    if (retrieveError) throw retrieveError;

    return (data as any).points;
  }

  static async incrementPoint() {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    let points: number = await this.getPoints();

    const update = {
      id: user.value!.id,
      points: ++points,
    };

    console.log(points);

    let { error } = await supabase
      .from("profiles")
      .update(
        update as never,
        {
          returning: "minimal",
        } as any
      )
      .eq("id", user.value!.id);

    console.log(error);

    if (error) throw error;
  }
}
