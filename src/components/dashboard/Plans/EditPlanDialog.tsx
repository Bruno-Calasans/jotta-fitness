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
import { useState } from "react";

type EditPlanModalProps = {
  plan: Plan;
};

export default function EditPlanDialog({ plan }: EditPlanModalProps) {
  const [open, setOpen] = useState(false);

  const submitFormHandler = (success: boolean) => {
    if (success) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        </DialogHeader>
        <PlanForm plan={plan} onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
