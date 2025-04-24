import { BUSINESS_RULES } from "@/config/BusinessRules";
import { Adhesion } from "@/types/Adhesion.type";
import { Member } from "@/types/Member.type";
import { differenceInDays, differenceInHours } from "date-fns";

export function resumeMemberEnrollment(
  member: Member,
  currentAdhesion: Adhesion
) {
  const { enrollments, adhesionsPayments } = member;

  //
  const currentDate = new Date();
  const hasEnrollment = enrollments.length > 0;
  const lastEnrollment = enrollments[enrollments.length - 1];

  const isCurrentAdhesionPaid = adhesionsPayments.find(
    (adhesion) => adhesion.year === currentAdhesion.year
  );
  const isDiscountValid =
    differenceInHours(currentAdhesion.discountMaxDate, currentDate) > 0;
  const memberDays = differenceInDays(member.createdAt, currentDate);
  const isNewbie = memberDays <= BUSINESS_RULES.daysBeforeVeteran;

  const totalDays = hasEnrollment
    ? differenceInDays(lastEnrollment.expiresIn, lastEnrollment.startsIn)
    : 0;

  const leftDays = hasEnrollment
    ? differenceInDays(lastEnrollment.expiresIn, currentDate)
    : 0;

  const usedDays = totalDays - leftDays;
  const isPlanExpired = leftDays < 0;

  const canChangePlanWithoutFullPayment =
    hasEnrollment && usedDays <= BUSINESS_RULES.daysBeforeChangePlanWithoutTax;

  return {
    hasEnrollment,
    lastEnrollment,
    isCurrentAdhesionPaid,
    isDiscountValid,
    memberDays,
    isNewbie,
    totalDays,
    isPlanExpired,
    canChangePlanWithoutFullPayment,
  };
}
