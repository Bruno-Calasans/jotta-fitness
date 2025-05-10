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
  HandCoins
} from "lucide-react";

export const DashboardSidebarItems = {
  Principal: [
    {
      title: "Registro Diário",
      url: "diary-log",
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
    {
      title: "Adesão",
      url: "adhesion",
      icon: HandCoins,
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
  Usuários: [
    {
      title: "Membros",
      url: "members",
      icon: User,
    },
    {
      title: "Staff",
      url: "staff",
      icon: ShieldUser,
    },
  ],
};
