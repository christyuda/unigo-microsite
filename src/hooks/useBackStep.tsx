// hooks/useBackStep.ts
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { getPreviousStep } from "./step";
import { currentStepAtom } from "@/atom/shipments-atom";

export const useBackStep = () => {
  const [step, setStep] = useAtom(currentStepAtom);
  const navigate = useNavigate();
  const prevStep = getPreviousStep(step);

  const handleBack = () => {
    if (prevStep) {
      setStep(prevStep);
    } else {
      navigate(-1);
    }
  };

  return handleBack;
};
