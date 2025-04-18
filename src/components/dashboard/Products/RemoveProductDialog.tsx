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
import { Product } from "@/types/Product.type";
import { useProductStore } from "@/store/productStore";
import useCustomToast from "@/hooks/use-custom-toast";

type RemoveProductDialogProps = {
  product: Product;
};

export default function RemoveProductDialog({
  product,
}: RemoveProductDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { remove } = useProductStore();

  const removeProductHandler = () => {
    try {
      remove(product.id);
      successToast("Exclusão de Produto", "Produto removido com sucesso!");
    } catch (error) {
      errorToast("Exclusão de Produto", "Erro ao remover produto");
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
          <DialogTitle>Remover Produto</DialogTitle>
          <div>
            Tem certeza que deseja excluir o produto{" "}
            <span className="font-bold">"{product.name}"</span>?
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
              onClick={removeProductHandler}
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
