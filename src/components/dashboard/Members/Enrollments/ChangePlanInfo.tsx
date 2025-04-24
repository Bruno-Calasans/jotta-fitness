import InfoMsg from "@/components/custom/InfoMsg";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";

export default function ChangePlanInfo() {
  const { hasEnrollment, canChangePlanWithoutFullPayment } =
    useEnrollmentResume();

  if (!hasEnrollment) return null;

  if (canChangePlanWithoutFullPayment)
    return (
      <InfoMsg>
        <p>
          Usuário utilizou seu plano por menos que 15 dias, por isso, ainda pode
          trocar de plano{" "}
          <span className="font-bold underline">
            sem pagar o valor integral
          </span>
          .
        </p>
      </InfoMsg>
    );

  return (
    <InfoMsg>
      <p>
        Usuário utilizou seu plano por menos que 15 dias, por isso, ainda pode
        trocar de plano{" "}
        <span className="font-bold underline">sem pagar o valor integral</span>.
      </p>
    </InfoMsg>
  );
}
