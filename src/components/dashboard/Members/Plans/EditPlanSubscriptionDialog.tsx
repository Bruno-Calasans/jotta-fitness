import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import SubscribePlanForm from "./SubscribePlanForm";
import { PlanPayment } from "@/types/Payment.type";

type EditPlanSubscriptionDialogProps = {
  planPayment: PlanPayment;
};

export default function EditPlanSubscriptionDialog({
  planPayment,
}: EditPlanSubscriptionDialogProps) {
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
        <SubscribePlanForm
          planPayment={planPayment}
          onSubmit={submitFormHandler}
        />
      </DialogContent>
    </Dialog>
  );
}
