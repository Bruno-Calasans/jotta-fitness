import { cn } from "@/lib/utils";

type ContentContainerProps = {
  children: React.ReactNode;
  classname?: string;
};

export default function ContentContainer({
  children,
  classname,
}: ContentContainerProps) {
  return (
    <main
      id="content-container"
      className={cn(
        "flex flex-col gap-5 flex-1 lg:max-w-[1000px] md:max-w-[800px] sm:max-w-[400px] m-auto p-2 mt-5",
        classname
      )}
    >
      {children}
    </main>
  );
}
