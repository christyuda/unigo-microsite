import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import PickupAddress from "../select-maps/address-map"; // adjust path if needed

export default function SelectMapsAddress() {
  return (
    <HomeLayout>
      <NavHeader title="Peta" />
      <PickupAddress />
    
    </HomeLayout>
  );
}
