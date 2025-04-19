import { Member } from "@/types/Member.type";
import { v4 } from "uuid";
import { PLANS_DATA } from "./PLANS_DATA";

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

function createDayAfterDate(date: Date, days: number) {
  const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000 );
  return newDate;
}

const sequentialDates = createSequentialDate();

export const MEMBERS_DATA: Member[] = [
  {
    id: v4(),
    name: "James",
    phone: "81 9 12345678",
    plan: PLANS_DATA[0],
    role: null,
    payments: {
      plans: [
        {
          id: v4(),
          createdAt: sequentialDates[0],
          updatedAt: sequentialDates[0],
          amount: 1,
          createdBy: {
            id: v4(),
            name: "Carlos",
            phone: "81 9 12345678",
            plan: PLANS_DATA[1],
            role: null,
            payments: null,
            createdAt: sequentialDates[0],
            updatedAt: sequentialDates[0],
          },
          plan: PLANS_DATA[0],
          startsIn: new Date(),
          expiresIn: createDayAfterDate(new Date(), 10),
        },
      ],
      products: [],
    },
    createdAt: sequentialDates[0],
    updatedAt: sequentialDates[0],
  },
  {
    id: v4(),
    name: "Carlos",
    phone: "81 9 12345678",
    plan: PLANS_DATA[1],
    role: null,
    payments: null,
    createdAt: sequentialDates[0],
    updatedAt: sequentialDates[0],
  },
  {
    id: v4(),
    name: "Jota",
    phone: "81 9 12345678",
    plan: PLANS_DATA[4],
    role: null,
    payments: null,
    createdAt: sequentialDates[0],
    updatedAt: sequentialDates[0],
  },
  {
    id: v4(),
    name: "Frederico",
    phone: "81 9 12345678",
    plan: PLANS_DATA[2],
    role: null,
    payments: null,
    createdAt: sequentialDates[0],
    updatedAt: sequentialDates[0],
  },
  {
    id: v4(),
    name: "Amanda",
    phone: "81 9 12345678",
    plan: null,
    role: {
      id: "123123",
      createdAt: sequentialDates[0],
      updatedAt: sequentialDates[0],
      name: "Admin",
      permissions: [
        {
          id: "123123",
          createdAt: sequentialDates[0],
          updatedAt: sequentialDates[0],
          actions: ["all"],
          resource: "all",
        },
      ],
    },
    payments: null,
    createdAt: sequentialDates[0],
    updatedAt: sequentialDates[0],
  },
];
