import { Workout } from "@/types/Workout";

export const compareByDateDesc = (workoutA: Workout, workoutB: Workout) => {
  if (workoutA.createdAt < workoutB.createdAt) {
    return -1;
  }
  if (workoutA.createdAt > workoutB.createdAt) {
    return 1;
  }
  return 0;
};

export const compareByDateAsc = (workoutA: Workout, workoutB: Workout) => {
  if (workoutA.createdAt < workoutB.createdAt) {
    return 1;
  }
  if (workoutA.createdAt > workoutB.createdAt) {
    return -1;
  }
  return 0;
};

export const compareByTimeDesc = (workoutA: Workout, workoutB: Workout) => {
  if (workoutA.time < workoutB.time) {
    return -1;
  }
  if (workoutA.time > workoutB.time) {
    return 1;
  }
  return 0;
};

export const compareByTimeAsc = (workoutA: Workout, workoutB: Workout) => {
  if (workoutA.time < workoutB.time) {
    return 1;
  }
  if (workoutA.time > workoutB.time) {
    return -1;
  }
  return 0;
};
