import { Badge } from "@/components/ui/badge";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import { useMemberStore } from "@/store/memberStore";
import { Baby, BicepsFlexed } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BUSINESS_RULES } from "@/config/BusinessRules";
import { cn } from "@/lib/utils";

export default function MemberSinceInfo() {
  const { selectedMember } = useMemberStore();
  const { isNewbie } = useEnrollmentResume();

  return (
    <div className="flex items-center gap-1 text-md text-stone-300">
      <span className="font-bold">Membro desde:</span>{" "}
      {selectedMember
        ? selectedMember.createdAt.toLocaleDateString()
        : "Ainda não é membro"}{" "}
      <Badge
        className={cn(
          "text-[10px]  p-[2px] bg-amber-500 hover:bg-amber-600 cursor-pointer",
          isNewbie && "bg-indigo-500 hover:bg-indigo-600"
        )}
      >
        {isNewbie ? <Baby size={20} /> : <BicepsFlexed size={20} />}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{isNewbie ? "Novato" : "Veterano"}</TooltipTrigger>
            <TooltipContent side="right" align="center" sideOffset={8}>
              <p>
                Esta conta tem {isNewbie ? "menos" : "mais"} que{" "}
                {BUSINESS_RULES.daysBeforeVeteran} dias
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Badge>
    </div>
  );
}
