import {
  CircleDollarSign,
  HandPlatter,
  Package,
  User,
  BanknoteArrowDown,
  ShieldUser,
  CalendarCheck,
  Calendar1,
  CalendarDays,
} from "lucide-react";

export const registerItems = [
  {
    title: "Registro Diário",
    url: "diary-register",
    icon: CalendarCheck,
  },
  {
    title: "Registro Mensal",
    url: "mothly-register",
    icon: Calendar1,
  },
  {
    title: "Registro Anual",
    url: "yearly-register",
    icon: CalendarDays,
  },
];

export const profitItems = [
  {
    title: "Produtos",
    url: "products",
    icon: Package,
  },
  {
    title: "Serviços",
    url: "services",
    icon: HandPlatter,
  },
];

export const lossItems = [
  {
    title: "Despesas",
    url: "expensives",
    icon: BanknoteArrowDown,
  },
  {
    title: "Investimentos",
    url: "investiments",
    icon: CircleDollarSign,
  },
];

export const memberItems = [
  {
    title: "Alunos",
    url: "users",
    icon: User,
  },
  {
    title: "Staff",
    url: "staff",
    icon: ShieldUser,
  },
];
