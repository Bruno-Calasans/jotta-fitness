import { addDays, addMonths, lastDayOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import DatePicker from "@/components/custom/others/DatePicker";

type ExpireDatePickerProps = {
  months: number;
  value?: Date;
  onChange: (value: Date) => void;
};

export type MinMaxDates = {
  min: Date;
  max: Date;
};

export default function ExpireDatePicker({
  value,
  months,
  onChange,
}: ExpireDatePickerProps) {
  const [minMaxDates, setMinMaxDates] = useState<MinMaxDates>({
    min: new Date(),
    max: new Date(),
  });

  useEffect(() => {
    if (months > 0) {
      // Go to first day of the month
      const minDate = addDays(new Date(), months * 31);
      minDate.setDate(1);

      // Go to last day of the month
      const maxDate = lastDayOfMonth(minDate);

      setMinMaxDates({
        min: minDate,
        max: maxDate,
      });

      // Update
      onChange(minDate);
    }
  }, [months]);

  return (
    <DatePicker
      className="w-full"
      value={value || addMonths(new Date(), 1)}
      onSelect={onChange}
      minDate={minMaxDates.min}
      maxDate={minMaxDates.max}
    />
  );
}
