import { Badge } from "@/components/ui/badge";
import { BicepsFlexed } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BUSINESS_RULES } from "@/config/BusinessRules";

export default function VeteranBadge() {
  return (
    <Badge className="text-[10px]  p-[2px] bg-orange-500 hover:bg-orange-600 cursor-pointer">
      <BicepsFlexed size={20} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Veterano</TooltipTrigger>
          <TooltipContent side="right" align="center" sideOffset={8}>
            <p>
              Conta criada a mais de {BUSINESS_RULES.daysBeforeVeteran} dias.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Badge>
  );
}
