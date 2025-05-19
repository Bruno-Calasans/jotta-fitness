import InfoMsg from "@/components/custom/msgs/InfoMsg";
import { BUSINESS_RULES } from "@/config/BusinessRules";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";

export default function ChangePlanInfo() {
  const { hasEnrollment, canChangePlanWithoutFullPrice } =
    useEnrollmentResume();

  if (!hasEnrollment) return null;

  if (canChangePlanWithoutFullPrice)
    return (
      <InfoMsg>
        <p>
          Usuário utilizou seu plano por menos que{" "}
          <span className="font-bold">
            {BUSINESS_RULES.daysBeforeChangePlanWithoutTax}
          </span>{" "}
          dias, por isso, ainda pode trocar de plano{" "}
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
        Usuário utilizou seu plano por menos que{" "}
        <span className="font-bold">
          {BUSINESS_RULES.daysBeforeChangePlanWithoutTax}
        </span>{" "}
        dias, por isso, ainda pode trocar de plano{" "}
        <span className="font-bold underline">sem pagar o valor integral</span>.
      </p>
    </InfoMsg>
  );
}
