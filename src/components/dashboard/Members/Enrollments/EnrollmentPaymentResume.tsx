import { BUSINESS_RULES } from "@/config/BusinessRules";
import { useMemberStore } from "@/store/memberStore";
import { Member } from "@/types/Member.type";
import { Plan } from "@/types/Plan.type";
import calcLateFee from "@/utils/calcLateFee";
import { differenceInDays } from "date-fns";
import { useState } from "react";

type EnrollmentResumeProps = {
  plan: Plan;
  months: number;
};

export default function EnrollmentPaymentResume({
  plan,
  months,
}: EnrollmentResumeProps) {
  const { selectedMember } = useMemberStore();

  if (!selectedMember) return null;

  const enrollments = selectedMember.enrollments;
  const hasPlansPayments = enrollments.length > 0;
  const lastPayment = enrollments[enrollments.length - 1];

  const leftDays = hasPlansPayments
    ? differenceInDays(lastPayment.expiresIn, new Date())
    : 0;

  const lateFee = leftDays < 0 ? calcLateFee(leftDays) : 0;

  return (
    <div>
      <p className="text-2xl font-bold border-b-2 border-orange-500 mb-2">
        Resumo de pagamento
      </p>
      <p className="text-stone-800 text-lg">
        Valor do plano: R$ {plan.price.toFixed(2)}
      </p>
      <p className="text-stone-800 text-lg">Meses a pagar: {months} mese(s)</p>
      {leftDays < 0 && (
        <p className="text-red-700 font-semibold text-lg">
          Multa por atraso: R${lateFee.toFixed(2)}
        </p>
      )}
      <p className="font-semibold italic border-t-2 border-orange-500 mt-2 text-lg">
        Total a pagar: R${(months * plan.price + lateFee).toFixed(2)}
      </p>
    </div>
  );
}
