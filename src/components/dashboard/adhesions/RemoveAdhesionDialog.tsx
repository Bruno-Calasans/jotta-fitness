import { Adhesion } from "@/types/Adhesion.type";
import { useAdhesionStore } from "@/store/adhesionStore";
import useCustomToast from "@/hooks/use-custom-toast";
import RemoveDialog from "@/components/custom/dialogs/RemoveDialog";

type RemoveAdhesionDialogProps = {
  adhesion: Adhesion;
};

export default function RemoveAdhesionDialog({
  adhesion,
}: RemoveAdhesionDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { remove } = useAdhesionStore();

  const removeAdhesionHandler = () => {
    try {
      remove(adhesion.id);
      successToast("Exclusão de Adesão", "Adesão removida com sucesso!");
    } catch (error) {
      errorToast("Exclusão de Adesão", "Erro ao remover adesão");
    }
  };

  return (
    <RemoveDialog title="Remover Adesão" onRemove={removeAdhesionHandler}>
      <div>
        Tem certeza que deseja excluir a adesão do ano{" "}
        <span className="font-bold">{adhesion.year}</span>?
      </div>
    </RemoveDialog>
  );
}
