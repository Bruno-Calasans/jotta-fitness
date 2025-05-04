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
import { formatDate } from "date-fns";

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
            formatDate(selectedDate, "d/M/Y") != formatDate(new Date(), "d/M/Y")
          }
          className="bg-emerald-500 hover:bg-emerald-600 font-bold"
        >
          <Plus />
          Inscrever
        </Button>
      </DialogTrigger>
      {/* Subscribe form */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inscrever</DialogTitle>
        </DialogHeader>
        <EnrollmentLogForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
