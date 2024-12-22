import { IconType } from "@icons-pack/react-simple-icons";

export type BenefitItemData = {
  title: string;
  desc: string;
  icon: IconType;
};

type BenefitItemProps = {
  item: BenefitItemData;
};

export default function BenefitItem({ item }: BenefitItemProps) {
  return (
    <div key={item.title} className="flex flex-col items-center gap-0">
      <item.icon
        size={60}
        className="rounded-full bg-stone-900 text-orange-500 hover:bg-orange-500 hover:text-white p-1 cursor-pointer transition-all"
      />
      {/* Desc */}
      <div className="flex justify-center flex-col items-center">
        <p className="text-xl font-bold text-white text-center">{item.title}</p>
        <p className="text-sm text-stone-300 text-center">{item.desc}</p>
      </div>
    </div>
  );
}
