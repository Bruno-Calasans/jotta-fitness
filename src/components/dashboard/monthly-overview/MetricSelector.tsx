import { MultiSelect } from "@/components/custom/others/MultiSelect";
import { METRICS } from "@/data/METRIC_DATA";
import { useState } from "react";

type MetricSelectorProps = {
  onValueChange: (values: string[]) => void;
};

export default function MetricSelector({ onValueChange }: MetricSelectorProps) {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "profit",
  ]);

  const valueChangeHandler = (value: string[]) => {
    onValueChange(value);
    setSelectedFrameworks(value);
  };

  return (
    <MultiSelect
      options={METRICS}
      onValueChange={valueChangeHandler}
      defaultValue={selectedFrameworks}
      placeholder="Selecione uma ou várias métricas"
      variant="inverted"
      maxCount={5}
    />
  );
}
