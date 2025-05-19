import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import defaultDateFormat from "@/utils/defaultDateFormat";

export default function EnrollmentExpireDateInfo() {
  const { lastEnrollment } = useEnrollmentResume();
  return (
    <p className="text-md text-stone-300">
      <span className="font-bold">Data de Vencimento:</span>{" "}
      {lastEnrollment ? defaultDateFormat(lastEnrollment.expiresIn) : "Nenhum"}
    </p>
  );
}
