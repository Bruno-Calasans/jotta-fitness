import { useEffect } from "react";
import { Column } from "@tanstack/react-table";
import {
  ArrowDownAZ,
  ArrowDownZA,
  ArrowDown01,
  ArrowDown10,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

type DataTableSortableHeaderProps<Dtype> = {
  headerName: string;
  column: Column<Dtype>;
  type?: "text" | "numeral" | "date";
};

export default function DataTableSortableHeader<Dtype, T>({
  headerName,
  column,
  type = "text",
}: DataTableSortableHeaderProps<Dtype>) {
  useEffect(() => {
    if (column.getIsSorted() === false) column.toggleSorting(false);
  }, []);

  const isAsc = column.getIsSorted() === "asc";

  if (type === "numeral") {
    return (
      <div className="flex items-center gap-1">
        {headerName}{" "}
        <p
          className="cursor-pointer text-black hover:text-emerald-500 transition-all delay-75"
          onClick={() => column.toggleSorting(isAsc)}
          title={isAsc ? "Número Crescente" : "Número Decrescente"}
        >
          {isAsc ? <ArrowDown10 /> : <ArrowDown01 />}
        </p>
      </div>
    );
  }

  if (type === "date") {
    return (
      <div className="flex items-center gap-1">
        {headerName}{" "}
        <p
          className="cursor-pointer text-black hover:text-emerald-500 transition-all delay-75"
          onClick={() => column.toggleSorting(isAsc)}
          title={isAsc ? "Data Crescente" : "Data Decrescente"}
        >
          {isAsc ? <CalendarArrowDown /> : <CalendarArrowUp />}
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {headerName}{" "}
      <p
        className="cursor-pointer text-black hover:text-emerald-500 transition-all delay-75"
        onClick={() => column.toggleSorting(isAsc)}
        title={isAsc ? "Alfabeto Decrescente" : "Alfabeto Crescente"}
      >
        {isAsc ? <ArrowDownZA /> : <ArrowDownAZ />}
      </p>
    </div>
  );
}
