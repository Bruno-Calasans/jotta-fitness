import useCustomToast from "@/hooks/use-custom-toast";
import RemoveDialog from "@/components/custom/dialogs/RemoveDialog";
import { useMemberStore } from "@/store/memberStore";
import { useLogStore } from "@/store/logStore";
import type { Enrollment } from "@/types/Enrollment.type";

type RemoveEnrollmentDialogProps = {
  enrollment: Enrollment;
};

export default function RemoveEnrollmentDialog({
  enrollment,
}: RemoveEnrollmentDialogProps) {
  const { selectedMember, removeEnrollment } = useMemberStore();
  const logDb = useLogStore();
  const { successToast, errorToast } = useCustomToast();

  if (!selectedMember) return null;

  const removeSubscriptionHandler = () => {
    try {
      removeEnrollment(selectedMember.id, enrollment.id);
      const enrollmentLog = logDb.getByEnrollmentId(enrollment.id);
      if (enrollmentLog) logDb.remove(enrollmentLog.id);
      successToast("Cancelar inscrição", "Cancelada com sucesso");
    } catch (error) {
      errorToast("Cancelar inscrição", "Erro ao cancelar inscrição");
    }
  };

  return (
    <RemoveDialog
      title="Cancelar Inscrição"
      removeBtnTitle="Sim"
      cancelBtnTitle="Não"
      onRemove={removeSubscriptionHandler}
    >
      <div>
        Tem certeza que deseja cancelar a inscrição no plano{" "}
        <span className="font-bold text-orange-500">
          {enrollment.plan.name}
        </span>
        ?
      </div>
    </RemoveDialog>
  );
}
