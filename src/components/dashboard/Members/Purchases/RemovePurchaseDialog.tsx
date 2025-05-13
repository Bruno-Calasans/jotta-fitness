import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import useCustomToast from "@/hooks/use-custom-toast";
import { useMemberStore } from "@/store/memberStore";
import { Purchase } from "@/types/Purchase.type";

type RemovePurchaseDialogProps = {
  purchase: Purchase;
};

export default function RemovePurchaseDialog({
  purchase,
}: RemovePurchaseDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { selectedMember, removePurchase } = useMemberStore();

  if (!selectedMember) return null;

  const removeSubscriptionHandler = () => {
    try {
      removePurchase(selectedMember.id, purchase.id);
      successToast("Remover compra", "Compra removida com sucesso!");
    } catch (error) {
      errorToast("Remover compra", "Erro ao remover compra!");
    }
  };

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
          <DialogTitle>RemoverCompra</DialogTitle>
          <div>
            Tem certeza que deseja excluir a compra{" "}
            <span className="font-bold text-orange-500">
              {purchase.product.name}
            </span>
            ?
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="bg-stone-500 hover:bg-stone-600 transition-all"
              type="button"
            >
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={removeSubscriptionHandler}
              className="bg-red-500 hover:bg-red-600 transition-all"
              type="submit"
            >
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
