import { Enrollment } from "@/types/Enrollment.type";

export default function calcEnrollmentPrice({
  lateFee,
  months,
  plan,
}: Enrollment) {
  return plan.price * months + lateFee;
}
