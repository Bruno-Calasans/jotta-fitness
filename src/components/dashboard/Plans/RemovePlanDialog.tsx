import type { Plan } from "@/types/Plan.type";
import { usePlanStore } from "@/store/planStore";
import useCustomToast from "@/hooks/use-custom-toast";
import RemoveDialog from "@/components/custom/dialogs/RemoveDialog";

type RemovePlanDialogProps = {
  plan: Plan;
};

export default function RemovePlanDialog({ plan }: RemovePlanDialogProps) {
  const { successToast, errorToast } = useCustomToast();
  const { remove } = usePlanStore();

  const removePlanHandler = () => {
    try {
      remove(plan.id);
      successToast("Exclusão de Plano", "Plano removido com sucesso!");
    } catch (error) {
      errorToast("Exclusão de Plano", "Erro ao remover plano");
    }
  };

  return (
    <RemoveDialog title="Remover Plano" onRemove={removePlanHandler}>
      <div>
        Tem certeza que deseja excluir o plano{" "}
        <span className="font-bold text-orange-500">{plan.name}</span>?
      </div>
    </RemoveDialog>
  );
}
