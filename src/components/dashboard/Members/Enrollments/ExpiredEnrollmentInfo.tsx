import ErrorMsg from "@/components/custom/ErrorMsg";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";

export default function ExpiredEnrollmentInfo() {
  const { isCurrentPlanExpired, leftDays, lateFee } = useEnrollmentResume();

  if (!isCurrentPlanExpired) return null;

  return (
    <ErrorMsg>
      <p>
        Seu plano expirou a {Math.abs(leftDays)} dia atrá(s). Você deve pagar R$
        1,50 a mais por cada dia atrasado, totalizando{" "}
        <span className="font-bold underline">R$ {lateFee.toFixed(2)}</span>
      </p>
    </ErrorMsg>
  );
}
