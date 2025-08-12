import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Separator } from "@/components/ui/separator";
import ShipmentDetail from "./components/shipment-detail";
import ShipmentFlow from "./components/shipment-flow";
import ShipmentPrice from "./components/shipment-price";
import useTitle from "@/hooks/useTitle";

export default function CreateShipment() {
  useTitle("Detail Info Kiriman");
  return (
    <HomeLayout>
      <NavHeader title="Detail Info Kiriman" />

      <div className="w-full space-y-4 bg-white px-4 pt-2 pb-3">
        <ShipmentFlow />
        <Separator className="my-4 bg-gray-300 " />
        <ShipmentDetail />
        <Separator className="my-4 bg-gray-300" />
        <ShipmentPrice />
      </div>
    </HomeLayout>
  );
}
