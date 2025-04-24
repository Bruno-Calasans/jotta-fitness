import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";

export default function EnrollmentExpireDateInfo() {
  const { hasEnrollment, lastEnrollment } = useEnrollmentResume();
  return (
    <p className="text-md text-stone-300">
      <span className="font-bold">Data de Vencimento:</span>{" "}
      {hasEnrollment && lastEnrollment
        ? lastEnrollment.expiresIn.toLocaleDateString()
        : "Nenhum"}
    </p>
  );
}
