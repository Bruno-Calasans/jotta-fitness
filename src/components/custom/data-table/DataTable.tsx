"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import DataTablePagination from "./DataTablePagination";
import DataTableSearch from "./DataTableSearch";
import { cn } from "@/lib/utils";
import DataLoader from "@/components/custom/loaders/DataLoader";

type DataTableProps<TData, TValue> = {
  loading?: boolean;
  loadingMsg?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noResultMsg?: React.ReactNode;
  columnNameFilter?: string;
  startPageSize?: number;
  inputSearchPlaceholder?: string;
  noFoundRowsMsg?: string;
  onRowSelection?: (item: TData) => void;
};

export default function DataTable<TData, TValue>({
  loading,
  loadingMsg,
  columns,
  data,
  noResultMsg,
  columnNameFilter,
  startPageSize,
  inputSearchPlaceholder,
  noFoundRowsMsg,
  onRowSelection,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRow, setSelectedRow] = useState<Row<TData> | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
    initialState: {
      pagination: {
        pageSize: startPageSize || 10,
      },
    },
  });

  const selectionHandler = (row: Row<TData>) => {
    const item = row.original;
    if (onRowSelection) onRowSelection(item);
    setSelectedRow(row);
  };

  const tableHasRows = table.getRowModel().rows?.length > 0;
  const tableHasFilteredRows = columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-md border">
        {/* Component for searching */}
        <DataTableSearch
          table={table}
          columnName={columnNameFilter || "name"}
          placeholder={inputSearchPlaceholder || "Filtrar colunas"}
        />
        {/* Table itself */}
        <Table>
          <TableHeader className="bg-orange-500 hover:bg-orange-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-bold text-white bg-orange-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Loading State */}
            {loading && (
              <TableRow className="p-10">
                <TableCell
                  className="p-10"
                  rowSpan={table.getRowModel().rows.length}
                  colSpan={table._getColumnDefs().length}
                >
                  <DataLoader text={loadingMsg} />
                </TableCell>
              </TableRow>
            )}
            {/* No loading state with rows */}
            {!loading &&
              tableHasRows &&
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "cursor-pointer hover:bg-stone-600 transition-all",
                    // row.id === selectedRow?.id && "bg-stone-700"
                  )}
                  onClick={() => selectionHandler(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {/* No loading and filtered rows */}
            {!loading && !tableHasRows && tableHasFilteredRows && (
              // No rows
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noFoundRowsMsg || (
                    <p className="italic">
                      Nenhum resultado para{" "}
                      <span className="text-orange-500 font-bold">
                        {columnFilters[0].value as string}
                      </span>
                    </p>
                  )}
                </TableCell>
              </TableRow>
            )}

            {/* No loading state without rows */}
            {!loading && !tableHasRows && !tableHasFilteredRows && (
              // No rows
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noResultMsg || "Nada encontrado."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Component for pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
