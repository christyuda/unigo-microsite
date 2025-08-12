import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import useTitle from "@/hooks/useTitle";
import AddressSelection from "./address-selection";
const AddressFavorite: React.FC = () => {
  useTitle("Buat Kiriman Baru");

  return (
    <HomeLayout>
      <NavHeader title="Alamat Favorit" />
      <AddressSelection />
    </HomeLayout>
  );
};

export default AddressFavorite;
