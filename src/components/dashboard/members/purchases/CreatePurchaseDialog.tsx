import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import PurchaseForm from "./PurchaseForm";
import { useState } from "react";
import { useMemberStore } from "@/store/memberStore";

export default function CreatePurchaseDialog() {
  const [open, setOpen] = useState(false);
  const { selectedMember } = useMemberStore();

  const submitFormHandler = (success: boolean) => {
    if (success) setOpen(false);
  };

  if (!selectedMember) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button to subscribe */}
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 font-bold">
          <Plus />
          Comprar
        </Button>
      </DialogTrigger>
      {/* Subscribe form */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comprar Produto</DialogTitle>
        </DialogHeader>
        <PurchaseForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
