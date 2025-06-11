"use client";

import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  compareByDateAsc,
  compareByDateDesc,
  compareByTimeAsc,
  compareByTimeDesc,
} from "./workoutStoreUtils";
import type { Workout } from "@/types/Workout";
import createWorkout from "@/utils/createWorkout";
import updateWorkout from "@/utils/updateWorkout";

interface WorkoutState {
  running: boolean;
  searchedWorkout: string;
  selectedWorkout: Workout | null;
  workouts: Workout[];
  updates: number;
  addWorkout(input: Partial<Workout>): void;
  removeWorkout(workoutId: string): void;
  editWorkout(workout: Workout, data: Partial<Workout>): void;
  updateWorkout(id: string, input: Partial<Workout>): void;
  finishWorkout(workoutId: string): void;
  clearWorkouts(): void;
  getGoingOnWorkouts(): Workout[];
  getFinishedWorkouts(): Workout[];
  sortWorkoutsByDate(order: "asc" | "desc"): void;
  sortWorkoutsByTime(order: "asc" | "desc"): void;
  setSearchedWorkout(keyword: string): void;
  searchWorkouts(type: "ongoing" | "finished" | "all"): Workout[];
  playWorkout(id: string): void;
  stopWorkout(id: string): void;
  setSelectedWorkout: (workout: Workout | null) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  devtools(
    persist(
      (set, get) => ({
        running: false,
        searchedWorkout: "",
        selectedWorkout: null,
        workouts: [],
        updates: 0,
        setSelectedWorkout(workout) {
          set(() => ({
            selectedWorkout: workout,
          }));
        },
        addWorkout(input) {
          const workout = createWorkout(input);
          set((state) => ({
            workouts: [...get().workouts, workout],
            updates: state.updates + 1,
          }));
        },
        removeWorkout(workoutId) {
          const filtedWorkouts = get().workouts.filter(
            (w) => w.id != workoutId,
          );
          set((state) => ({
            workouts: filtedWorkouts,
            updates: state.updates + 1,
          }));
        },
        editWorkout(workout, data) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === workout.id) {
              const newWorkout: Workout = { ...workout, ...data };
              return newWorkout;
            }
            return w;
          });
          set(() => ({ workouts: updatedWorkouts }));
        },
        clearWorkouts() {
          set((state) => ({ workouts: [], updates: state.updates + 1 }));
        },
        getGoingOnWorkouts() {
          return get().workouts.filter((w) => !w.finished);
        },
        getFinishedWorkouts() {
          return get().workouts.filter((w) => w.finished);
        },
        updateWorkout(id, input) {
          const updatedWorkouts = get().workouts.map((workout) => {
            if (workout.id === id) {
              return updateWorkout(workout, input);
            }
            return workout;
          });
          set((state) => ({
            workouts: updatedWorkouts,
            updates: state.updates + 1,
          }));
        },
        sortWorkoutsByDate(order) {
          if (order == "asc") {
            const sortedWorkouts = get().workouts.sort(compareByDateAsc);
            set((state) => ({
              workouts: sortedWorkouts,
              updates: state.updates + 1,
            }));
          } else {
            const sortedWorkouts = get().workouts.sort(compareByDateDesc);
            set((state) => ({
              workouts: sortedWorkouts,
              updates: state.updates + 1,
            }));
          }
        },
        sortWorkoutsByTime(order) {
          if (order == "asc") {
            const sortedWorkouts = get().workouts.sort(compareByTimeAsc);
            set((state) => ({
              workouts: sortedWorkouts,
              updates: state.updates + 1,
            }));
          } else {
            const sortedWorkouts = get().workouts.sort(compareByTimeDesc);
            set((state) => ({
              workouts: sortedWorkouts,
              updates: state.updates + 1,
            }));
          }
        },
        finishWorkout(workoutId) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === workoutId) {
              return { ...w, finished: true };
            }
            return w;
          });
          set(() => ({ workouts: updatedWorkouts }));
        },
        setSearchedWorkout(keyword) {
          set(() => ({ searchedWorkout: keyword }));
        },
        searchWorkouts(type) {
          const keyword = get().searchedWorkout;
          let workouts = get().workouts;

          if (type == "ongoing") workouts = get().getGoingOnWorkouts();
          if (type === "finished") workouts = get().getFinishedWorkouts();

          return keyword != ""
            ? workouts.filter((w) =>
                w.name.toLowerCase().includes(keyword.toLowerCase()),
              )
            : workouts;
        },
        playWorkout(id) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === id) {
              return { ...w, running: true };
            }
            return w;
          });
          set((state) => ({
            workouts: updatedWorkouts,
            updates: state.updates + 1,
          }));
        },
        stopWorkout(id) {
          const updatedWorkouts = get().workouts.map((w) => {
            if (w.id === id) {
              return { ...w, running: false };
            }
            return w;
          });
          set((state) => ({
            workouts: updatedWorkouts,
            updates: state.updates + 1,
          }));
        },
      }),
      {
        name: "workout-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
