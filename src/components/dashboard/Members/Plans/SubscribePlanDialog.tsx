import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import SubscribePlanForm from "./SubscribePlanForm";
import { useState } from "react";
import { useMemberStore } from "@/store/memberStore";

export default function SubscribePlanDialog() {
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
          {selectedMember.planPayments.length === 0 ? "Inscrever" : "Renovar"}
        </Button>
      </DialogTrigger>
      {/* Subscribe form */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inscrever</DialogTitle>
        </DialogHeader>
        <SubscribePlanForm onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
