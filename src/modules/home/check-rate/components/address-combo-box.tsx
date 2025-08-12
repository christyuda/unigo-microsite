import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, debounce, fetchApi } from "@/lib/utils";
import { skipToken, useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAtom } from "jotai";
import { splittedAddressAtom } from "@/atom/global-atom";
import toast from "react-hot-toast";

type ResponseZipCode = {
  items: {
    zipCode: number;
    address: string;
    city: string;
  }[];
};

interface AddressComboBoxProps {
  flag: "pickup" | "destination" | "empty" | "sender";
  defaultValue?: string;
}

export function AddressComboBox({ flag }: AddressComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [address, setAddress] = React.useState<string | undefined>();
  const [addressSplit, setAddressSplit] = useAtom(splittedAddressAtom);

  const {
    isLoading,
    data: addressResponse,
    isError,
  } = useQuery({
    queryKey: ["address", { address }],
    queryFn: address
      ? () =>
          fetchApi<ResponseZipCode>(`order/zipcode?address=${address}`, {
            method: "get",
          })
      : skipToken,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  const debouncedSetValue = React.useCallback(
    debounce((newValue: string) => {
      setAddress(newValue);
    }, 800),
    []
  );

  const addressData = React.useMemo(() => {
    return (addressResponse?.data.items || []).map((item) => ({
      value: `${item.zipCode}#${item.address}#${item.city}`,
      label: `${item.zipCode} ${item.address} ${item.city}`,
    }));
  }, [addressResponse]);

  const processAddress = React.useCallback(
    (value: string) => {
      const [zipCode, address, city] = value.split("#");
      const districtAndVillage = address.match(
        /(?:Kel\.|Ds\.)\s+((?:\S+\s+){0,4}\S+).*Kec\.\s+((?:\S+\s+){0,4}\S+)/
      );

      if (districtAndVillage) {
        const addressSplittedData = {
          zipCode: Number(zipCode),
          district: districtAndVillage[2],
          village: districtAndVillage[1],
          city,
          origin: value,
        };

        if (flag === "pickup") {
          setAddressSplit({ ...addressSplit, pickup: addressSplittedData });
          return;
        }

        if (flag === "sender") {
          setAddressSplit({
            ...addressSplit,
            pickup: addressSplittedData,
            sender: addressSplittedData,
          });
          return;
        }

        if (flag === "destination") {
          setAddressSplit({
            ...addressSplit,
            destination: addressSplittedData,
          });
          return;
        }
      }
    },
    [flag, addressSplit, setAddressSplit]
  );

  React.useEffect(() => {
    if (isError) {
      toast.error("Terjadi kesalahan, silahkan coba lagi!");
    }
  }, [isError]);

  React.useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between overflow-hidden text-gray-400",
            value && "text-gray-900"
          )}
        >
          {value
            ? addressData.find((address) => address.value === value)?.label
            : "Ketik kelurahan / desa / kota asal / kode pos"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        align="center"
        style={{ width: "95vw" }}
      >
        <Command className="w-full max-w-full bg-white">
          <CommandInput
            onValueChange={debouncedSetValue}
            placeholder="Cari kelurahan / desa / kota asal / kode pos"
          />
          <CommandList className="w-full max-w-full">
            {isLoading ? (
              <div className="flex h-16 flex-col items-center justify-center text-sm">
                <Loader2 className="animate-spin text-brand-500" size={20} />
              </div>
            ) : (
              <>
                <CommandEmpty>Wilayah tidak ditemukan</CommandEmpty>
                <CommandGroup>
                  <ScrollArea>
                    {addressData.map((address) => (
                      <CommandItem
                        key={address.value}
                        value={address.value}
                        onSelect={(currentValue) => {
                          processAddress(currentValue);
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {address.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === address.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
