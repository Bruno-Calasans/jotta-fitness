import type { Plan } from "@/types/Plan.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";

export const PLANS_DATA: Plan[] = [
  {
    ...generateDefaultDbFields(),
    name: "Plano 1h",
    price: 50,
    trainTime: 60,
    diary: 10,
  },
  {
    ...generateDefaultDbFields(),
    name: "Plano 1h30m",
    price: 70,
    trainTime: 70,
    diary: 25,
  },
  {
    ...generateDefaultDbFields(),
    name: "Plano 2h",
    price: 80,
    trainTime: 120,
    diary: 35,
  },
  {
    ...generateDefaultDbFields(),
    name: "Acima 2h",
    price: 100,
    trainTime: 999,
    diary: 40,
  },
];
