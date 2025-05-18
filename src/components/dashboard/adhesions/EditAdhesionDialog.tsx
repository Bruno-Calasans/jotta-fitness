import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdhesionForm from "./AdhesionForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Adhesion } from "@/types/Adhesion.type";
import { useState } from "react";

type EditAdhesionModalProps = {
  adhesion: Adhesion;
};

export default function EditAdhesionDialog({
  adhesion,
}: EditAdhesionModalProps) {
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
          <DialogTitle>Editar Adesão</DialogTitle>
        </DialogHeader>
        <AdhesionForm adhesion={adhesion} onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
