import {
  LogIn,
  House,
  LayoutDashboard,
  Timer,
  CircleDollarSign,
  HandHelping,
  Dumbbell,
} from "lucide-react";
import { SiWhatsapp, SiInstagram, SiX } from "@icons-pack/react-simple-icons";

export const mainItems = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Benefícios",
    url: "#benefits",
    icon: Dumbbell,
  },
  {
    title: "Serviços",
    url: "#services",
    icon: HandHelping,
  },
  {
    title: "Nossos Planos",
    url: "#our-plans",
    icon: CircleDollarSign,
  },
];

// Social items.
export const socialItems = [
  {
    title: "Whatsapp",
    url: "https://w.app/NvGJzX",
    icon: SiWhatsapp,
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com",
    icon: SiInstagram,
  },
  {
    title: "Twitter",
    url: "https://www.x.com",
    icon: SiX,
  },
];

// Social items.
export const adminItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contador",
    url: "/counter",
    icon: Timer,
  },
];
