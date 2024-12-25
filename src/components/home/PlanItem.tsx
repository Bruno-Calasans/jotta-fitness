import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type PlanItemFeature = {
  title: string;
  has: boolean;
};

export type PlanItemData = {
  title: string;
  desc: string;
  features: PlanItemFeature[];
  price: number;
  diary: number;
  url: string;
};

type PlanItemProps = {
  item: PlanItemData;
};

export default function PlanItem({ item }: PlanItemProps) {
  return (
    <div className="flex flex-col justify-between gap-2 h-full overflow-hidden shadow-sm shadow-black mx-auto hover:opacity-90 w-full bg-stone-800 rounded-sm">
      <div className="flex flex-col items-center flex-1 gap-4">
        {/* Title */}
        <p className="text-xl font-bold text-white text-center  w-full bg-orange-600 p-2 border-b-2 border-orange-300">
          {item.title}
        </p>
        {/* Desc */}
        <p className="text-md text-center font-bold text-white">{item.desc}</p>

        {/* Features */}
        {item.features.map((feature) => (
          <div
            key={feature.title}
            className="flex justify-center items-center gap-1"
          >
            {feature.has ? (
              <Check size={16} className="text-emerald-500" />
            ) : (
              <X size={16} className="text-red-500" />
            )}
            <p className="text-sm">{feature.title}</p>
          </div>
        ))}

        {/* Prices */}
        <div className="flex flex-col items-center">
          {/* Price */}
          <p className="text-orange-500 text-4xl text-center font-bold flex flex-col">
            {item.price ? `R$ ${item.price}` : "Combinar"}
          </p>
          {/* Price */}
          <p className="text-orange-200 text-md font-bold">
            Diária R$ {item.diary}
          </p>
        </div>

        <Link
          href={item.url}
          target="_blank"
          className="flex items-end w-full h-full m-0 p-2"
        >
          <Button className="bg-emerald-500 hover:bg-emerald-600 font-bold rounded-md w-full transition-all">
            Matricular-se
          </Button>
        </Link>
      </div>
    </div>
  );
}
