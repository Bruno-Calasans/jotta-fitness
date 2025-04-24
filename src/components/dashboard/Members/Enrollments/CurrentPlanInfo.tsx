import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";

export default function CurrentPlanInfo() {
  const { hasEnrollment, lastEnrollment } = useEnrollmentResume();
  return (
    <p className="text-md text-stone-300">
      <span className="font-bold">Plano Atual:</span>{" "}
      {hasEnrollment && lastEnrollment ? lastEnrollment.plan.name : "Nenhum"}
    </p>
  );
}
