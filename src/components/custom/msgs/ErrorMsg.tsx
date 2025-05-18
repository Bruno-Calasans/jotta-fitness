import { OctagonX } from "lucide-react";

type ErrorMsgProps = {
  children: React.ReactNode;
};

export default function ErrorMsg({ children }: ErrorMsgProps) {
  return (
    <div className="flex items-center gap-1 bg-red-600 p-2 rounded-sm text-sm">
      <OctagonX /> {children}
    </div>
  );
}
