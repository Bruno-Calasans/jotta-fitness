import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import useCustomToast from "@/hooks/use-custom-toast";
import { useMemberStore } from "@/store/memberStore";
import { Purchase } from "@/types/Purchase.type";
import RemoveDialog from "@/components/custom/dialogs/RemoveDialog";

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
    <RemoveDialog title="Remover compra" onRemove={removeSubscriptionHandler}>
      <div>
        Tem certeza que deseja excluir a compra de{" "}
        <span className="font-bold">{purchase.amount}</span>x{" "}
        <span className="font-bold text-orange-500">
          {purchase.product.name}
        </span>
        ?
      </div>
    </RemoveDialog>
  );
}
