import CurrentPlanInfo from "./CurrentPlanInfo";
import CurrentEnrollmentInfo from "./CurrentEnrollmentInfo";
import LastEnrollmentPaymentInfo from "./LastEnrollmentPaymentInfo";
import EnrollmentExpireDateInfo from "./EnrollmentExpireDataInfo";
import MemberSinceInfo from "./MemberSinceInfo";
import CurrentAdhesionInfo from "./CurrentAdhesionInfo";
import EnrollmentDaysInfo from "./EnrollmentDaysInfo";
import ChangePlanInfo from "./ChangePlanInfo";
import ExpiredEnrollmentInfo from "./ExpiredEnrollmentInfo";
import AdhesionInfo from "./AdhesionInfo";

export default function CurrentEnrollmentResume() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex  justify-between text-4xl font-bold border-b-2 border-orange-400">
        <p>Resumo da Inscrição Atual</p>
        <CurrentEnrollmentInfo />
      </div>

      {/* Plan Info */}
      <div className="flex flex-col gap-1">
        <MemberSinceInfo />
        <CurrentPlanInfo />
        <EnrollmentExpireDateInfo />
        <LastEnrollmentPaymentInfo />
        <EnrollmentDaysInfo />
        <CurrentAdhesionInfo />

        {/* Messages */}
        <div className="flex flex-col gap-2 mt-2">
          <ChangePlanInfo />
          <ExpiredEnrollmentInfo />
          <AdhesionInfo />
        </div>
      </div>
    </div>
  );
}
