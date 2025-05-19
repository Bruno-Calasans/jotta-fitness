import type { Investment } from "@/types/Investment.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";

export const INVESTIMENT_DATA: Investment[] = [
  {
    ...generateDefaultDbFields(),
    name: "Produtos de Limpeza",
  },
  {
    ...generateDefaultDbFields(),
    name: "Lâmpadas",
  },
];
