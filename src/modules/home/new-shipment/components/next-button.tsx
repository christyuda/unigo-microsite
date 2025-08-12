import { useAtom } from "jotai";
import { senderFormAtom } from "@/atom/new-shipment-atom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ButtonContinue = () => {
  const [form] = useAtom(senderFormAtom);

  const navigate = useNavigate();

  const isFormValid = form.name && form.phoneNumber && form.noteLabel;

  const handleNext = () => {
    if (!isFormValid) return;
    // 🚀 Lanjut ke step "Penerima"
    navigate("/shipment/receiver");
  };

  return (
    <div className="rounded-b-xl bg-white px-4 py-6 shadow-md">
      <Button
        onClick={handleNext}
        disabled={!isFormValid}
        className="h-[56px] w-full rounded-[40px] bg-orange-300 font-semibold text-lg text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Lanjut <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default ButtonContinue;
