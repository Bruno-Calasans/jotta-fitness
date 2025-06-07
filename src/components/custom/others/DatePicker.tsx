import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import dateToInputFormat from "@/utils/dateToInputFormat";
import inputFormatToDate from "@/utils/inputFormatToDate";
import { ChangeEventHandler } from "react";

type DatePickerProps = {
  value?: Date | null;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  onSelect: (value: Date) => void;
};

export default function DatePicker({
  value,
  className,
  minDate,
  maxDate,
  onSelect,
}: DatePickerProps) {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onSelect(inputFormatToDate(target.value));
  };

  return (
    <Input
      type="date"
      value={dateToInputFormat(value || new Date())}
      onChange={changeHandler}
      className={cn("w-fit bg-white text-black", className)}
      min={minDate ? dateToInputFormat(minDate) : undefined}
      max={maxDate ? dateToInputFormat(maxDate) : undefined}
    />
  );
}
