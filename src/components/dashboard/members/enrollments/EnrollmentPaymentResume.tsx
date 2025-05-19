import calcEnrollmentLeftDays from "@/utils/calcEnrollmentLeftDays";
import calcLateFee from "@/utils/calcLateFee";
import memberHasEnrollment from "@/utils/memberHasEnrollment";
import type { Member } from "@/types/Member.type";
import type { Plan } from "@/types/Plan.type";

type EnrollmentResumeProps = {
  data: {
    member: Member;
    plan: Plan;
    months: number;
  };
};

export default function EnrollmentPaymentResume({
  data: { member, plan, months },
}: EnrollmentResumeProps) {
  const enrollments = member.enrollments;
  const hasMemberEnrollment = memberHasEnrollment(member);
  const enrollmentLeftDays = hasMemberEnrollment
    ? calcEnrollmentLeftDays(enrollments[enrollments.length - 1])
    : 0;

  const lateFee = calcLateFee(enrollmentLeftDays);

  return (
    <div>
      {/* Title */}
      <p className="text-2xl font-bold border-b-2 border-orange-500 mb-2">
        Resumo de pagamento
      </p>

      {/* Plan Price info */}
      <p className="text-stone-800 text-lg">
        Valor do plano: R${plan.price.toFixed(2)}
      </p>

      {/* Late fee info */}
      <p className="text-stone-800 text-lg">Meses a pagar: {months} mese(s)</p>
      {enrollmentLeftDays < 0 && (
        <p className="text-red-700 font-semibold text-lg">
          Multa por atraso: R${lateFee.toFixed(2)}
        </p>
      )}

      {/* Total info */}
      <p className="font-semibold italic border-t-2 border-orange-500 mt-2 text-lg">
        Total a pagar: R${(months * plan.price + lateFee).toFixed(2)}
      </p>
    </div>
  );
}
