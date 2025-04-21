import { useMemberStore } from "@/store/memberStore";
import { differenceInDays } from "date-fns";
import PlanStatus from "./EnrollmentStatus";
import InfoMsg from "@/components/custom/InfoMsg";
import ErrorMsg from "@/components/custom/ErrorMsg";

export default function CurrentEnrollmentResume() {
  const { selectedMember } = useMemberStore();

  if (!selectedMember) return null;

  const enrollments = selectedMember.enrollments;
  const hasPlansPayments = enrollments.length > 0;
  const lastPayment = enrollments[enrollments.length - 1];

  const totalDays = hasPlansPayments
    ? differenceInDays(lastPayment.expiresIn, lastPayment.startsIn)
    : 0;

  const leftDays = hasPlansPayments
    ? differenceInDays(lastPayment.expiresIn, new Date())
    : 0;

  const usedDays = totalDays - leftDays;

  const canChangePlanWithoutFullPayment = hasPlansPayments && usedDays <= 15;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex  justify-between text-4xl font-bold border-b-2 border-orange-400">
        <p>Resumo do Plano</p>
        {/* Plan Status */}
        <div className="flex p-1">
          <div className="flex items-center gap-1 text-lg">
            Situação: <PlanStatus enrollment={lastPayment} />
          </div>
        </div>
      </div>

      {/* Plan Info */}
      <div className="flex flex-col gap-1">
        {/* Current plan */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Plano Atual:</span>{" "}
          {hasPlansPayments ? lastPayment.plan.name : "Nenhum"}
        </p>

        {/* Last payment date */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Última Data de Pagamento:</span>{" "}
          {hasPlansPayments
            ? lastPayment.startsIn.toLocaleDateString()
            : "Nenhum"}
        </p>

        {/* Expire date */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Data de Vencimento:</span>{" "}
          {hasPlansPayments
            ? lastPayment.expiresIn.toLocaleDateString()
            : "Nenhum"}
        </p>

        {/* Total days */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Dias Totais:</span> {totalDays}
        </p>

        {/* Left days */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Dias Restantes:</span> {leftDays}{" "}
        </p>

        {/* Used days */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Dias Utilizados:</span> {usedDays}
        </p>

        {/* Messages */}
        <div className="flex flex-col gap-2 mt-2">
          {hasPlansPayments && canChangePlanWithoutFullPayment && (
            <InfoMsg>
              <p>
                Usuário utilizou seu plano por menos que 15 dias, por isso,
                ainda pode trocar de plano{" "}
                <span className="font-bold underline">
                  sem pagar o valor integral
                </span>
                .
              </p>
            </InfoMsg>
          )}

          {hasPlansPayments && !canChangePlanWithoutFullPayment && (
            <ErrorMsg>
              <p>
                Usuário utilizou seu plano por{" "}
                <span className="font-bold underline">mais que 15 dia</span>s,
                por isso, terá que pagar{" "}
                <span className="font-bold underline">valor integral</span> para
                trocar de plano.
              </p>
            </ErrorMsg>
          )}

          {leftDays < 0 && (
            <ErrorMsg>
              <p>
                Seu plano expirou a {Math.abs(leftDays)} dia atrás. Você deve
                pagar R$ 1,50 a mais por cada dia de atraso, totalizando{" "}
                <span className="font-bold underline">
                  R$ {Math.abs(1.5 * leftDays).toFixed(2)}
                </span>
              </p>
            </ErrorMsg>
          )}
        </div>
      </div>
    </div>
  );
}
