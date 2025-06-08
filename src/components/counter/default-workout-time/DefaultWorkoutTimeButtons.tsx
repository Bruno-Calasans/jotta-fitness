import { Button } from "@/components/ui/button";
import { DEFAULT_WORKOUT_TIME_DATA } from "./DEFAULT_WORKOUT_TIME_DATA";

type DefaultWorkoutTimeButtonsProps = {
  onAddTime: (time: number) => void;
  onRemoveTime: (time: number) => void;
};

export default function DefaultWorkoutTimeButtons({
  onAddTime,
  onRemoveTime,
}: DefaultWorkoutTimeButtonsProps) {
  return (
    <div className="flex flex-col gap-2 justify-between">
      {/* Add time */}
      <div className="flex gap-1 justify-between">
        {DEFAULT_WORKOUT_TIME_DATA.add.map(({ label, value }) => (
          <Button
            key={label}
            onClick={() => onAddTime(value)}
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600 p-2 items-center justify-center"
            type="button"
          >
            {label}
          </Button>
        ))}
      </div>
      {/* Remove time */}
      <div className="flex gap-1 justify-between">
        {DEFAULT_WORKOUT_TIME_DATA.remove.map(({ label, value }) => (
          <Button
            key={label}
            onClick={() => onRemoveTime(value)}
            size="sm"
            className="bg-red-500 hover:bg-red-600 p-2 items-center justify-center"
            type="button"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
