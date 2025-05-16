import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";

export default function CurrentPlanInfo() {
  const { lastEnrollment } = useEnrollmentResume();
  return (
    <p className="text-md text-stone-300">
      <span className="font-bold">Plano Atual:</span>{" "}
      {lastEnrollment ? lastEnrollment.plan.name : "Nenhum"}
    </p>
  );
}
