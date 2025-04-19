import type { Plan } from "@/types/Plan.type";
import { v4 } from "uuid";

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

export const PLANS_DATA: Plan[] = [
  {
    id: v4(),
    name: "Plano 1h",
    price: 50,
    trainTime: 60,
    createdAt: sequentialDates[0],
    updatedAt: sequentialDates[0],
  },
  {
    id: v4(),
    name: "Plano 1h30m",
    price: 70,
    trainTime: 90,
    createdAt: sequentialDates[1],
    updatedAt: sequentialDates[1],
  },
  {
    id: v4(),
    name: "Plano 2h",
    price: 80,
    trainTime: 120,
    createdAt: sequentialDates[2],
    updatedAt: sequentialDates[2],
  },
  {
    id: v4(),
    name: "Plano 3h",
    price: 80,
    trainTime: 120,
    createdAt: sequentialDates[3],
    updatedAt: sequentialDates[3],
  },
  {
    id: v4(),
    name: "Plano 4h",
    price: 80,
    trainTime: 120,
    createdAt: sequentialDates[4],
    updatedAt: sequentialDates[4],
  },
];
