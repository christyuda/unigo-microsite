import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import useTitle from "@/hooks/useTitle";
import PickupAddress from "./pickup-address";
const SelectPickupAddress: React.FC = () => {
  useTitle("Pilih Alamat");

  return (
    <HomeLayout>
      <NavHeader title="Pilih Alamat" />
      <PickupAddress />
    </HomeLayout>
  );
};

export default SelectPickupAddress;
