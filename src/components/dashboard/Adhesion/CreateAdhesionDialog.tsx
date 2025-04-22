import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AdhesionForm from "./AdhesionForm";
import { useState } from "react";

type CreateAdhesionModalProps = {};

export default function CreateAdhesionDialog({}: CreateAdhesionModalProps) {
  const [open, setOpen] = useState(false);

  const submitFormHandler = (success: boolean) => {
    if (success) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 font-bold">
          <Plus />
          Criar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Adesão</DialogTitle>
        </DialogHeader>
        <AdhesionForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
