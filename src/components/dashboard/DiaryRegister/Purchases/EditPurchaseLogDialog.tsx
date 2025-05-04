import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import PurchaseLogForm from "./PurchaseLogForm";
import type { Log } from "@/types/Log.type";

type EditPurchaseLogDialogProps = {
  purchaseLog: Log & { type: "product-purchase" };
};

export default function EditPurchaseLogDialog({
  purchaseLog,
}: EditPurchaseLogDialogProps) {
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
        <PurchaseLogForm
          purchaseLog={purchaseLog}
          onSubmit={submitFormHandler}
        />
      </DialogContent>
    </Dialog>
  );
}
