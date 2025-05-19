import { useLogStore } from "@/store/logStore";
import defaultDateFormat from "@/utils/defaultDateFormat";
import isDateEqual from "@/utils/isDateEquals";

export default function SelectedDateNotResultMsg() {
  const { selectedDate } = useLogStore();

  if (!selectedDate) return <p>Selecione uma data</p>;

  const isToday = isDateEqual(selectedDate, new Date());
  if (isToday) return <p>Nenhum registro para hoje</p>;

  return <p>Nenhum registro para data {defaultDateFormat(selectedDate)}</p>;
}
