import defaultDateFormat from "./defaultDateFormat";

export default function isDateEqual(date1: Date, date2: Date) {
  return defaultDateFormat(date1) === defaultDateFormat(date2);
}
