import { cn } from "@/lib/utils";

type ReportInfoProps = {
  title: string;
  subtitle: string;
  classnames?: {
    container?: string;
    title?: string;
    subtitle?: string;
  };
};

export default function ReportInfo({
  title,
  subtitle,
  classnames,
}: ReportInfoProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border-2 border-emerald-500 rounded-md w-fit p-2 text-emerald-50",
        classnames?.container
      )}
    >
      <p className={cn("text-lg font-bold text-center", classnames?.title)}>
        {title}
      </p>
      <p className={cn("text-md text-emerald-200", classnames?.subtitle)}>
        {subtitle}
      </p>
    </div>
  );
}
