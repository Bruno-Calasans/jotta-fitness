import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";

type RemoveDialogProps = {
  onRemove: () => void;
  title?: React.ReactNode;
  removeBtnTitle?: React.ReactNode;
  cancelBtnTitle?: React.ReactNode;
  children: React.ReactNode;
};

export default function RemoveDialog({
  title,
  children,
  removeBtnTitle,
  cancelBtnTitle,
  onRemove,
}: RemoveDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-1"
        >
          <Trash className="h-4 w-4" />
          Remover
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {children}
        </DialogHeader>
        <DialogFooter>
          {/* Cancel button */}
          <DialogClose asChild>
            <Button
              className="bg-stone-500 hover:bg-stone-600 transition-all"
              type="button"
            >
              {cancelBtnTitle || "Cancelar"}
            </Button>
            {/* Confirm Button */}
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={onRemove}
              className="bg-red-500 hover:bg-red-600 transition-all"
              type="submit"
            >
              {removeBtnTitle || "Excluir"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
