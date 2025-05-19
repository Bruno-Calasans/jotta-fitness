import { Info } from "lucide-react";

type InfoMsgProps = {
  children: React.ReactNode;
};

export default function InfoMsg({ children }: InfoMsgProps) {
  return (
    <div className="flex items-center gap-1 bg-indigo-600 p-2 rounded-sm text-sm">
      <Info /> {children}
    </div>
  );
}
