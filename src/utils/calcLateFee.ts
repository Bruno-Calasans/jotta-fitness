import { BUSINESS_RULES } from "@/config/BusinessRules";

export default function calcLateFee(lateDays: number) {
  return Math.abs(lateDays) * BUSINESS_RULES.lateFeePerDay;
}
