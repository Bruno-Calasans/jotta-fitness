import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

type ConfirmRemoveButtonProps = {
  onClickRemove: () => void;
};

export default function ConfirmRemoveButton({
  onClickRemove,
}: ConfirmRemoveButtonProps) {
  return (
    <DialogClose asChild>
      <Button
        onClick={onClickRemove}
        className="bg-red-500 hover:bg-red-600 transition-all"
        type="submit"
      >
        Excluir
      </Button>
    </DialogClose>
  );
}
