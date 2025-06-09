import MoreOptionsDropdown from "@/components/custom/data-table/MoreOptionsDropdown";
import EditWorkoutDialog from "./EditWorkoutDialog";
import PlayPauseWorkoutButton from "./PlayPauseWorkoutButton";
import RemoveWorkoutDialog from "./RemoveWorkoutDialog";
import type { Workout } from "@/types/Workout";

type WorkoutItemActionsProps = { workout: Workout };

export default function WorkoutItemActions({
  workout,
}: WorkoutItemActionsProps) {
  return (
    <MoreOptionsDropdown
      classNames={{ trigger: "h-6 w-4 hover:bg-stone-400 p-0" }}
      position="vertical"
    >
      {!workout.finished && <EditWorkoutDialog workout={workout} />}
      {!workout.finished && <PlayPauseWorkoutButton workout={workout} />}
      <RemoveWorkoutDialog workout={workout} />
    </MoreOptionsDropdown>
  );
}
