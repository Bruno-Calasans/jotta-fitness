import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InvestmentForm from "./InvestmentForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Investment } from "@/types/Investment.type";
import { useState } from "react";

type EditInvestmentModalProps = {
  investment: Investment;
};

export default function EditInvestmentDialog({
  investment,
}: EditInvestmentModalProps) {
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
          <DialogTitle>Editar Investimento</DialogTitle>
        </DialogHeader>
        <InvestmentForm investment={investment} onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
