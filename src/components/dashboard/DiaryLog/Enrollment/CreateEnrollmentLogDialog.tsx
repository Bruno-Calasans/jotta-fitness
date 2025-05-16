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
import EnrollmentLogForm from "./EnrollmentLogForm";
import { useLogStore } from "@/store/logStore";
import defaultDateFormat from "@/utils/defaultDateFormat";

export default function CreateEnrollmentLogDialog() {
  const [open, setOpen] = useState(false);
  const { selectedDate } = useLogStore();

  const submitFormHandler = (success: boolean) => {
    if (success) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button to subscribe */}
      <DialogTrigger asChild>
        <Button
          disabled={
            selectedDate &&
            defaultDateFormat(selectedDate) != defaultDateFormat(new Date())
          }
          className="bg-emerald-500 hover:bg-emerald-600 font-bold"
        >
          <Plus />
          Novo
        </Button>
      </DialogTrigger>
      {/* Subscribe form */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar Inscrição</DialogTitle>
        </DialogHeader>
        <EnrollmentLogForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
