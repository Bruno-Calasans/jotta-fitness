import { formatDate } from "date-fns";

export default function isDateEqual(date1: Date, date2: Date) {
  return formatDate(date1, "d/M/Y") === formatDate(date2, "d/M/Y");
}
