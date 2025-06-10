import type { Workout } from "@/types/Workout";
import { v4 as uuidv4 } from "uuid";

export default function createWorkout(input: Partial<Workout>) {
  return {
    id: uuidv4(),
    createdAt: Date.now(),
    initialTime: input.time || 0,
    finished: false,
    running: true,
    ...input,
  } as Workout;
}
