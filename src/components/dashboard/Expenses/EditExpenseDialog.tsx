import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Expense } from "@/types/Expense.type";
import { useState } from "react";

type EditExpenseModalProps = {
  expense: Expense;
};

export default function EditExpenseDialog({ expense }: EditExpenseModalProps) {
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
          <DialogTitle>Editar Despesa</DialogTitle>
        </DialogHeader>
        <ExpenseForm expense={expense} onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
