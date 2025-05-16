import { Badge } from "@/components/ui/badge";
import { Baby } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BUSINESS_RULES } from "@/config/BusinessRules";

export default function NewbieBadge() {
  return (
    <Badge
      className={
        "text-[10px]  p-[2px] bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
      }
    >
      <Baby size={20} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Novato</TooltipTrigger>
          <TooltipContent side="right" align="center" sideOffset={8}>
            <p>
              Conta criada a menos de {BUSINESS_RULES.daysBeforeVeteran} dias.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Badge>
  );
}
