import {
  splittedAddressAtom,
  showAdressDrawerAtom,
  userAddressAtom,
} from "@/atom/global-atom";
import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn, extractAddressData, fetchApi } from "@/lib/utils";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ChevronRight, HomeIcon, Phone, User } from "lucide-react";
import { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddressDrawer from "../../check-rate/components/address-drawer";
import { dataUserAtomWithStorage } from "@/atom/home-atom";
import type { AddressInfo } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useTitle from "@/hooks/useTitle";

// function SwitchSameAsPickup({
//   sameAsPickups,
//   onValueChange,
// }: {
//   sameAsPickups: boolean;
//   onValueChange: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   return (
//     <div className="my-3 flex items-center">
//       <Switch
//         checked={sameAsPickups}
//         id="sameaspickup"
//         className="mr-2 data-[state=checked]:border-brand-500 data-[state=checked]:bg-brand-500"
//         onCheckedChange={(e) => onValueChange(e)}
//       />
//       <label htmlFor="sameaspickup" className="text-sm">
//         Informasi Pengirim sama dengan Pickup
//       </label>
//     </div>
//   );
// }

export default function ShipmentAddress() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsState = searchParams.get("src");
  const [splitAddress] = useAtom(splittedAddressAtom);
  const setOpenDrawer = useSetAtom(showAdressDrawerAtom);
  const dataUser = useAtomValue(dataUserAtomWithStorage);
  const [saveAddress, setSaveAddress] = useState<string>("0");
  const [addressForm, setAddressForm] = useState({
    fullAddress: "",
    additionalAddress: "",
  });
  const [userAddress, setUserAddress] = useAtom(userAddressAtom);
  // const [sameAsPickups, setSameAsPickups] = useState(true);
  const customerNameRef = useRef<HTMLInputElement>(null);
  const customerPhoneRef = useRef<HTMLInputElement>(null);

  const saveAddressMutation = useMutation({
    mutationFn: (payload: AddressInfo) =>
      fetchApi<any>("address/create", {
        method: "post",
        body: JSON.stringify(payload),
      }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Alamat telah disimpan");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Terjadi kesalahan, silahkan coba lagi!");
    },
  });

  const trueTitle = useCallback((val: string) => {
    switch (val) {
      case "pickup":
        return "Alamat Pickup";
      case "sender":
        return "Info Pengirim";
      case "destination":
        return "Info Penerima";
      default:
        return;
    }
  }, []);

  useTitle(trueTitle(searchParams.get("src") as string) as string);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This useEffect hook is triggered whenever the value of `sameAsPickups` changes.
  useEffect(() => {
    setAddressForm({
      fullAddress:
        userAddress[paramsState as keyof typeof splitAddress].address
          ?.split("  ")[0]
          ?.trim() ?? "",
      additionalAddress:
        userAddress[paramsState as keyof typeof splitAddress].address
          ?.split("  ")[1]
          ?.trim() ?? "",
    });

    // if (
    //   paramsState === "sender" &&
    //   userAddress.pickup.address === userAddress.sender.address
    // ) {
    //   setSameAsPickups(true);
    // }
  }, [paramsState]);

  /**
   * This useEffect hook is triggered whenever the value of `sameAsPickups` changes.
   * It updates the sender's address and form fields based on whether the
   * "same as pickup" option is selected, ensuring that the sender's details are
   * either copied from the pickup details or set to their respective values.
   */

  // useEffect(() => {
  //   if (sameAsPickups) {
  //     const isUsingPickup = sameAsPickups && paramsState === "sender";
  //     const addressType = isUsingPickup ? "pickup" : "sender";
  //     const {
  //       zipCode,
  //       districtName,
  //       villageName,
  //       cityName,
  //       address,
  //       customerName,
  //       merchantUserId,
  //     } = userAddress[addressType];

  //     const newSplitAddress = isUsingPickup
  //       ? splitAddress.pickup
  //       : {
  //           zipCode: Number(zipCode),
  //           district: districtName,
  //           village: villageName,
  //           city: cityName,
  //           origin: `${zipCode}#Kel. ${villageName} Kec. ${districtName}#${cityName}`,
  //         };

  //     const [fullAddress, additionalAddress] = address
  //       ?.split("|")
  //       .map((part) => part.trim()) ?? ["", ""];

  //     setSplitAddress({ ...splitAddress, sender: newSplitAddress });
  //     setAddressForm({ fullAddress, additionalAddress });

  //     if (customerNameRef.current) {
  //       customerNameRef.current.value = customerName as string;
  //     }

  //     if (customerPhoneRef.current) {
  //       customerPhoneRef.current.value = merchantUserIdsplitAddress as string;
  //     }
  //   }
  // }, [sameAsPickups]);

  const handleOpenDrawer = () => {
    setOpenDrawer({
      status: true,
      flag: paramsState as keyof typeof splitAddress,
    });
  };

  const parseAddress = useCallback((value: string) => {
    const address = extractAddressData(value);
    return `${address?.district ?? "-"}, ${address?.village ?? "-"}, ${
      address?.city ?? "-"
    }`;
  }, []);

  const formAddressSubmitHandler = () => {
    function addressCheck(val: string | null) {
      let type: string;
      let name: string;

      switch (val) {
        case "pickup":
          type = "01";
          name = "Pickup Location";
          break;
        case "sender":
          type = "02";
          name = "Sender Location";
          break;
        case "destination":
          type = "03";
          name = "Receiver Location";
          break;
        default:
          type = "00";
          name = "Not Found";
          break;
      }

      return { type, name };
    }

    if (!addressForm.fullAddress.length) {
      toast.error("Detail alamat wajib diisi");
      return;
    }

    if (!customerNameRef.current?.value.length) {
      toast.error(
        `Nama ${paramsState === "sender" ? "Pengirim" : "Penerima"} Wajib diisi`,
      );
      return;
    }

    if (!customerPhoneRef.current?.value.length) {
      toast.error("Nomor telepon wajib diisi");
      return;
    }

    if (
      customerPhoneRef.current?.value.length < 8 ||
      customerPhoneRef.current?.value.length > 13
    ) {
      toast.error("Nomor telepon minimal 8 digit dan maksimal 13 digit");
      return;
    }

    const addressType = addressCheck(paramsState);
    const payload: AddressInfo = {
      merchantUserId: dataUser.id,
      customerName: customerNameRef.current?.value ?? dataUser.name,
      email: dataUser?.email ?? null,
      phone: customerPhoneRef.current?.value ?? dataUser?.id,
      addressTypeId: addressType?.type as "01" | "02" | "03" | "00",
      addressTypeName: addressType?.name as
        | "Pickup Location"
        | "Sender Location"
        | "Receiver Location",
      address: `${addressForm.fullAddress} ${
        addressForm.additionalAddress ? ` ${addressForm.additionalAddress}` : ""
      }`,
      villageId: null,
      villageName:
        splitAddress[paramsState as keyof typeof splitAddress].village ?? "",
      districtId: null,
      districtName:
        splitAddress[paramsState as keyof typeof splitAddress].district ?? "",
      cityId: null,
      cityName:
        splitAddress[paramsState as keyof typeof splitAddress].city ?? "",
      provinceId: null,
      provinceName: "",
      countryId: null,
      countryName: "",
      zipCode:
        splitAddress[
          paramsState as keyof typeof splitAddress
        ].zipCode?.toString() ?? "",
      longitude: "",
      latitude: "",
    };

    if (saveAddress === "1") {
      saveAddressMutation.mutate(payload);
    }

    if (paramsState === "pickup") {
      setUserAddress({
        ...userAddress,
        pickup: payload,
        sender: {
          ...payload,
          addressTypeId: "02",
          addressTypeName: "Sender Location",
          cityName: splitAddress.pickup.city || undefined,
          districtName: splitAddress.pickup.district || undefined,
          villageName: splitAddress.pickup.village || undefined,
          zipCode: splitAddress.pickup.zipCode?.toString() ?? "",
        },
      });
    } else if (paramsState === "sender") {
      setUserAddress({
        ...userAddress,
        sender: payload,
        pickup: {
          ...payload,
          addressTypeId: "01",
          addressTypeName: "Pickup Location",
        },
      });
    } else if (paramsState === "destination") {
      setUserAddress({ ...userAddress, destination: payload });
    }

    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  return (
    <HomeLayout>
      <NavHeader title={trueTitle(searchParams.get("src") as string)} />
      {/* {paramsState === "sender" && (
        <SwitchSameAsPickup
          sameAsPickups={sameAsPickups}
          onValueChange={setSameAsPickups}
        />
      )} */}
      <div className="flex w-full items-center justify-between border-b py-2">
        <Button
          variant="ghost"
          className="w-full items-center justify-between"
          // disabled={sameAsPickups}
          onClick={() => navigate(`/list-address?src=${paramsState}`)}
        >
          <span className="flex gap-2">
            <HomeIcon className="m-0 p-0 text-brand-500" />
            Daftar Alamat Tersimpan
          </span>
          <ChevronRight />
        </Button>
      </div>
      <div className="my-3 grid w-full grid-cols-6 place-items-center gap-3 rounded-lg bg-brand-50 p-2">
        <p className="font-semibold text-lg">
          {splitAddress[paramsState as keyof typeof splitAddress].zipCode ||
            splitAddress.pickup.zipCode}
        </p>
        <p className="col-span-4 text-start text-sm">
          {parseAddress(
            (splitAddress[paramsState as keyof typeof splitAddress]
              .origin as string) || (splitAddress.pickup.origin as string),
          )}
        </p>
        <Button
          variant={"link"}
          className="invisible text-brand-500 text-xs"
          onClick={handleOpenDrawer}
          // disabled={sameAsPickups}
        >
          Ubah
        </Button>
      </div>
      <h2 className="font-roboto font-semibold text-lg">Detail Alamat</h2>
      <div className={cn("w-full space-y-3", "mt-3")}>
        <Textarea
          className="border-0 bg-brand-50 text-sm"
          placeholder="Masukkan Detail Alamat"
          onChange={(e) =>
            setAddressForm({ ...addressForm, fullAddress: e.target.value })
          }
          value={addressForm.fullAddress}
          // disabled={sameAsPickups}
        />
        <Input
          className="w-full rounded-none border-x-0 border-t-0 border-b text-sm shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
          placeholder="Info alamat tambahan"
          onChange={(e) =>
            setAddressForm({
              ...addressForm,
              additionalAddress: e.target.value,
            })
          }
          value={addressForm.additionalAddress}
          // disabled={sameAsPickups}
        />
      </div>
      <Separator className="my-8 bg-gray-500" />
      <div className="w-full">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-roboto font-semibold text-lg">
            Informasi {paramsState === "destination" ? "Penerima" : "Pengirim"}
          </h2>
        </div>
        <Card>
          <CardContent className={cn("pr-0 pb-0 pl-3", "py-2")}>
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5 text-orange-600" />
              <Input
                placeholder={
                  paramsState === "destination"
                    ? "Nama penerima"
                    : "Nama pengirim"
                }
                className="border-none shadow-none focus-visible:border-none focus-visible:ring-0"
                defaultValue={
                  paramsState !== "destination"
                    ? userAddress[paramsState as keyof typeof splitAddress]
                        .customerName || dataUser.name
                    : userAddress.destination.customerName || ""
                }
                ref={customerNameRef}
                // disabled={sameAsPickups}
              />
            </div>
            <Separator className="my-2 bg-gray-300" />
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-orange-600" />
              <Input
                placeholder={
                  paramsState === "destination"
                    ? "Nomor penerima"
                    : "Nomor pengirim"
                }
                minLength={8}
                maxLength={13}
                className="border-none shadow-none focus-visible:border-none focus-visible:ring-0"
                defaultValue={
                  paramsState !== "destination"
                    ? userAddress[paramsState as keyof typeof splitAddress]
                        .phone || dataUser.id
                    : userAddress.destination.phone || ""
                }
                ref={customerPhoneRef}
                // disabled={sameAsPickups}
              />
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex items-center">
          <Switch
            id="save-info"
            className="mr-2 data-[state=checked]:border-brand-500 data-[state=checked]:bg-brand-500"
            value={saveAddress}
            onCheckedChange={(e) => setSaveAddress(e ? "1" : "0")}
          />
          <label htmlFor="save-info" className="text-sm">
            Simpan informasi alamat
          </label>
        </div>
      </div>
      <Button
        className="mt-auto mb-3 w-full rounded-full bg-brand-500 py-6 text-white shadow-none"
        onClick={formAddressSubmitHandler}
      >
        Simpan
      </Button>
      <AddressDrawer />
    </HomeLayout>
  );
}
