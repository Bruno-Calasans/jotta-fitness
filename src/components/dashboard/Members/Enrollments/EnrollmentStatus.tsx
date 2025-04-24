import { differenceInHours } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Enrollment } from "@/types/Enrollment.type";

type SubscriptionStatusProps = {
  enrollment?: Enrollment | null;
};

export default function SubscriptionStatus({
  enrollment,
}: SubscriptionStatusProps) {
  if (!enrollment) return <Badge>Sem Plano</Badge>;

  const diff = differenceInHours(enrollment.expiresIn, new Date());

  if (diff > 0) {
    return (
      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer">
        Ativo
      </Badge>
    );
  }

  if (diff < 0) {
    return (
      <Badge className="bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer">
        Vencido
      </Badge>
    );
  }

  return (
    <Badge className="bg-orange-500 hover:bg--600 text-white transition-all cursor-pointer">
      Acabou
    </Badge>
  );
}
