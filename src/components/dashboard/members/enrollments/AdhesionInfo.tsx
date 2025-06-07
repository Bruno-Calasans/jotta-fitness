import ErrorMsg from "@/components/custom/msgs/ErrorMsg";
import { Button } from "@/components/ui/button";
import { STAFF } from "@/data/MEMBERS_DATA";
import useCustomToast from "@/hooks/use-custom-toast";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import { useLogStore } from "@/store/logStore";
import { useMemberStore } from "@/store/memberStore";
import calcAdhesionPrice from "@/utils/calcAdhesionPrice";
import { Check } from "lucide-react";
import RemoveDialog from "@/components/custom/dialogs/RemoveDialog";

export default function AdhesionInfo() {
  const logDb = useLogStore();
  const { selectedMember, addAdhesionPayment } = useMemberStore();
  const { successToast, errorToast } = useCustomToast();
  const { lastEnrollment, currentAdhesion, isCurrentAdhesionPaid, isNewbie } =
    useEnrollmentResume();

  const adhesionPrice =
    currentAdhesion && lastEnrollment && selectedMember
      ? calcAdhesionPrice(currentAdhesion, lastEnrollment.plan, selectedMember)
      : 0;

  const payAdhesionHandler = () => {
    if (!selectedMember || !currentAdhesion || !lastEnrollment) return;
    try {
      const adhesionPayment = addAdhesionPayment(
        selectedMember.id,
        currentAdhesion.year
      );
      if (adhesionPayment) {
        logDb.add({
          type: "adhesion",
          adhesion: currentAdhesion,
          adhesionPayment,
          member: selectedMember,
          plan: lastEnrollment.plan,
          price: adhesionPrice,
          createdBy: STAFF,
        });
      }
      successToast("Pagamento de Adesão", "Pagamento realizado com sucesso!");
    } catch (error) {
      errorToast("Pagamento de Adesão", "Erro ao realizar pagamento.");
    }
  };

  if (
    !selectedMember ||
    !currentAdhesion ||
    !lastEnrollment ||
    isCurrentAdhesionPaid
  )
    return null;

  return (
    <ErrorMsg>
      <div className="flex items-center justify-between flex-1">
        <p>
          Este usuário ainda não pagou a <span>adesão</span> deste ano, no valor
          de <span className="font-bold underline">R${adhesionPrice}</span> (
          {isNewbie
            ? currentAdhesion.newbieDiscount
            : currentAdhesion.veteranDiscount}
          %) de desconto
        </p>

        <RemoveDialog
          title="Confirmar pagamento de adesão"
          removeBtnTitle="Confirmar"
          onRemove={payAdhesionHandler}
          removeBtn={
            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
              <Check />
              Marcar como pago
            </Button>
          }
        >
          <div>Esta ação irreversível. Tem certeza que deseja continuar?</div>
        </RemoveDialog>
      </div>
    </ErrorMsg>
  );
}
