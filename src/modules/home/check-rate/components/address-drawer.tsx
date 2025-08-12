import { splittedAddressAtom, showAdressDrawerAtom } from "@/atom/global-atom";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useAtom, useAtomValue } from "jotai";
import { AddressComboBox } from "./address-combo-box";

const TITLE_DRAWER = [
  {
    title: "Lokasi Pengirim",
    description: "Masukkan kelurahan / desa / kota asal / kode pos",
    for: "Pengirim",
  },
  {
    title: "Lokasi tujuan",
    description: "Masukkan kelurahan / desa / kota asal / kode pos",
    for: "Penerima",
  },
];

export default function AddressDrawer() {
  const [openDrawer, setOpenDrawer] = useAtom(showAdressDrawerAtom);
  const addressSplit = useAtomValue(splittedAddressAtom);

  const setOpenDrawerHandler = () => {
    setOpenDrawer({ status: false, flag: "empty" });
  };

  const saveAddressHandler = () => {
    setOpenDrawerHandler();
  };

  return (
    <Drawer open={openDrawer.status} onOpenChange={setOpenDrawerHandler}>
      <DrawerContent className="rounded-t-xl px-3">
        <DrawerHeader>
          <DrawerTitle>
            {TITLE_DRAWER[openDrawer.flag === "sender" ? 0 : 1].title}
          </DrawerTitle>
          <DrawerDescription>
            {TITLE_DRAWER[openDrawer.flag === "sender" ? 0 : 1].description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="mt-2 flex w-full flex-col gap-3">
          <AddressComboBox
            flag={openDrawer.flag}
            defaultValue={
              openDrawer.flag === "sender"
                ? addressSplit.sender.origin
                : addressSplit.destination.origin || ""
            }
          />
        </div>
        <DrawerFooter>
          <Button
            className="w-full rounded-full bg-brand-500 py-6 text-white"
            onClick={saveAddressHandler}
          >
            Gunakan
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
