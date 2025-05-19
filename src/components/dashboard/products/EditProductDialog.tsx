import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Product } from "@/types/Product.type";
import { useState } from "react";

type EditProductModalProps = {
  product: Product;
};

export default function EditProductDialog({ product }: EditProductModalProps) {
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
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <ProductForm product={product} onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
