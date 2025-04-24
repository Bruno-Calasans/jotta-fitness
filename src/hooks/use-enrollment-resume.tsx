import { BUSINESS_RULES } from "@/config/BusinessRules";
import { useAdhesionStore } from "@/store/adhesionStore";
import { useMemberStore } from "@/store/memberStore";
import { Adhesion } from "@/types/Adhesion.type";
import { Member } from "@/types/Member.type";
import calcLateFee from "@/utils/calcLateFee";
import { differenceInDays, differenceInHours } from "date-fns";

export function useEnrollmentResume() {
  const { selectedMember } = useMemberStore();
  const { getCurretYearAdhesion } = useAdhesionStore();

  const currentDate = new Date();
  const currentAdhesion = getCurretYearAdhesion();
  const hasEnrollment = selectedMember
    ? selectedMember.enrollments.length > 0
    : false;

  const lastEnrollment =
    selectedMember &&
    selectedMember.enrollments[selectedMember.enrollments.length - 1];

  const isCurrentAdhesionPaid =
    currentAdhesion && selectedMember
      ? !!selectedMember.adhesionsPayments.find(
          (adhesion) => adhesion.year === currentAdhesion.year
        )
      : false;

  const isDiscountValid = currentAdhesion
    ? differenceInHours(currentAdhesion.discountMaxDate, currentDate) > 0
    : false;

  const memberDays = selectedMember
    ? differenceInDays(selectedMember.createdAt, currentDate)
    : 0;

  const isNewbie = memberDays <= BUSINESS_RULES.daysBeforeVeteran;

  const totalDays =
    hasEnrollment && lastEnrollment
      ? differenceInDays(lastEnrollment.expiresIn, lastEnrollment.startsIn)
      : 0;

  const leftDays =
    hasEnrollment && lastEnrollment
      ? differenceInDays(lastEnrollment.expiresIn, currentDate)
      : 0;

  const usedDays = totalDays - leftDays;
  const isCurrentPlanExpired = leftDays < 0;

  const canChangePlanWithoutFullPayment =
    hasEnrollment && usedDays <= BUSINESS_RULES.daysBeforeChangePlanWithoutTax;

  const lateFee = calcLateFee(leftDays);

  return {
    currentAdhesion,
    hasEnrollment,
    lastEnrollment,
    isCurrentAdhesionPaid,
    isDiscountValid,
    memberDays,
    isNewbie,
    totalDays,
    leftDays,
    usedDays,
    isCurrentPlanExpired,
    canChangePlanWithoutFullPayment,
    lateFee,
  };
}
