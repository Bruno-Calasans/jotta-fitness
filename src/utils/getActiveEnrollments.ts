import { Enrollment } from "@/types/Enrollment.type";
import { differenceInDays } from "date-fns";

export default function getActiveEnrollments(enrollments: Enrollment[]) {
  return enrollments.filter((enrollment) => {
    return differenceInDays(enrollment.expiresIn, new Date()) > 0;
  });
}
