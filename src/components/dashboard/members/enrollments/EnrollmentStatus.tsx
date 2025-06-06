import { Badge } from "@/components/ui/badge";
import { ENROLLMENT_STATUS, Enrollment } from "@/types/Enrollment.type";
import classifyEnrollmentStatus from "@/utils/classifyEnrollmentStatus";

type SubscriptionStatusProps = {
  enrollment?: Enrollment | null;
};

export default function SubscriptionStatus({
  enrollment,
}: SubscriptionStatusProps) {
  const enrollmentStatus = classifyEnrollmentStatus(enrollment);

  if (enrollmentStatus === ENROLLMENT_STATUS.ATIVO) {
    return (
      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer">
        Ativo
      </Badge>
    );
  }

  if (enrollmentStatus === ENROLLMENT_STATUS.VENCIDO) {
    return (
      <Badge className="bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer">
        Vencido
      </Badge>
    );
  }

  return <Badge>Sem Plano</Badge>;
}
