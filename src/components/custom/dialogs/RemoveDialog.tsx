import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";

type RemoveDialogProps = {
  title?: React.ReactNode;
  removeBtnTitle?: React.ReactNode;
  cancelBtnTitle?: React.ReactNode;
  removeBtn?: React.ReactNode;
  children: React.ReactNode;
  onRemove: () => void;
  onOpenChange?: (open: boolean) => void;
};

export default function RemoveDialog({
  title,
  removeBtn,
  children,
  removeBtnTitle,
  cancelBtnTitle,
  onRemove,
  onOpenChange,
}: RemoveDialogProps) {
  const [open, setOpen] = useState(false);

  const openChangeHandler = (value: boolean) => {
    setOpen(value);
    if (onOpenChange) onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      {/* Trigger */}
      <DialogTrigger asChild>
        {removeBtn || (
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start gap-1"
          >
            <Trash className="h-4 w-4" />
            Remover
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        {/* Title */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Descsription Content */}
        <DialogDescription asChild>{children}</DialogDescription>

        {/* Actions */}
        <DialogFooter>
          {/* Cancel button */}
          <DialogClose asChild>
            <Button
              className="bg-stone-500 hover:bg-stone-600 transition-all"
              type="button"
            >
              {cancelBtnTitle || "Cancelar"}
            </Button>
          </DialogClose>
          {/* Confirm button */}
          <DialogClose asChild>
            <Button
              onClick={onRemove}
              type="button"
              // onClick={onRemove}
              className="bg-red-500 hover:bg-red-600 transition-all"
            >
              {removeBtnTitle || "Excluir"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
