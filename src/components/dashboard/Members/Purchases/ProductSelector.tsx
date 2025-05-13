import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductStore } from "@/store/productStore";
import { Product } from "@/types/Product.type";
import { cn } from "@/lib/utils";

type ProductSelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSelected: (product: Product) => void;
};

export function ProductSelector({
  value,
  onValueChange,
  onSelected,
}: ProductSelectorProps) {
  const { products, getByName } = useProductStore();

  const changeHandler = (value: string) => {
    const product = getByName(value)!;
    onValueChange(value);
    onSelected(product);
  };

  return (
    <Select value={value} onValueChange={changeHandler}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um produto" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          {products.map((product) => (
            <SelectItem
              key={product.id}
              value={product.name}
              disabled={product.amount === 0}
            >
              <p
                className={cn(product.amount === 0 && "text-red-500 font-bold")}
              >
                {product.name}{" "}
                {product.amount === 0 ? (
                  <span>(Sem estoque)</span>
                ) : (
                  `(${product.amount})`
                )}
              </p>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
