import { format } from "date-fns";

export default function dateToInputFormat(date: Date) {
  return format(date, "yyyy-MM-dd");
}
