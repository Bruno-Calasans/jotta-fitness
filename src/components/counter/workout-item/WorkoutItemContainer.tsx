import { cn } from "@/lib/utils";
import type { Workout } from "@/types/Workout";

type WorkoutItemContainerProps = {
  workout: Workout;
  children: React.ReactNode;
};

export default function WorkoutItemContainer({
  workout,
  children,
}: WorkoutItemContainerProps) {
  return (
    <div
      className={cn(
        "flex gap-1 bg-black text-orange-500 justify-between rounded-md p-2 hover:bg-black/60 group transition-all cursor-pointer mr-2 items-center delay-75",
        // When workout is paused
        !workout.running && "border-2 border-red-500"
      )}
    >
      {children}
    </div>
  );
}
