export type ServiceItemData = {
  title: string;
  desc: string;
  url: string;
};

type ServiceItemProps = {
  item: ServiceItemData;
};

export default function ServiceItem({ item }: ServiceItemProps) {
  return (
    <div
      key={item.title}
      className="flex flex-col justify-between gap-2 relative bg-stone-900  h-full overflow-hidden shadow-sm shadow-black mx-auto hover:opacity-90 cursor-pointer w-full border-b-orange-500 border-b-2"
    >
      <img src={item.url} alt={item.title} className="h-42 " />
      {/* Desc */}
      <div className="flex flex-col items-center p-4 flex-1">
        <p className="text-xl font-bold text-orange-500 text-center">
          {item.title}
        </p>
        <p className="text-sm text-white text-center">{item.desc}</p>
      </div>
    </div>
  );
}
