import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import { cn } from "@/lib/utils";

export default function EnrollmentDaysInfo() {
  const { totalDays, leftDays, usedDays } = useEnrollmentResume();

  return (
    <div className="flex gap-1">
      <p className="text-md text-stone-300">
        <span className="font-bold">Dias Utilizados / Dias Totais:</span>{" "}
        <span
          className={cn("font-bold", usedDays >= totalDays && "text-red-500")}
        >
          {usedDays}
        </span>{" "}
        de <span className="font-bold">{totalDays}</span> dias
      </p>

      {/* Left days */}
      {/* <p className="text-md text-stone-300">
        <span className="font-bold">Dias Restantes:</span>{" "}
        {leftDays < 0 ? 0 : leftDays}
      </p> */}

      {/* Used days */}
      {/* <p className="text-md text-stone-300">
        <span className="font-bold">Dias Utilizados:</span> {usedDays}
      </p> */}
    </div>
  );
}
