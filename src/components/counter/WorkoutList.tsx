"use client";

import WorkoutItem, { Workout } from "./WorkoutItem";

type WorkoutListProps = {
  title: string;
  workouts: Workout[];
};

export default function WorkoutList({ title, workouts }: WorkoutListProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Title */}
      <p className="text-lg text-left font-bold">{title}</p>
      {/* Workouts */}
      <div className="flex flex-col gap-3 w-full scrollbar-thumb-stone-900 scrollbar-track-stone-700 h-80 overflow-y-scroll scrollbar-thin">
        {workouts.length > 0 &&
          workouts.map((workout, index) => (
            // Content
            <WorkoutItem key={workout.name + index} workout={workout} />
          ))}
      </div>
    </div>
  );
}
