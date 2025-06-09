import { Badge } from "@/components/ui/badge";
import { Enrollment, ENROLLMENT_STATUS } from "@/types/Enrollment.type";
import classifyEnrollmentStatus from "@/utils/classifyEnrollmentStatus";

type EnrollmentStatusProps = {
  enrollment?: Enrollment | null;
};

export default function EnrollmentStatus({
  enrollment,
}: EnrollmentStatusProps) {
  const enrollmentStatus = classifyEnrollmentStatus(enrollment);

  if (enrollmentStatus === ENROLLMENT_STATUS.ACTIVE) {
    return (
      <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all cursor-pointer">
        Ativo
      </Badge>
    );
  }

  if (enrollmentStatus === ENROLLMENT_STATUS.EXPIRED) {
    return (
      <Badge className="bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer">
        Vencido
      </Badge>
    );
  }

  return <Badge>Sem Plano</Badge>;
}
