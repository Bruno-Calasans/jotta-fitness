import { Table } from "@tanstack/react-table";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";

type SearchDataTableProps<TData> = {
  table: Table<TData>;
  columnName: string;
  placeholder?: string;
};

export default function DataTableSearch<TData>({
  table,
  columnName,
  placeholder,
}: SearchDataTableProps<TData>) {
  return (
    <div className="flex items-center py-2 px-1">
      <Input
        type="search"
        placeholder={placeholder || "Filtrar colunas"}
        value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnName)?.setFilterValue(event.target.value)
        }
        className="flex border-none"
      />
      <Search />
    </div>
  );
}
