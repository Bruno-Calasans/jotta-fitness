import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";
import { Product } from "@/types/Product.type";
import { useState } from "react";
import ProductExpireForm from "./ProductExpireForm";

type EditProductExpireAmountModalProps = {
  product: Product;
};

export default function EditProductExpireAmountDialog({
  product,
}: EditProductExpireAmountModalProps) {
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
          <CalendarClock className="h-4 w-4" />
          Editar Expirados
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Quantidade Expirada</DialogTitle>
        </DialogHeader>
        <ProductExpireForm product={product} onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
