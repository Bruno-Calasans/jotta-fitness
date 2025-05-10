import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import PurchaseLogForm from "./PurchaseLogForm";
import { useLogStore } from "@/store/logStore";
import isDateEqual from "@/utils/isDateEquals";

export default function CreatePurchaseLogDialog() {
  const [open, setOpen] = useState(false);
  const { selectedDate } = useLogStore();

  const submitFormHandler = (success: boolean) => {
    if (success) setOpen(false);
  };

  const isToday = selectedDate && isDateEqual(selectedDate, new Date());

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={!isToday}
          className="bg-emerald-500 hover:bg-emerald-600 font-bold"
        >
          <Plus />
          Novo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Compra</DialogTitle>
        </DialogHeader>
        <PurchaseLogForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
