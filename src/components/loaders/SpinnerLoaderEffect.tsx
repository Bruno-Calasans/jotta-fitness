import { cn } from "@/lib/utils";

type SpinnerLoaderEffectProps = {
  classeNames?: {
    container?: string;
    spinner?: string;
  };
};

export default function SpinnerLoaderEffect({
  classeNames,
}: SpinnerLoaderEffectProps) {
  return (
    <div
      className={cn("flex justify-center items-center", classeNames?.container)}
    >
      <div
        className={cn(
          "animate-spin w-6 h-6 rounded-full border-4 border-t-orange-500 border-b-4 border-r-orange-500 border-b-orange-500 ",
          classeNames?.spinner,
        )}
      ></div>
    </div>
  );
}
