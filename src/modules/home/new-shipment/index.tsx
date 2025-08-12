import HomeLayout from "@/components/layout/home-layout";
import useTitle from "@/hooks/useTitle";
import { StepHeader } from "./components/step-header";
import AddressOptionButton from "./components/option-button";
import FormPengirimSection from "./components/form-sender-section";
import FormPenerimaSection from "./components/form-receiver-section";
// import FormShipmentSection from "./components/form-shipment-section";
import {
  senderAddressDataAtom,
  receiverAddressDataAtom,
  StepEnum,
  currentStepAtom,
} from "@/atom/shipments-atom";

import { useAtom, useSetAtom } from "jotai";
import { MapPin, Star } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import NavHeaderShipment from "@/components/shared/nav-header-shipment";

const CreateShipment: React.FC = () => {
  useTitle("Buat Kiriman Baru");
  const navigate = useNavigate();

  const [currentStep] = useAtom(currentStepAtom);
  const [selectedSender] = useAtom(senderAddressDataAtom);
  const [selectedReceiver] = useAtom(receiverAddressDataAtom);
  const [searchParams] = useSearchParams();
  const setStep = useSetAtom(currentStepAtom);
  useEffect(() => {
    const stepFromUrl = searchParams.get("step");

    if (
      stepFromUrl === StepEnum.SENDER ||
      stepFromUrl === StepEnum.RECEIVER ||
      stepFromUrl === StepEnum.SHIPMENT
    ) {
      setStep(stepFromUrl);
    } else {
      setStep(StepEnum.SENDER);
      navigate("/new-shipment?step=sender", { replace: true });
    }
  }, [searchParams, setStep, navigate]);

  const isSender = currentStep === "sender";
  const isReceiver = currentStep === "receiver";
  // const isShipment = currentStep === "shipment";

  const selectedAddress = isSender
    ? selectedSender
    : isReceiver
      ? selectedReceiver
      : null;
  const addressTitle = isSender
    ? "ALAMAT PENGIRIM"
    : isReceiver
      ? "ALAMAT PENERIMA"
      : "DETAIL KIRIMAN";

  return (
    <HomeLayout>
      <NavHeaderShipment title="Detail Kiriman" />
      <StepHeader />

      <div className="w-full space-y-4 bg-white px-4 pt-2 pb-3">
        <p className="font-bold text-gray-400 text-sm">{addressTitle}</p>

        {isSender || isReceiver ? (
          <>
            <AddressOptionButton
              icon={<Star className="fill-orange-500 stroke-none" />}
              label="Pilih dari Alamat Favorit"
              isPrimary
              onClick={() => navigate("/address-favorite")}
            />

            {selectedAddress ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate("/select-pickup-address")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate("/select-pickup-address");
                  }
                }}
                className="cursor-pointer rounded-xl border border-[#F76B1C] bg-white p-4 transition hover:bg-orange-50"
              >
                <p className="text-gray-400 text-sm">
                  {isSender ? "Alamat Pengirim" : "Alamat Penerima"}
                </p>
                <p className="font-bold text-black">
                  {selectedAddress?.customerName || "-"}
                </p>
                <p className="text-gray-600 text-sm">
                  {selectedAddress?.address || "-"}
                </p>
              </div>
            ) : (
              <AddressOptionButton
                icon={<MapPin className="text-orange-500" />}
                label="Isi Detail Alamat"
                onClick={() => navigate("/select-pickup-address")}
              />
            )}
          </>
        ) : null}

        {isSender && <FormPengirimSection />}
        {isReceiver && <FormPenerimaSection />}
        {/* {isShipment && <FormShipmentSection />} */}
      </div>
    </HomeLayout>
  );
};

export default CreateShipment;
