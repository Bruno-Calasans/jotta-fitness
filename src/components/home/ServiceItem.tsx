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
      className="flex flex-col justify-between gap-2 relative bg-stone-900  h-72 overflow-hidden shadow-sm shadow-black mx-auto hover:opacity-90 cursor-pointer w-full border-b-orange-500 border-b-2"
    >
      <img
        src={item.url}
        alt={item.title}
        className="h-40 w-full  border-b-4 border-stone-500 aspect-square min-w-[200px]:"
      />
      {/* Desc */}
      <div className="flex flex-col items-center p-2 flex-1">
        <p className="text-xl font-bold text-orange-500 text-center">
          {item.title}
        </p>
        <p className="text-sm text-white text-center">{item.desc}</p>
      </div>
    </div>
  );
}
