import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlanForm from "./PlanForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Plan } from "@/types/Plan.type";
import PlanEditForm from "./PlanEditForm";

type EditPlanModalProps = {
  plan: Plan;
};

export default function EditPlanDialog({ plan }: EditPlanModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-1"
        >
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Plano</DialogTitle>
          <PlanEditForm plan={plan} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
