import { Workout } from "@/components/counter/WorkoutItem";
import { WorkoutContext } from "@/components/counter/context/WorkoutContext";
import { useContext } from "react";

type useWorkoutProps = {};

export default function useWorkout() {
  const { workouts, setWorkouts } = useContext(WorkoutContext);

  const addWorkout = (workout: Workout) => {
    setWorkouts((w) => [...w, workout]);
  };

  const removeWorkout = (workout: Workout) => {
    const filtedWorkouts = workouts.filter((w) => w.name != workout.name);
    setWorkouts(() => filtedWorkouts);
  };

  const clearWorkouts = () => {
    setWorkouts([]);
  };

  return {
    workouts,
    addWorkout,
    removeWorkout,
    clearWorkouts,
  };
}
