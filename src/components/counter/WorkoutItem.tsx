"use client";

import { Pencil, Trash2, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "./context/WorkoutContext";
import useSound from "use-sound";

export type Workout = {
  id: string;
  name: string;
  time: number;
  finished: boolean;
  createdAt: number;
};

type WorkoutProps = {
  workout: Workout;
  minTimeToTimeout?: number;
  maxTimeAfterTimeout?: number;
};

const msToMinute = 600;

export default function WorkoutItem({
  workout,
  minTimeToTimeout = 0,
  maxTimeAfterTimeout = 6,
}: WorkoutProps) {
  const { finishWorkout, removeWorkout, selectWorkout, updateWorkout } =
    useContext(WorkoutContext);

  const [leftTime, setLeftTime] = useState(workout.finished ? 0 : workout.time);
  const [play] = useSound("/sounds/timeout1.wav", { volume: 10 });

  useEffect(() => {
    // Timeout
    if (leftTime <= minTimeToTimeout && !workout.finished) {
      finishWorkout(workout);
      play({
        playbackRate: 1.1,
      });
    }

    // Remover workout automatically
    if (workout.finished && leftTime === maxTimeAfterTimeout)
      removeWorkout(workout);

    const timer = setInterval(() => {
      let newTime = 0;
      // forward counter
      if (workout.finished) {
        newTime = leftTime + 1;
        setLeftTime(newTime);
      }
      // backward counter
      else {
        newTime = leftTime - 1;
        setLeftTime(newTime);
      }

      // updateWorkout(workout.id, "time", newTime);'
    }, msToMinute);

    return () => clearInterval(timer);
  }, [leftTime]);

  return (
    <div className="flex gap-2 bg-black text-orange-500 justify-between rounded-md p-2 hover:bg-black/60 group transition-all cursor-pointer mr-2 items-center delay-75">
      {/* Name */}
      <p className="font-bold group-hover:text-white text-sm">{workout.name}</p>
      {/* Left time */}

      {/*  */}
      {workout.finished ? (
        <p className="text-red-500 group-hover:text-white ">
          {leftTime} min atrás
        </p>
      ) : (
        <p className="text-emerald-500 group-hover:text-white ">
          {leftTime} min restantes
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
