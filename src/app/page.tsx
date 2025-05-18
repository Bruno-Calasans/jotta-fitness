import ContentContainer from "@/components/custom/others/ContentContainer";
import HomeSection from "@/components/home/HomeSection";
import {
  planItems,
  serviceItems,
  benefitsItems,
} from "@/components/home/HomeMenuData";
import PlanCard from "@/components/home/PlanItem";
import ServiceCard from "@/components/home/ServiceItem";
import BenefitItem from "@/components/home/BenefitItem";

export default function Home() {
  return (
    <ContentContainer classname="lg:max-w-[1200px] md:max-w-[1000px] sm:max-w-[500px] my-14">
      <HomeSection
        id="benefits"
        title="Por que nos escolher?"
        subtitle="Seja melhor do que ontem."
        className="bg-stone-800 gap-0"
      >
        {benefitsItems.map((item) => (
          <BenefitItem key={item.title} item={item} />
        ))}
      </HomeSection>

      <HomeSection
        id="services"
        title="Nossas Aulas"
        subtitle="O que temos a oferecer?"
      >
        {serviceItems.map((item) => (
          <ServiceCard key={item.title} item={item} />
        ))}
      </HomeSection>

      <HomeSection
        id="our-plans"
        title="Nossos Planos"
        subtitle="Temos preços acessíveis."
        className="lg:grid-cols-3 xl:grid-cols-4"
      >
        {planItems.map((item) => (
          <PlanCard key={item.title} item={item} />
        ))}
      </HomeSection>
    </ContentContainer>
  );
}
