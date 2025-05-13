import ErrorMsg from "@/components/custom/ErrorMsg";
import { Button } from "@/components/ui/button";
import useCustomToast from "@/hooks/use-custom-toast";
import { useEnrollmentResume } from "@/hooks/use-enrollment-resume";
import { useMemberStore } from "@/store/memberStore";
import calcDiscount from "@/utils/calcDiscount";
import { Check } from "lucide-react";

export default function AdhesionInfo() {
  const { selectedMember, addAdhesionPayment } = useMemberStore();
  const { successToast, errorToast } = useCustomToast();
  const {
    lastEnrollment,
    isDiscountValid,
    isNewbie,
    currentAdhesion,
    isCurrentAdhesionPaid,
  } = useEnrollmentResume();

  const payAdhesionHandler = () => {
    if (!selectedMember || !currentAdhesion) return;
    try {
      addAdhesionPayment(selectedMember.id, currentAdhesion.year);
      successToast("Pagamento de Adesão", "Pagamento realizado com sucesso!");
    } catch (error) {
      errorToast("Pagamento de Adesão", "Erro ao realizar pagamento.");
    }
  };

  if (!currentAdhesion || !lastEnrollment || isCurrentAdhesionPaid) return null;

  return (
    <ErrorMsg>
      <div className="flex items-center justify-between flex-1">
        <p>
          Este usuário ainda não pagou a <span>adesão</span> deste ano, no valor
          de{" "}
          <span className="font-bold underline">
            R$
            {isDiscountValid
              ? calcDiscount(
                  lastEnrollment.plan.price,
                  isNewbie
                    ? currentAdhesion.newbieDiscount
                    : currentAdhesion.veteranDiscount
                )
              : lastEnrollment.plan.price}
          </span>
        </p>
        <Button
          onClick={payAdhesionHandler}
          size="sm"
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <Check />
          Marcar como pago
        </Button>
      </div>
    </ErrorMsg>
  );
}
