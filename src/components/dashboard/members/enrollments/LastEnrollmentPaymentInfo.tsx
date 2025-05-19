import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import defaultDateFormat from "@/utils/defaultDateFormat";

export default function LastEnrollmentPaymentInfo() {
  const { lastEnrollment } = useEnrollmentResume();
  return (
    <p className="text-md text-stone-300">
      <span className="font-bold">Data de Último Pagamento:</span>{" "}
      {lastEnrollment ? defaultDateFormat(lastEnrollment.startsIn) : "Nenhum"}
    </p>
  );
}
