import { Badge } from "@/components/ui/badge";
import { Enrollment } from "@/types/Enrollment.type";
import calcEnrollmentLeftDays from "@/utils/calcEnrollmentLeftDays";

type SubscriptionStatusProps = {
  enrollment?: Enrollment | null;
};

export default function SubscriptionStatus({
  enrollment,
}: SubscriptionStatusProps) {
  const leftDays = enrollment && calcEnrollmentLeftDays(enrollment);

  if (!leftDays) return <Badge>Sem Plano</Badge>;

  if (leftDays > 0) {
    return (
      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer">
        Ativo
      </Badge>
    );
  }

  if (leftDays < 0) {
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
