import type { Workout } from "@/types/Workout";

export default function updateWorkout(
  oldWorkout: Workout,
  input: Partial<Workout>
): Workout {
  return {
    ...oldWorkout,
    initialTime: input.initialTime ?? oldWorkout.initialTime,
    ...input,
  };
}
