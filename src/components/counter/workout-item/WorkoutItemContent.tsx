import { BUSINESS_RULES } from "@/config/BusinessRules";
import { cn } from "@/lib/utils";
import type { Workout } from "@/types/Workout";

type WorkoutItemContentProps = {
  workout: Workout;
};

export default function WorkoutItemContent({
  workout,
}: WorkoutItemContentProps) {
  return (
    <>
      {/* Workout name */}
      <p className="font-bold group-hover:text-white text-lg uppercase">
        {workout.name}
      </p>

      {/* Workout Message */}
      {workout.finished ? (
        <p className="text-red-500 group-hover:text-white flex-1 text-end text-lg uppercase">
          {workout.time} min atrás
        </p>
      ) : (
        <p
          className={cn(
            "text-emerald-500 group-hover:text-white flex-1 text-end text-lg uppercase",
            // When workout is about to end
            workout.time <= BUSINESS_RULES.timeToWarningBeforeFinishes &&
              "text-red-500"
          )}
        >
          {workout.time} min restantes
        </p>
      )}
    </>
  );
}
