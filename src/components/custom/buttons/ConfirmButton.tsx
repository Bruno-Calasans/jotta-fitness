import { Button } from "@/components/ui/button";

type ConfirmButtonProps = {
  isEditing?: boolean;
};

export default function ConfirmButton({ isEditing }: ConfirmButtonProps) {
  return (
    <Button
      id="form-confirm-button"
      className="bg-indigo-500 hover:bg-indigo-600 transition-all"
      type="submit"
    >
      {isEditing ? "Salvar" : "Criar"}
    </Button>
  );
}
