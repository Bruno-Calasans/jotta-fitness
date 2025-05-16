import { useAdhesionStore } from "@/store/adhesionStore";
import { useMemberStore } from "@/store/memberStore";
import calcEnrollmentLeftDays from "@/utils/calcEnrollmentLeftDays";
import calcEnrollmentTotalDays from "@/utils/calcEnrollmentTotalDays";
import calcLateFee from "@/utils/calcLateFee";
import calcMemberDays from "@/utils/calcMemberDays";
import canChangePlanWithoutFullPayment from "@/utils/canChangePlanWithoutFullPayment";
import getLastMemberEnrollment from "@/utils/getLastMemberEnrollment";
import isAdhesionDiscountValid from "@/utils/isAdhesionDiscountValid";
import isCurrentMemberAdhesionPaid from "@/utils/isCurrentMemberAdhesionPaid";
import isMemberNewbie from "@/utils/isMemberNewbie";
import memberHasEnrollment from "@/utils/memberHasEnrollment";

export function useEnrollmentResume() {
  const { selectedMember } = useMemberStore();
  const { getCurrentYearAdhesion } = useAdhesionStore();

  const currentAdhesion = getCurrentYearAdhesion();

  const hasEnrollment = !!selectedMember && memberHasEnrollment(selectedMember);

  const lastEnrollment =
    selectedMember && getLastMemberEnrollment(selectedMember);

  const isCurrentAdhesionPaid =
    !!selectedMember &&
    !!currentAdhesion &&
    isCurrentMemberAdhesionPaid(selectedMember, currentAdhesion);

  const isDiscountValid =
    !!currentAdhesion && isAdhesionDiscountValid(currentAdhesion);

  const memberDays = selectedMember ? calcMemberDays(selectedMember) : 0;

  const isNewbie = !!selectedMember && isMemberNewbie(selectedMember);

  const leftDays = lastEnrollment ? calcEnrollmentLeftDays(lastEnrollment) : 0;

  const totalDays = lastEnrollment
    ? calcEnrollmentTotalDays(lastEnrollment)
    : 0;

  const usedDays = totalDays - leftDays;

  const lateFee = calcLateFee(leftDays);

  const isCurrentPlanExpired = leftDays < 0;

  const canChangePlanWithoutFullPrice =
    !!lastEnrollment && canChangePlanWithoutFullPayment(lastEnrollment);

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
    lateFee,
    isCurrentPlanExpired,
    canChangePlanWithoutFullPrice,
  };
}
