import { Plan } from "@/types/Plan.type";

type PlanPaymentResumeProps = {
  plan: Plan;
  months: number;
};

export default function PlanPaymentResume({
  plan,
  months,
}: PlanPaymentResumeProps) {
  return (
    <div>
      <p className="text-lg font-bold">Resumo de pagamento</p>
      <p className="text-stone-700">Valor do plano: R$ {plan.price}</p>
      <p className="text-stone-700">Meses a pagar: {months} mese(s)</p>
      <p className="font-semibold italic border-t-2 border-orange-500 mt-2">
        Total a pagar: R${months * plan.price}
      </p>
    </div>
  );
}
