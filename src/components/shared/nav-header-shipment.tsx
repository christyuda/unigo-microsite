import { ArrowLeftCircleIcon, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { getPreviousStep } from "@/hooks/step";
import useClearShipment from "@/hooks/useClearShipment";
import { currentStepAtom } from "@/atom/shipments-atom";

interface NavHeaderShipment {
  title?: string;
}

function NavHeaderStep({ title }: NavHeaderShipment) {
  const navigate = useNavigate();
  const [currentStep, setStep] = useAtom(currentStepAtom);
  const clearShipment = useClearShipment({ navigateTo: "/" });

  const prevStep = getPreviousStep(currentStep);

  const handleBack = () => {
    if (currentStep === "sender") {
      clearShipment();
    } else if (prevStep) {
      setStep(prevStep);
      navigate(`/new-shipment?step=${prevStep}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="sticky top-0 left-0 z-50 flex h-14 w-full max-w-full items-center justify-between gap-2 border-b bg-background p-3">
      <div className="w-[32px]">
        <ArrowLeftCircleIcon
          className="cursor-pointer"
          size={24}
          onClick={handleBack}
        />
      </div>

      {!!title && (
        <div className="flex-1 text-center">
          <p className="font-bold text-md">{title}</p>
        </div>
      )}

      <div className="w-[32px]">
        <X
          className="cursor-pointer text-gray-500"
          onClick={clearShipment}
          size={24}
        />
      </div>
    </div>
  );
}

export default NavHeaderStep;
