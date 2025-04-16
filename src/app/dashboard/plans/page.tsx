"use client";

import DataTable from "@/components/custom/DataTable";
import ContentContainer from "@/components/general/ContentContainer";
import {
  Column,
  ColumnDef,
  StringOrTemplateHeader,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowDown01,
  ArrowDown10,
  CalendarArrowDown,
  CalendarArrowUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect } from "react";

type DashboardPlansProps = {};

type Plan = {
  name: string;
  trainTime: number;
  price: number;
  createdAt: Date;
};

function createSequentialDate() {
  // Data inicial: agora
  const dataInicial = new Date();

  // Array para armazenar as datas
  const datas = [];

  // Criar 5 datas, cada uma 1 hora depois da anterior
  for (let i = 0; i < 5; i++) {
    // Criar nova data com base na inicial + i horas
    const novaData = new Date(dataInicial.getTime() + i * 60 * 60 * 1000);
    datas.push(novaData);
  }

  return datas;
}

const sequentialDates = createSequentialDate();

const DATA_PLANS: Plan[] = [
  { name: "Plano 1h", price: 50, trainTime: 60, createdAt: sequentialDates[0] },
  {
    name: "Plano 1h30m",
    price: 70,
    trainTime: 90,
    createdAt: sequentialDates[1],
  },
  {
    name: "Plano 2h",
    price: 80,
    trainTime: 120,
    createdAt: sequentialDates[2],
  },
  {
    name: "Plano 3h",
    price: 80,
    trainTime: 120,
    createdAt: sequentialDates[3],
  },
  {
    name: "Plano 4h",
    price: 80,
    trainTime: 120,
    createdAt: sequentialDates[4],
  },
  // {
  //   name: "Plano 5h",
  //   price: 80,
  //   trainTime: 120,
  //   createdAt: sequentialDates[5],
  // },
];

function createSortableHeader<Dtype, T>(
  headerName: string,
  column: Column<Dtype>,
  type: "text" | "numeral" | "date" = "text"
) {
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

export const columns: ColumnDef<Plan>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => createSortableHeader("Nome", column, "text"),
  },
  {
    accessorKey: "trainTime",
    header: ({ column }) =>
      createSortableHeader("Tempo de Treino", column, "numeral"),
  },
  {
    accessorKey: "price",
    header: ({ column }) => createSortableHeader("Preço", column, "numeral"),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) =>
      createSortableHeader("Data de Criação", column, "date"),
    cell: ({ row }) => {
      const plan = row.original;
      return <p>{plan.createdAt.toLocaleTimeString()}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const plan = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-orange-500 text-white group transition-all"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 group-hover:text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start"
              >
                <Trash className="h-4 w-4" />
                Excluir
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DashboardPlans({}: DashboardPlansProps) {
  return (
    <ContentContainer>
      <div className="text-4xl border-b-2 border-b-orange-500">Planos</div>
      <DataTable columns={columns} data={DATA_PLANS} />
    </ContentContainer>
  );
}
