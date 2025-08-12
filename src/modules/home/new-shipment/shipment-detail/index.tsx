import { useEffect } from "react";
import { useSetAtom } from "jotai";
import useTitle from "@/hooks/useTitle";
import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import ShipmentDetailContent from "./shipment-detail-content";
import { StepHeader } from "../components/step-header";
import { StepEnum, currentStepAtom } from "@/atom/shipments-atom";

const ShipmentDetail: React.FC = () => {
  useTitle("Detail Kiriman");
  const setStep = useSetAtom(currentStepAtom);

  useEffect(() => {
    setStep(StepEnum.SHIPMENT);
  }, [setStep]);

  return (
    <HomeLayout>
      <NavHeader title="Detail Kiriman" />
      <StepHeader />
      <ShipmentDetailContent />
    </HomeLayout>
  );
};

export default ShipmentDetail;
