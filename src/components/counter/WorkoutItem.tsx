"use client";

import { Pencil, Trash2, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import useSound from "use-sound";
import type { Workout } from "@/types/Workout";
import { useStore } from "zustand";
import workoutStore from "@/store/workoutStore";
import { cn } from "@/lib/utils";

type WorkoutProps = {
  workout: Workout;
  minTimeToTimeout?: number;
  maxTimeAfterTimeout?: number;
};

const msToMinute = 60000;
const minTimeToWarning = 5;

export default function WorkoutItem({
  workout,
  minTimeToTimeout = 0,
  maxTimeAfterTimeout = 6,
}: WorkoutProps) {
  const {
    selectedWorkout,
    finishWorkout,
    removeWorkout,
    selectWorkout,
    updateWorkoutTime,
  } = useStore(workoutStore);

  const [play] = useSound("/sounds/timeout.wav", { volume: 1 });

  useEffect(() => {
    // Stops the workout if it's editing it
    if (selectedWorkout && selectedWorkout.id === workout.id) return;

    // Timeout
    if (workout.time <= minTimeToTimeout && !workout.finished) {
      finishWorkout(workout);
      play({
        playbackRate: 1.1,
      });
    }

    // Remover workout automatically
    if (workout.finished && workout.time === maxTimeAfterTimeout)
      removeWorkout(workout);

    const timer = setInterval(() => {
      let newTime = 0;
      // forward counter
      if (workout.finished) {
        newTime = workout.time + 1;
        // setLeftTime(newTime);
      }
      // backward counter
      else {
        newTime = workout.time - 1;
        // setLeftTime(newTime);
      }

      updateWorkoutTime(workout.id, newTime);
    }, msToMinute);

    return () => clearInterval(timer);
  }, [workout.time, selectedWorkout]);

  return (
    <div className="flex gap-1 bg-black text-orange-500 justify-between rounded-md p-2 hover:bg-black/60 group transition-all cursor-pointer mr-2 items-center delay-75">
      {/* Name */}
      <p className="font-bold group-hover:text-white text-lg flex-1">
        {workout.name}
      </p>
      {/* Left time */}

      {/*  */}
      {workout.finished ? (
        <p className="text-red-500 group-hover:text-white flex-1 text-end">
          {workout.time} min atrás
        </p>
      ) : (
        <p
          className={cn(
            "text-emerald-500 group-hover:text-white flex-1 text-end",
            workout.time <= minTimeToWarning && "text-red-500"
          )}
        >
          {workout.time} min restantes
        </p>
      )}
      {/* Dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <p className="text-white hover:text-orange-500">
            <EllipsisVertical />
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          {!!!workout.finished && (
            <DropdownMenuItem
              onClick={() => selectWorkout(workout)}
              className="cursor-pointer"
            >
              <Pencil />
              Editar
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => removeWorkout(workout)}
            className="text-red-500 focus:text-red-600 hover:text-red-600 cursor-pointer"
          >
            <Trash2 />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
