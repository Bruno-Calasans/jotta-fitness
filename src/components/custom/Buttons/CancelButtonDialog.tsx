import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function CancelButtonDialog() {
  return (
    <DialogClose asChild>
      <Button
        className="bg-stone-500 hover:bg-stone-600 transition-all"
        type="button"
      >
        Cancelar
      </Button>
    </DialogClose>
  );
}
