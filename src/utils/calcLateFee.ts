import { BUSINESS_RULES } from "@/config/BusinessRules";

export default function calcLateFee(lateDays: number) {
  if (lateDays === 0) return 0;
  return Math.abs(lateDays) * BUSINESS_RULES.lateFeePerDay;
}
