import { Input } from "@/components/ui/input";
import dateToInputFormat from "@/utils/dateToInputFormat";
import inputFormatToDate from "@/utils/inputFormatToDate";
import { ChangeEventHandler } from "react";

type DatePickerProps = {
  value?: Date;
  onSelect: (value: Date) => void;
};

export default function DatePicker({ value, onSelect }: DatePickerProps) {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onSelect(inputFormatToDate(target.value));
  };

  return (
    <Input
      type="date"
      value={dateToInputFormat(value || new Date())}
      onChange={changeHandler}
      className="w-fit bg-white text-black"
    />
  );
}
