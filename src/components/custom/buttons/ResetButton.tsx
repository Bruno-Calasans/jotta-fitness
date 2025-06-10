import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

type ResetButtonProps = {
  btnTitle?: React.ReactNode;
  onReset?: () => void;
};

export default function ResetButton({ btnTitle, onReset }: ResetButtonProps) {
  return (
    <Button
      id="id-reset-button"
      className="bg-orange-500 hover:bg-orange-600 transition-all"
      type="reset"
      title="Restaura campos para os valores padrões"
      onClick={onReset}
    >
      <Eraser size={16} />
      {btnTitle || "Resetar"}
    </Button>
  );
}
