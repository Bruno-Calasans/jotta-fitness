import { parse } from "date-fns";

export default function inputFormatToDate(input: string) {
  return parse(input, "yyyy-MM-dd", new Date());
}
