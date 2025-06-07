import { Member } from "@/types/Member.type";
import classifyEnrollmentStatus from "./classifyEnrollmentStatus";
import getLastMemberEnrollment from "./getLastMemberEnrollment";

export default function sortMembersByEnrollmentStatus(members: Member[]) {
  return members.sort(
    (a, b) =>
      classifyEnrollmentStatus(getLastMemberEnrollment(a)) -
      classifyEnrollmentStatus(getLastMemberEnrollment(b)),
  );
}
