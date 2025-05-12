import type { Adhesion } from "@/types/Adhesion.type";
import type { Member } from "@/types/Member.type";
import type { Plan } from "@/types/Plan.type";
import calcAdhesionPrice from "@/utils/calcAdhesionPrice";
import isAdhesionDiscountValid from "@/utils/isAdhesionDiscountValid";
import isMemberNewbie from "@/utils/isMemberNewbie";

type AdhesionResumeProps = {
  adhesion: Adhesion;
  plan: Plan;
  member: Member;
};

export default function AdhesionPaymentResume({
  adhesion,
  plan,
  member,
}: AdhesionResumeProps) {
  return (
    <div>
      <p className="text-2xl font-bold border-b-2 border-orange-500 mb-2">
        Resumo de Pagamento da Adesão
      </p>

      {/* Plan price */}
      <p className="text-stone-800 text-lg">
        Preço do Plano:{" "}
        <span className="font-bold">R${plan.price.toFixed(2)}</span>
      </p>

      {/* Adhesion Discount */}
      <p className="text-stone-800 text-lg">
        Desconto sobre plano:{" "}
        <span className="font-bold capitalize">
          {isAdhesionDiscountValid(adhesion)
            ? isMemberNewbie(member)
              ? `${adhesion.newbieDiscount}%`
              : `${adhesion.veteranDiscount}%`
            : "0%"}
        </span>
      </p>

      {/* Total */}
      <p className="font-semibold italic border-t-2 border-orange-500 mt-2 text-lg">
        Total a pagar: R${calcAdhesionPrice(adhesion, plan, member).toFixed(2)}
      </p>
    </div>
  );
}
