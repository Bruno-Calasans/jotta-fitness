import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

type SelectorData<ItemType> = {
  label: string;
  value: string;
  item?: ItemType;
};

type SelectorProps<ItemType> = {
  value?: string;
  data: SelectorData<ItemType>[];
  onValueChange?: (value: string) => void;
  onItemSelect?: (item: ItemType) => void;
  itemAcessorKey?: keyof ItemType;
  placeholder?: string;
  defaultValue?: string;
};

export default function Selector<ItemType>({
  value,
  data,
  itemAcessorKey,
  placeholder,
  defaultValue,
  onItemSelect,
  onValueChange,
}: SelectorProps<ItemType>) {
  const [innerValue, setInnerValue] = useState(defaultValue);

  const changeHandler = (selectedValue: string) => {
    const foundItem = data
      .map(({ item }) => item)
      .find((item) => {
        if (item && itemAcessorKey)
          return (
            (item[itemAcessorKey] as string).toLowerCase() ===
            selectedValue.toLowerCase()
          );
      });
    if (foundItem && onItemSelect) onItemSelect(foundItem);
    if (onValueChange) onValueChange(selectedValue);
    if (!onValueChange) setInnerValue(selectedValue);
  };

  useEffect(() => {
    if (defaultValue) changeHandler(defaultValue);
  }, [defaultValue]);

  return (
    <Select value={value || innerValue} onValueChange={changeHandler}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder || "Selecione um item"} />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {data.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
