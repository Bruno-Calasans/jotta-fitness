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
import { useLogStore } from "@/store/logStore";
import PlanDiaryLogForm from "./PlanDiaryLogForm";
import isDateEqual from "@/utils/isDateEquals";

export default function CreatePlanDiaryLogDialog() {
  const [open, setOpen] = useState(false);
  const { selectedDate } = useLogStore();

  const submitFormHandler = (success: boolean) => {
    if (success) setOpen(false);
  };

  const isToday = selectedDate && isDateEqual(selectedDate, new Date());

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button to subscribe */}
      <DialogTrigger asChild>
        <Button
          disabled={!isToday}
          className="bg-emerald-500 hover:bg-emerald-600 font-bold"
        >
          <Plus />
          Novo
        </Button>
      </DialogTrigger>
      {/* Subscribe form */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Diária</DialogTitle>
        </DialogHeader>
        <PlanDiaryLogForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
