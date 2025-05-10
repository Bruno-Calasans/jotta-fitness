import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectorData<ItemType> = {
  label: string;
  value: string;
  item?: ItemType;
};

type SelectorProps<ItemType> = {
  value?: string;
  data: SelectorData<ItemType>[];
  onValueChange: (value: string) => void;
  onItemSelect?: (item: ItemType) => void;
  itemAcessorKey?: keyof ItemType;
  placeholder?: string;
};

export default function Selector<ItemType>({
  value,
  data,
  itemAcessorKey,
  placeholder,
  onItemSelect,
  onValueChange,
}: SelectorProps<ItemType>) {
  const changeHandler = (value: string) => {
    const foundItem = data
      .map(({ item }) => item)
      .find((item) => {
        if (item && itemAcessorKey)
          return (
            (item[itemAcessorKey] as string).toLowerCase() ===
            value.toLowerCase()
          );
      });

    if (foundItem && onItemSelect) onItemSelect(foundItem);
    onValueChange(value);
  };

  return (
    <Select value={value} onValueChange={changeHandler}>
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
