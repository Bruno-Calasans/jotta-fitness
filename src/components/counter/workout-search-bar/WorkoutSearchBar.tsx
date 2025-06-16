import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import ClearWorkoutsDialog from "./ClearWorkoutsDialog";
import SortWorkoutByDateButton from "./SortWorkoutByDateButton";
import SortWorkoutByTimeButton from "./SortWorkoutByTimeButton";

type WorkoutSearchBaProps = {
  onSearch: (keyword: string) => void;
};

export default function WorkoutSearchBar({ onSearch }: WorkoutSearchBaProps) {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 md:flex-row sm:flex-col">
        <Input
          className="bg-white text-orange-600 font-bold"
          type="search"
          placeholder="Pesquise por um treino"
          value={keyword}
          onChange={searchHandler}
        />

        {/* Sort buttons */}
        <div className="flex gap-1 items-center sm:justify-center">
          <SortWorkoutByTimeButton />
          <SortWorkoutByDateButton />
          <ClearWorkoutsDialog />
        </div>
      </div>

      {/* Search Result */}
      {keyword && (
        <div>
          <p className="text text-stone-400 italic">
            Resultados para &#34;{keyword}&#34;
          </p>
        </div>
      )}
    </div>
  );
}
