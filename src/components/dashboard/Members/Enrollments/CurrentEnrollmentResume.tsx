import { useMemberStore } from "@/store/memberStore";
import { differenceInDays } from "date-fns";
import PlanStatus from "./EnrollmentStatus";
import InfoMsg from "@/components/custom/InfoMsg";
import ErrorMsg from "@/components/custom/ErrorMsg";
import { useAdhesionStore } from "@/store/adhesionStore";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import useCustomToast from "@/hooks/use-custom-toast";
import { Badge } from "@/components/ui/badge";

export default function CurrentEnrollmentResume() {
  const { selectedMember, payAdhesion, getAdhesionPaymentByYear } =
    useMemberStore();
  const { getCurretYearAdhesion } = useAdhesionStore();
  const { successToast, errorToast } = useCustomToast();

  if (!selectedMember) return null;

  const enrollments = selectedMember.enrollments;
  const hasEnrollment = enrollments.length > 0;
  const lastEnrollment = enrollments[enrollments.length - 1];
  const currentAdhesion = getCurretYearAdhesion();
  const isCurrentAdhesionPaid =
    currentAdhesion &&
    getAdhesionPaymentByYear(selectedMember.id, new Date().getFullYear());
  const memberDays = differenceInDays(selectedMember.createdAt, new Date());
  const isNewbie = memberDays <= 40;

  const totalDays = hasEnrollment
    ? differenceInDays(lastEnrollment.expiresIn, lastEnrollment.startsIn)
    : 0;

  const leftDays = hasEnrollment
    ? differenceInDays(lastEnrollment.expiresIn, new Date())
    : 0;

  const usedDays = totalDays - leftDays;

  const canChangePlanWithoutFullPayment = hasEnrollment && usedDays <= 15;

  const payAdhesionHandler = () => {
    if (!selectedMember || !currentAdhesion) return;
    try {
      payAdhesion(selectedMember.id, currentAdhesion.year);
      successToast("Pagamento de Adesão", "Pagamento realizado com sucesso!");
    } catch (error) {
      errorToast("Pagamento de Adesão", "Erro ao pagar adesão.");
    }
  };

  console.log(selectedMember.adhesionsPayments, isCurrentAdhesionPaid);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex  justify-between text-4xl font-bold border-b-2 border-orange-400">
        <p>Resumo do Plano</p>
        {/* Plan Status */}
        <div className="flex p-1">
          <div className="flex items-center gap-1 text-lg">
            Situação: <PlanStatus enrollment={lastEnrollment} />
          </div>
        </div>
      </div>

      {/* Plan Info */}
      <div className="flex flex-col gap-1">
        {/* Current plan */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Plano Atual:</span>{" "}
          {hasEnrollment ? lastEnrollment.plan.name : "Nenhum"}
        </p>

        {/* Last payment date */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Último Pagamento:</span>{" "}
          {hasEnrollment
            ? lastEnrollment.startsIn.toLocaleDateString()
            : "Nenhum"}
        </p>

        {/* Expire date */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Data de Vencimento:</span>{" "}
          {hasEnrollment
            ? lastEnrollment.expiresIn.toLocaleDateString()
            : "Nenhum"}
        </p>

        {/* Member since */}
        <p className="text-md text-stone-300">
          <span className="font-bold">Membro desde:</span>{" "}
          {selectedMember.createdAt.toLocaleDateString()}{" "}
          {isNewbie ? "(novato)" : "(veterano)"}
        </p>

        {/* Member since */}
        <div className="text-md text-stone-300">
          <span className="font-bold">Adesão: </span>
          {isCurrentAdhesionPaid ? (
            <Badge className="bg-emerald-400 hover:bg-emerald-500 p-1 Capitalize">
              Paga
            </Badge>
          ) : (
            <Badge className="bg-red-400 hover:bg-red-500  p-1 capitalize">
              Não Paga
            </Badge>
          )}
        </div>

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
          {hasEnrollment && canChangePlanWithoutFullPayment && (
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

          {/* Change plan message */}
          {hasEnrollment && !canChangePlanWithoutFullPayment && (
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

          {/* Expired Plan message */}
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

          {/* Adhesion message */}
          {hasEnrollment && currentAdhesion && !isCurrentAdhesionPaid && (
            <ErrorMsg>
              <div className="flex items-center justify-between flex-1">
                <p>
                  Este usuário ainda não pagou a <span>adesão</span> deste ano,
                  no valor de{" "}
                  <span className="font-bold underline">
                    R$
                    {isNewbie
                      ? (lastEnrollment.plan.price *
                          currentAdhesion.newbieDiscount) /
                        100
                      : (lastEnrollment.plan.price *
                          currentAdhesion.veteranDiscount) /
                        100}
                  </span>
                </p>
                <Button
                  onClick={payAdhesionHandler}
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  <Check />
                  Marcar como pago
                </Button>
              </div>
            </ErrorMsg>
          )}
        </div>
      </div>
    </div>
  );
}
