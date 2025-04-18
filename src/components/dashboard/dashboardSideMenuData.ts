import {
  CircleDollarSign,
  Package,
  User,
  BanknoteArrowDown,
  ShieldUser,
  CalendarCheck,
  Calendar1,
  CalendarDays,
  Dumbbell,
} from "lucide-react";

export const DashboardSidebarItems = {
  Principal: [
    {
      title: "Registro Diário",
      url: "diary-register",
      icon: CalendarCheck,
    },
    {
      title: "Resumo Mensal",
      url: "mothly-overview",
      icon: Calendar1,
    },
    {
      title: "Resumo Anual",
      url: "yearly-overview",
      icon: CalendarDays,
    },
  ],
  Lucro: [
    {
      title: "Produtos",
      url: "products",
      icon: Package,
    },
    {
      title: "Planos",
      url: "plans",
      icon: Dumbbell,
    },
  ],
  Prejuízo: [
    {
      title: "Despesas",
      url: "expenses",
      icon: BanknoteArrowDown,
    },
    {
      title: "Investimentos",
      url: "investments",
      icon: CircleDollarSign,
    },
  ],
  Membros: [
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
  ],
};
