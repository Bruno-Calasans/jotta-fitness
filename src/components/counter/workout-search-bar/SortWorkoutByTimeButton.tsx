import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWorkoutStore } from "@/store/workoutStore";
import { ClockArrowDown, ClockArrowUp } from "lucide-react";
import { useState } from "react";

type SortType = "asc" | "desc";

export default function SortWorkoutByTimeButton() {
  const { sortWorkoutsByTime } = useWorkoutStore();
  const [timeSortType, setTimeSortType] = useState<SortType>("desc");

  const toggleTimeSortType = () => {
    if (timeSortType === "asc") {
      setTimeSortType("desc");
      sortWorkoutsByTime("desc");
    } else {
      setTimeSortType("asc");
      sortWorkoutsByTime("asc");
    }
  };
  return (
    <Button
      onClick={toggleTimeSortType}
      title={
        timeSortType === "asc"
          ? "Ordenar maior tempo restante"
          : "Ordenar menor tempo restante"
      }
      size="icon"
      className={cn(
        "bg-orange-500 hover:bg-orange-600",
        timeSortType === "asc" && "bg-emerald-500 hover:bg-emerald-600",
      )}
    >
      {timeSortType === "asc" ? <ClockArrowDown /> : <ClockArrowUp />}
    </Button>
  );
}
