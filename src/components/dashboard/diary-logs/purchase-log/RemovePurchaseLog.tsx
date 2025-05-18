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
import { useLogStore } from "@/store/logStore";
import { useMemberStore } from "@/store/memberStore";
import type { PurchaseLog } from "@/types/Log.type";

type RemovePurchaseLogDialogProps = {
  purchaseLog: PurchaseLog;
};

export default function RemovePurchaseLogDialog({
  purchaseLog,
}: RemovePurchaseLogDialogProps) {
  const logDb = useLogStore();
  const memberDb = useMemberStore();
  const { successToast, errorToast } = useCustomToast();

  const removePurchaseLogHandler = () => {
    try {
      if (purchaseLog.member)
        memberDb.removePurchase(purchaseLog.member.id, purchaseLog.purchase.id);
      logDb.remove(purchaseLog.id);
      successToast(
        "Exclusão de Registro de Inscrição",
        "Registro removido com sucesso!",
      );
    } catch (error) {
      errorToast(
        "Exclusão de Registro de Inscrição",
        "Erro ao remover registro de inscrição",
      );
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
          <DialogTitle>Remover Inscrição</DialogTitle>
          <div>
            Tem certeza que deseja excluir a compra do produto{" "}
            <span className="font-bold text-orange-500">
              {purchaseLog.purchase.product.name}
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
              onClick={removePurchaseLogHandler}
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
