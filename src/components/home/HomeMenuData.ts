import { BicepsFlexed, Dumbbell, PiggyBank, Salad } from "lucide-react";
import { PlanItemData } from "./PlanItem";
import { ServiceItemData } from "./ServiceItem";
import { BenefitItemData } from "./BenefitItem";

export const benefitsItems: BenefitItemData[] = [
  {
    title: "Equipamentos Modernos",
    desc: "Use equipamentos modernos e seguros.",
    icon: Dumbbell,
  },
  {
    title: "Plano de Nutrição Saudável",
    desc: "Temos nutricionistas especializados em dietas saudáveis.",
    icon: Salad,
  },
  {
    title: "Personal Capacitado",
    desc: "Não sabe fazer algum exercício? Não se preocupe, você será auxiliado por professionais capacitados.",
    icon: BicepsFlexed,
  },
  {
    title: "Preço Acessíveis",
    desc: "Temos planos que cabem no seu bolso e para o seu tipo de perfil.",
    icon: PiggyBank,
  },
];

export const serviceItems: ServiceItemData[] = [
  {
    title: "Musculação",
    desc: "Cresça seus músculos e fique forte.",
    url: "/imgs/our-classes/class-2.jpg",
  },
  {
    title: "Emagrecimento",
    desc: "Perca peso de forma eficiente e segura.",
    url: "/imgs/our-classes/class-1.jpg",
  },
  {
    title: "Aeróbica",
    desc: "Melhore o condicionamento do seu corpo.",
    url: "/imgs/our-classes/class-4.jpg",
  },
  {
    title: "Cárdio",
    desc: "Melhore ssua capacidade respiratória.",
    url: "/imgs/our-classes/class-3.jpg",
  },
];

export const planItems: PlanItemData[] = [
  {
    title: "Plano 1h",
    desc: "Treine 1h por dia",
    features: [
      {
        title: "Musculação",
        has: true,
      },
      {
        title: "Bicicleta",
        has: false,
      },
      {
        title: "Esteira",
        has: false,
      },
    ],
    price: 55,
    diary: 15,
    url: "https://w.app/QgqoZj",
  },
  {
    title: "Plano 1h30min",
    desc: "Treine 1h30min por dia",
    features: [
      {
        title: "Musculação",
        has: true,
      },
      {
        title: "Bicicleta",
        has: true,
      },
      {
        title: "Esteira",
        has: true,
      },
    ],
    price: 70,
    diary: 20,
    url: "https://w.app/43ktVz",
  },
  {
    title: "Plano 2h",
    desc: "Treine 2h por dia",
    features: [
      {
        title: "Musculação",
        has: true,
      },
      {
        title: "Bicicleta",
        has: true,
      },
      {
        title: "Esteira",
        has: true,
      },
    ],
    price: 70,
    diary: 20,
    url: "https://w.app/KcTZwq",
  },
  {
    title: "Plano +2h",
    desc: "Treine mais de 2h por dia",
    features: [
      {
        title: "Musculação",
        has: true,
      },
      {
        title: "Bicicleta",
        has: true,
      },
      {
        title: "Esteira",
        has: true,
      },
    ],
    price: 0,
    diary: 25,
    url: "https://w.app/fgdqEP",
  },
];
