import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MemberForm from "./MemberForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Member } from "@/types/Member.type";
import { useState } from "react";

type EditMemberModalProps = {
  member: Member;
};

export default function EditMemberDialog({ member }: EditMemberModalProps) {
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
          <DialogTitle>Editar Membro</DialogTitle>
        </DialogHeader>
        <MemberForm member={member} onSubmit={submitFormHandler} />
      </DialogContent>
    </Dialog>
  );
}
