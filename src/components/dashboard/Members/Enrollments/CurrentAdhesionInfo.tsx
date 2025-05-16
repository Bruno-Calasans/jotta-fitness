import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import { cn } from "@/lib/utils";

export default function CurrentAdhesionInfo() {
  const { isCurrentAdhesionPaid } = useEnrollmentResume();
  return (
    <div className="flex  gap-1 text-md text-stone-300">
      <span className="font-bold">Pagou adesão: </span>
      <p
        className={cn(
          "text-red-500 font-bold",
          isCurrentAdhesionPaid && "text-emerald-500"
        )}
      >
        {isCurrentAdhesionPaid ? "Sim" : "Não"}
      </p>
    </div>
  );
}
