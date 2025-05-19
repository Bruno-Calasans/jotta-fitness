import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export default function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      {/* Selected Rows */}
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
      </div> */}

      <div className="flex items-center space-x-6 lg:space-x-8 justify-between w-full">
        {/* Rows number info */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-bold">
            Total de registros: {table.getRowCount()}
          </p>
        </div>

        {/* Show rows per page */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Linhas por página</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {/* Pages Info */}
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>

          {/* Page buttons */}
          <div className="flex items-center space-x-2">
            {/* First page button */}
            <Button
              variant="outline"
              className="h-8 w-8 p-0 lg:flex bg-black"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              title="Ir para página inicial"
            >
              <span className="sr-only">Primeira página</span>
              <ChevronsLeft />
            </Button>

            {/* Previous page button*/}
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-black"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              title="Página anterior"
            >
              <span className="sr-only">Página anterior</span>
              <ChevronLeft />
            </Button>

            {/* Next page button */}
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-black"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              title="Próxima página"
            >
              <span className="sr-only">Próxima</span>
              <ChevronRight />
            </Button>

            {/* Last page button */}
            <Button
              variant="outline"
              className="h-8 w-8 p-0 lg:flex bg-black"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              title="Última página"
            >
              <span className="sr-only">Última</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
