import { userAddressAtom } from "@/atom/global-atom";
import { dataUserAtomWithStorage } from "@/atom/home-atom";
import HomeLayout from "@/components/layout/home-layout";
import Loader from "@/components/layout/loader";
import NavHeader from "@/components/shared/nav-header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useTitle from "@/hooks/useTitle";
import { queryClient } from "@/lib/queryClient";
import { cn, debounce, fetchApi } from "@/lib/utils";
import type { AddressDetails } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { ContactIcon, SearchIcon, TrashIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialDeleteAddress = {
  status: false,
  dialogStatus: false,
  addressId: "",
};

export default function ListAddress() {
  useTitle("Daftar Alamat Tersimpan");
  const navigate = useNavigate();
  const dataUser = useAtomValue(dataUserAtomWithStorage);
  const [searchParams] = useSearchParams();
  const paramsState = searchParams.get("src");
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [deleteAddress, setDeleteAddress] = useState(initialDeleteAddress);
  const [userAddress, setUserAddress] = useAtom(userAddressAtom);

  const deleteAddressMutate = useMutation({
    mutationKey: ["address-delete"],
    mutationFn: (addressId: string) =>
      fetchApi<any>(`address/delete/${addressId}`, {
        method: "delete",
      }),
    onSuccess: () => {
      toast.success("Alamat telah dihapus");
      setDeleteAddress({ ...deleteAddress, dialogStatus: false });
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Terjadi kesalahan, silahkan coba lagi!");
    },
  });

  const { isLoading, data: addressList } = useQuery({
    queryKey: ["address"],
    queryFn: () =>
      fetchApi<{ items: AddressDetails[] }>(
        `address/list?merchantUserId=${dataUser.id}`
      ),
    staleTime: 3000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const filteredAddressList = useMemo(() => {
    if (!addressList?.data.items) {
      return [];
    }

    const result = addressList.data.items.filter(
      (item) =>
        item.customerName.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.address.toLowerCase().includes(filterValue.toLowerCase())
    );
    return result;
  }, [addressList, filterValue]);

  const debouncedSetValue = useCallback(
    debounce((newValue: string) => {
      setFilterValue(newValue);
    }, 800),
    []
  );

  const handleAddressChange = useCallback(() => {
    const result = addressList?.data.items.find(
      (item) => item.id === selectedAddress
    );

    const dataAddress = {
      merchantUserId: dataUser.id,
      customerName: result?.customerName,
      email: result?.email,
      phone: result?.phone,
      addressTypeId: result?.addressTypeId,
      addressTypeName: result?.addressTypeName,
      address: result?.address,
      villageId: result?.villageId,
      villageName: result?.villageName,
      districtId: result?.districtId,
      districtName: result?.districtName,
      cityId: result?.cityId,
      cityName: result?.cityName,
      provinceId: result?.provinceId,
      provinceName: result?.provinceName,
      countryId: result?.countryId,
      countryName: result?.countryName,
      zipCode: result?.zipCode,
      longitude: result?.longitude,
      latitude: result?.latitude,
    };

    if (paramsState === "pickup") {
      setUserAddress({ ...userAddress, pickup: dataAddress });
    } else if (paramsState === "sender") {
      setUserAddress({ ...userAddress, sender: dataAddress });
    } else if (paramsState === "destination") {
      setUserAddress({ ...userAddress, destination: dataAddress });
    }

    navigate(-1);
  }, [
    addressList?.data.items,
    dataUser.id,
    navigate,
    paramsState,
    selectedAddress,
    setUserAddress,
    userAddress,
  ]);

  const deleteAddressState = () => {
    setDeleteAddress({
      ...deleteAddress,
      status: !deleteAddress.status,
    });
    setSelectedAddress("");
  };

  const deleteAddressDialog = (addressId: string) => {
    setDeleteAddress({
      ...deleteAddress,
      dialogStatus: true,
      addressId,
    });
  };

  const deleteAddressHandler = () => {
    deleteAddressMutate.mutate(deleteAddress.addressId);
  };

  return (
    <>
      <HomeLayout>
        {isLoading && <Loader />}
        <NavHeader title="Daftar Alamat" />
        <div className="mt-2 flex w-full flex-col items-center gap-6">
          <div className="flex w-full items-center gap-2">
            <SearchIcon className="text-brand-500" />
            <Input
              type="text"
              id="valueGoods"
              className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
              onChange={(e) => debouncedSetValue(e.target.value)}
              placeholder="Cari..."
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="font-bold font-roboto">Daftar Alamat Tersimpan</p>
            {filteredAddressList.length > 0 && (
              <Button
                className="my-0 mr-2 h-8 p-0 text-red-500"
                variant={"link"}
                onClick={deleteAddressState}
              >
                {deleteAddress.status ? "Batal" : "Hapus Alamat"}
              </Button>
            )}
          </div>
          <section className="mb-24 max-h-[70vh] w-full overflow-y-auto border-t">
            <RadioGroup
              className="w-full"
              onValueChange={(e) => setSelectedAddress(e)}
            >
              {filteredAddressList.length === 0 && (
                <p className="my-3 text-gray-500">Tidak ada data.</p>
              )}
              {filteredAddressList?.map((item: any) => (
                <div
                  className={cn(
                    "grid w-full grid-cols-5 place-items-center gap-3 rounded-md border-b py-3 transition-all duration-200 ease-linear",
                    {
                      "border-brand-500 bg-brand-100":
                        selectedAddress === item.id,
                    }
                  )}
                  key={item.id}
                >
                  <div className="col-span-full flex w-full items-center px-2">
                    <RadioGroupItem
                      value={item.id}
                      id={item.id}
                      className="sr-only"
                      disabled={deleteAddress.status}
                    />
                    <Label
                      htmlFor={item.id}
                      className="flex w-full cursor-pointer gap-2 "
                    >
                      <div>
                        <ContactIcon
                          className={cn(
                            "text-gray-400 transition-all duration-200 ease-linear",
                            {
                              "text-brand-500": selectedAddress === item.id,
                            }
                          )}
                        />
                      </div>
                      <div className="space-y-2 text-start">
                        <p className="font-roboto text-lg">
                          {item.customerName}
                        </p>
                        <p className="text-gray-400">{item.address}</p>
                      </div>
                      {deleteAddress.status && (
                        <Button
                          className="my-auto mr-2 ml-auto p-0"
                          variant={"link"}
                          onClick={() => deleteAddressDialog(item.id)}
                        >
                          <TrashIcon className="h-6 text-red-500" />
                        </Button>
                      )}
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </section>
          <div className="fixed right-0 bottom-0 left-0 mx-auto mt-auto mb-3 w-full max-w-md px-3">
            <Button
              className=" w-full rounded-full bg-brand-500 py-6 text-white"
              onClick={handleAddressChange}
              disabled={!selectedAddress}
            >
              Pilih Alamat
            </Button>
          </div>
        </div>
      </HomeLayout>
      <AlertDialog
        open={deleteAddress.dialogStatus}
        onOpenChange={() =>
          setDeleteAddress({ ...deleteAddress, dialogStatus: false })
        }
      >
        <AlertDialogContent className="px-3">
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              Tindakan ini tidak dapat diurungkan. Ini akan secara permanen
              menghapus alamat Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white"
              onClick={deleteAddressHandler}
              disabled={deleteAddressMutate.isPending}
            >
              Ya
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
