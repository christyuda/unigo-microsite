// components/shared/step-header.tsx
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { currentStepAtom } from "@/atom/shipments-atom";

const steps = ["sender", "receiver", "shipment"] as const;

const stepLabels: Record<(typeof steps)[number], string> = {
  sender: "Pengirim",
  receiver: "Penerima",
  shipment: "Kiriman",
};

export const StepHeader: React.FC = () => {
  const [currentStep] = useAtom(currentStepAtom);

  const getProgressWidth = () => {
    switch (currentStep) {
      case "sender":
        return "w-1/3";
      case "receiver":
        return "w-2/3";
      case "shipment":
        return "w-full";
      default:
        return "w-0";
    }
  };

  return (
    <div className="w-full bg-white px-4 pt-2 pb-3">
      {/* Step Label */}
      <div className="mb-1 flex justify-between font-semibold text-gray-400 text-xs tracking-wide">
        {steps.map((step) => (
          <span
            key={step}
            className={cn(
              "capitalize",
              step === currentStep && "text-orange-500",
            )}
          >
            {stepLabels[step]}
          </span>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className={cn(
            "absolute h-2 rounded-full bg-orange-500 transition-all duration-300",
            getProgressWidth(),
          )}
        />
      </div>
    </div>
  );
};
