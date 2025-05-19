import { cn } from "@/lib/utils";

type PingLoaderEffectProps = {
  classNames?: {
    container?: string;
    pulse?: string;
    ball?: string;
  };
};

export default function PingLoaderEffect({
  classNames,
}: PingLoaderEffectProps) {
  return (
    <div
      className={cn(
        "relative flex h-5 w-5 items-center justify-center",
        classNames?.container,
      )}
    >
      <div
        className={cn(
          "absolute animate-ping bg-orange-400 w-full h-full rounded-full",
          classNames?.pulse,
        )}
      ></div>

      <div
        className={cn(
          "absolute bg-orange-600 rounded-full w-4 h-4",
          classNames?.ball,
        )}
      ></div>
    </div>
  );
}
