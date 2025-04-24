import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";

export default function LastEnrollmentPaymentInfo() {
  const { hasEnrollment, lastEnrollment } = useEnrollmentResume();
  return (
    <p className="text-md text-stone-300">
      <span className="font-bold">Data de Último Pagamento:</span>{" "}
      {hasEnrollment && lastEnrollment
        ? lastEnrollment.startsIn.toLocaleDateString()
        : "Nenhum"}
    </p>
  );
}
