import { cn } from "@/lib/utils";

type HomeSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

export default function HomeSection({
  id,
  className,
  children,
  title,
  subtitle,
}: HomeSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "text-white flex flex-col items-center h-full py-10 rounded-sm mx-5",
        className
      )}
    >
      {/* Header */}
      <header className="flex flex-col items-center">
        {/* Title */}
        <p className="text-4xl font-bold text-orange-500">{title}</p>
        {/* Subtitle */}
        <p className="text-lg text-white">{subtitle}</p>
      </header>
      {/* Content */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 w-full p-10">
        {children}
      </div>
    </section>
  );
}
