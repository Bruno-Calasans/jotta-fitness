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
import PurchaseForm from "./PurchaseForm";
import { Purchase } from "@/types/Purchase.type";

type EditPurchaseDialogProps = {
  purchase: Purchase;
};

export default function EditPurchaseDialog({
  purchase,
}: EditPurchaseDialogProps) {
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
          <DialogTitle>Editar Compra</DialogTitle>
        </DialogHeader>
        <PurchaseForm purchase={purchase} onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
