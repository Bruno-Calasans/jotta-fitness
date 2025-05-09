import Selector from "@/components/custom/Selector";

const lossTypeData = [
  {
    label: "Despesa",
    value: "expense",
  },
  { label: "Investimento", value: "investment" },
];

type LossSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export default function LossTypeSelector({
  value,
  onValueChange,
}: LossSelectorProps) {
  return (
    <Selector
      value={value}
      data={lossTypeData}
      onValueChange={onValueChange}
      placeholder="Selecione um tipo de perda"
    />
  );
}
