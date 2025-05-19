import { startOfYear } from "date-fns";

export default function calcMinDateFromYear(year: number) {
  const currentYear = new Date().getFullYear();
  let minDate = new Date();
  minDate.setFullYear(year);

  if (year != currentYear) {
    minDate = startOfYear(minDate);
  }

  return minDate;
}
