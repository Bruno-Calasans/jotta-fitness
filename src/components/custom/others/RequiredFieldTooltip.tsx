import {
  Arrow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Asterisk } from "lucide-react";

type RequiredFieldTooltipProps = {
  children: React.ReactNode;
};

export default function RequiredFieldTooltip({
  children,
}: RequiredFieldTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <p className="flex items-center">
          {children}
          <TooltipTrigger>
            <Asterisk size={16} className="font-bold text-red-500" />
          </TooltipTrigger>
        </p>

        <TooltipContent>
          <p>Campo obrigatório</p>
          <Arrow />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
