import ContentContainer from "@/components/general/ContentContainer";
import Image from "next/image";
import { Dumbbell, Salad, PiggyBank, BicepsFlexed } from "lucide-react";

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

export default function Home() {
  return (
    <ContentContainer classname="lg:max-w-[1200px] md:max-w-[1000px] sm:max-w-[500px] ">
      {/* Benefits Section */}
      <section
        id="#benefits"
        className="text-white flex flex-col items-center gap-10 h-full px-5  py-10 bg-stone-800 rounded-sm my-16 mx-5"
      >
        {/* Header */}
        <header className="flex flex-col items-center">
          {/* Title */}
          <p className="text-4xl font-bold text-orange-500">
            Porque nos Escolher?
          </p>
          {/* Subtitle */}
          <p className="text-xl font-bold text-white">
            Seja melhor do que ontem.
          </p>
        </header>
        {/* Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-10">
          {benefitsItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <item.icon
                size={60}
                className="rounded-full bg-stone-800 text-orange-500 hover:bg-orange-500 hover:text-white p-1 cursor-pointer transition-all"
              />
              {/* Desc */}
              <div className="flex justify-center flex-col items-center">
                <p className="text-xl font-bold text-white text-center">
                  {item.title}
                </p>
                <p className="text-sm text-stone-300 text-center">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ContentContainer>
  );
}
