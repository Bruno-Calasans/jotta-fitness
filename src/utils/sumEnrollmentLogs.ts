import type { EnrollmentLog } from "@/types/Log.type";
import calcEnrollmentPrice from "./calcEnrollmentPrice";
import sumNumbers from "./sumNumbers";

export default function sumEnrollmentLogs(enrollmentLogs: EnrollmentLog[]) {
  if (enrollmentLogs.length === 0) return 0;
  return enrollmentLogs
    .map(({ enrollment }) => calcEnrollmentPrice(enrollment))
    .reduce(sumNumbers);
}
