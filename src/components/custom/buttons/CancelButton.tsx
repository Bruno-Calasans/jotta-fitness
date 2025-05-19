import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

type CancelButtonProps = {
  btnTitle?: React.ReactNode;
};

export default function CancelButton({ btnTitle }: CancelButtonProps) {
  return (
    <DialogClose asChild>
      <Button
        id="form-cancel-button"
        aria-label="Close"
        className="bg-red-500 hover:bg-red-600 transition-all"
        type="button"
      >
        {btnTitle || "Cancelar"}
      </Button>
    </DialogClose>
  );
}
