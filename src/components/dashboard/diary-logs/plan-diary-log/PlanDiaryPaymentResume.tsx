import { useMemberStore } from "@/store/memberStore";
import { Plan } from "@/types/Plan.type";

type PlanDiaryResumeProps = {
  plan: Plan;
  days: number;
};

export default function PlanDiaryPaymentResume({
  plan,
  days,
}: PlanDiaryResumeProps) {
  const { selectedMember } = useMemberStore();

  if (!selectedMember) return null;

  return (
    <div>
      <p className="text-2xl font-bold border-b-2 border-orange-500 mb-2">
        Resumo de pagamento
      </p>
      <p className="text-stone-800 text-lg">
        Valor da Diária do Plano: R$ {plan.diary.toFixed(2)}
      </p>
      <p className="text-stone-800 text-lg">Dias pagos: {days} dia(s)</p>
      <p className="font-semibold italic border-t-2 border-orange-500 mt-2 text-lg">
        Total a pagar: R${(days * plan.diary).toFixed(2)}
      </p>
    </div>
  );
}
