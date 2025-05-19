import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";

export default function RemoveButtonDialogTrigger() {
  return (
    <DialogTrigger asChild>
      <Button
        variant="ghost"
        className="w-full flex items-center justify-start gap-1"
      >
        <Trash className="h-4 w-4" />
        Remover
      </Button>
    </DialogTrigger>
  );
}
