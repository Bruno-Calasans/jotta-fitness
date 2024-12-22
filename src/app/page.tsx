import ContentContainer from "@/components/general/ContentContainer";
import { Dumbbell, Salad, PiggyBank, BicepsFlexed } from "lucide-react";
import HomeSection from "@/components/home/HomeSection";

const benefitsItems = [
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

const serviceItems = [
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

export default function Home() {
  return (
    <ContentContainer classname="lg:max-w-[1200px] md:max-w-[1000px] sm:max-w-[500px] my-14">
      <HomeSection
        id="#benefits"
        title="Por que nos escolher?"
        subtitle="Seja melhor do que ontem."
        className="bg-stone-800 gap-0"
      >
        {benefitsItems.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-0">
            <item.icon
              size={60}
              className="rounded-full bg-stone-900 text-orange-500 hover:bg-orange-500 hover:text-white p-1 cursor-pointer transition-all"
            />
            {/* Desc */}
            <div className="flex justify-center flex-col items-center">
              <p className="text-xl font-bold text-white text-center">
                {item.title}
              </p>
              <p className="text-sm text-stone-300 text-center">{item.desc}</p>
            </div>
          </div>
        ))}
      </HomeSection>

      <HomeSection
        id="#services"
        title="Nossas Aulas"
        subtitle="O que temos a oferecer?"
      >
        {serviceItems.map((item) => (
          <div
            key={item.title}
            className="flex flex-col justify-between gap-2 relative bg-stone-900  h-72 overflow-hidden shadow-sm shadow-black mx-auto hover:opacity-90 cursor-pointer w-full border-b-orange-500 border-b-2"
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-40 w-full  border-b-4 border-stone-500 aspect-square min-w-[200px]:"
            />
            {/* Desc */}
            <div className="flex flex-col items-center p-2 flex-1">
              <p className="text-xl font-bold text-orange-500 text-center">
                {item.title}
              </p>
              <p className="text-sm text-white text-center">{item.desc}</p>
            </div>
          </div>
        ))}
      </HomeSection>
    </ContentContainer>
  );
}
