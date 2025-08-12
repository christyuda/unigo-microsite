import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import useTitle from "@/hooks/useTitle";
import CheckRateForm from "./components/check-rate-form";
import AddressDrawer from "./components/address-drawer";

export default function CheckRate() {
  useTitle("Cek Tarif");

  return (
    <HomeLayout>
      <NavHeader title="Cek Tarif" />
      <CheckRateForm />
      <AddressDrawer />
    </HomeLayout>
  );
}
