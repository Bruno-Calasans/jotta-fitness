import { TriangleAlert } from "lucide-react";

type WarningMsgProps = {
  children: React.ReactNode;
};

export default function WarningMsg({ children }: WarningMsgProps) {
  return (
    <div className="flex items-center gap-1 bg-yellow-600 p-2 rounded-sm text-sm">
      <TriangleAlert /> {children}
    </div>
  );
}
