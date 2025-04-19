import { Badge } from "@/components/ui/badge";
import { Member } from "@/types/Member.type";
import { differenceInDays, differenceInHours } from "date-fns";
import PlanPaymentHistoryTable from "./PlanPaymentHistoryTable";

type PlanMemberTabProps = {
  member: Member;
};

export default function PlanMemberTab({ member }: PlanMemberTabProps) {
  const getPlanStatus = () => {
    if (member.payments && member.payments.plans.length > 0) {
      const lastPayment =
        member.payments.plans[member.payments.plans.length - 1];

      const diff = differenceInHours(lastPayment.expiresIn, new Date());

      if (diff > 0) {
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer">
            Em dia
          </Badge>
        );
      }

      if (diff < 0) {
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer">
            Atrasado
          </Badge>
        );
      }
    }

    return <Badge>Sem Plano</Badge>;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex  justify-between text-4xl font-bold border-b-2 border-orange-400">
          <p>Resumo do Plano</p>
          {/* Plan Status */}
          <div className="flex p-1">
            <div className="flex items-center gap-1 text-lg">
              Situação: {getPlanStatus()}
            </div>
          </div>
        </div>

        {/* Plan Info */}
        <div className="flex justify-between">
          <div>
            {/* Current plan */}
            <p className="text-md text-stone-300">
              <span className="font-bold">Plano Atual:</span>{" "}
              {member.plan ? member.plan.name : "Nenhum"}
            </p>
            {/* Last payment */}
            <p className="text-md text-stone-300">
              <span className="font-bold">Data de Pagamento:</span>{" "}
              {member.payments?.plans
                ? member.payments?.plans[0].createdAt.toLocaleDateString()
                : "Nenhum"}
            </p>
            {/* Expire date */}
            <p className="text-md text-stone-300">
              <span className="font-bold">Data de Vencimento:</span>{" "}
              {member.payments?.plans
                ? member.payments?.plans[0].expiresIn.toLocaleDateString()
                : "Nenhum"}
            </p>
            {/* Left days */}
            <p className="text-md text-stone-300">
              <span className="font-bold">Dias Restantes:</span>{" "}
              {member.payments?.plans
                ? differenceInDays(
                    member.payments?.plans[0].expiresIn,
                    member.payments?.plans[0].startsIn
                  )
                : 0}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-4xl font-bold border-b-2 border-orange-400">
        <p>Histórico de Pagamento</p>
        {/* Plan Status */}
        <div className="flex p-1">
          <div className="flex items-center gap-1 text-lg">
            Situação: {getPlanStatus()}
          </div>
        </div>
      </div>
      <PlanPaymentHistoryTable member={member} />
    </div>
  );
}
