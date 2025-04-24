import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import EnrollmentStatus from "./EnrollmentStatus";

type CurrentEnrollmentInfoProps = {};

export default function CurrentEnrollmentInfo({}: CurrentEnrollmentInfoProps) {
  const { lastEnrollment } = useEnrollmentResume();
  return (
    <div className="flex p-1">
      <div className="flex items-center gap-1 text-lg">
        Situação: <EnrollmentStatus enrollment={lastEnrollment} />
      </div>
    </div>
  );
}
