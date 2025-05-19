import { format } from "date-fns";

export default function defaultDateFormat(date: Date) {
  return format(date, "d/M/y");
}
