import {
  splittedAddressAtom,
  checkRatePayloadAtom,
  serviceDetailsAtom,
  showAdressDrawerAtom,
  orderDetailAtom,
} from "@/atom/global-atom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { fetchApi } from "@/lib/utils";
import type { CheckRatePayload, ServiceDetails } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  CoinsIcon,
  FileBoxIcon,
  MapPinCheckIcon,
  MapPinHouseIcon,
  PackageIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RESET } from "jotai/utils";
import CurrencyInput from "@/components/ui/currency-input";

const checkRateSchema = z
  .object({
    itemTypeId: z.string({ required_error: "Item type is required" }),
    shipperZipCode: z
      .string({ required_error: "Alamat pengiriman tidak boleh kosong" })
      .min(6, "Alamat pengiriman tidak boleh kosong"),
    receiverZipCode: z
      .string({
        required_error: "Alamat penerima tidak boleh kosong",
      })
      .min(6, "Alamat penerima tidak boleh kosong"),
    weight: z
      .string({ required_error: "Berat isi kiriman tidak boleh kosong" })
      .min(1, "Berat isi kiriman tidak boleh kosong"),
    length: z
      .string({ required_error: "Panjang isi kiriman tidak boleh kosong" })
      .min(1, "Panjang isi kiriman tidak boleh kosong"),
    width: z
      .string({ required_error: "Lebar isi kiriman tidak boleh kosong" })
      .min(1, "Lebar isi kiriman tidak boleh kosong"),
    height: z
      .string({ required_error: "Tinggi isi kiriman tidak boleh kosong" })
      .min(1, "Tinggi isi kiriman tidak boleh kosong"),
    diameter: z.string().optional().default("0"),
    valueGoods: z.string().min(1, "Nilai kiriman tidak boleh kosong"),
    isInsurance: z.boolean(),
  })
  .superRefine(
    (
      { itemTypeId, weight, length, width, height, isInsurance, valueGoods },
      ctx
    ) => {
      if (itemTypeId === "0" && Number(weight) > 2000) {
        ctx.addIssue({
          code: "custom",
          message: "Maksimal berat isi kiriman surat adalah 2000 gram",
          path: ["weight"],
        });
      }

      if (itemTypeId === "1" && Number(weight) > 50000) {
        ctx.addIssue({
          code: "custom",
          message: "Maksimal berat isi kiriman paket adalah 50000 gram",
          path: ["weight"],
        });
      }

      if (Number(length) > 150) {
        ctx.addIssue({
          code: "custom",
          message: "Maksimal panjang kiriman adalah 150cm",
          path: ["length"],
        });
      }

      if (Number(width) > 150) {
        ctx.addIssue({
          code: "custom",
          message: "Maksimal lebar kiriman adalah 150cm",
          path: ["width"],
        });
      }

      if (Number(height) > 150) {
        ctx.addIssue({
          code: "custom",
          message: "Maksimal tinggi kiriman adalah 150cm",
          path: ["height"],
        });
      }
      if (isInsurance) {
        const val = Number(valueGoods ?? 0);
        if (!valueGoods || isNaN(val) || val <= 0) {
          ctx.addIssue({
            code: "custom",
            message: "Nilai kiriman wajib diisi saat menggunakan asuransi",
            path: ["valueGoods"],
          });
        }
      }
    }
  );

export default function CheckRateForm() {
  const navigate = useNavigate();
  const setOpenDrawer = useSetAtom(showAdressDrawerAtom);
  const setServiceDetails = useSetAtom(serviceDetailsAtom);
  const splitAddress = useAtomValue(splittedAddressAtom);
  const [_, setSelectedProduct] = useAtom(orderDetailAtom);

  const [checkRatePayload, setCheckRatePayload] = useAtom(checkRatePayloadAtom);

  const mutationCheckFee = useMutation({
    mutationFn: (data: CheckRatePayload) =>
      fetchApi<{ items: ServiceDetails[] }>("order/getfee", {
        method: "post",
        body: JSON.stringify(data),
      }),
    onError: (error) => {
      console.error(error);
      toast.error("Terjadi kesalahan pada proses cek tarif");
    },
    onSuccess: (data) => {
      if (data.code !== "000") {
        toast.error(`${data.message}`, {
          duration: 5000,
        });
        // navigate("/empty-fee-result");
        return;
      }

      // const modDummyService = DUMMY_SERVICE.map((item) => ({
      //   ...item,
      //   serviceCode: String(item.serviceCode),
      // }));

      setServiceDetails(data.data.items);
      setSelectedProduct(RESET);
      navigate("/rate-result");
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckRatePayload>({
    resolver: zodResolver(checkRateSchema),
    mode: "onChange",
    defaultValues: {
      itemTypeId: String(checkRatePayload.itemTypeId) ?? "1",
      shipperZipCode: checkRatePayload.shipperZipCode ?? "",
      receiverZipCode: checkRatePayload.receiverZipCode ?? "",
      weight: String(checkRatePayload.weight) ?? "",
      length: String(checkRatePayload.length) ?? "",
      width: String(checkRatePayload.width) ?? "",
      height: String(checkRatePayload.height) ?? "",
      diameter: String(checkRatePayload.diameter) ?? "0",
      valueGoods: String(checkRatePayload.valueGoods ?? 0),
      isInsurance: false,
    },
  });
  const isInsurance = watch("isInsurance");

  // When insurance is toggled OFF, reset valueGoods to "0"
  useEffect(() => {
    if (!isInsurance) {
      setValue("valueGoods", "0", { shouldValidate: true, shouldDirty: true });
    }
  }, [isInsurance, setValue]);

  useEffect(() => {
    const setAddressValue = (field: keyof CheckRatePayload, origin: string) => {
      if (origin) {
        setValue(field, origin.split("#").join(" "));
      }
    };

    setAddressValue("shipperZipCode", splitAddress.sender.origin || "");
    setAddressValue("receiverZipCode", splitAddress.destination.origin || "");
  }, [splitAddress, setValue]);

  const checkRateHandle: SubmitHandler<CheckRatePayload> = (data) => {
    const checkPayload = {
      itemTypeId: Number(data.itemTypeId),
      shipperZipCode: String(splitAddress.sender.zipCode),
      receiverZipCode: String(splitAddress.destination.zipCode),
      weight: Number(data.weight),
      length: Number(data.length),
      width: Number(data.width),
      height: Number(data.height),
      diameter: Number(0),
      valueGoods: Number(data.valueGoods),
      isInsurance: data.isInsurance ? "1" : "0",
    };
    setCheckRatePayload(checkPayload);
    mutationCheckFee.mutate(checkPayload);
  };

  return (
    <form
      className="flex h-[94vh] w-full flex-col"
      onSubmit={handleSubmit(checkRateHandle)}
    >
      <div className="mt-5 space-y-8 rounded bg-brand-50 p-2">
        <div className="flex flex-col items-start gap-2">
          <Label className="mb-3 text-start font-medium text-gray-900 text-lg">
            Jenis Kiriman
          </Label>
          <Controller
            control={control}
            name="itemTypeId"
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                defaultValue="1"
                className="flex w-full gap-3"
                onValueChange={onChange}
                value={String(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="1"
                    id="paket"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="paket"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border bg-white p-3 peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-500 peer-data-[state=checked]:text-white"
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-500 [.peer[data-state=checked]~label_&]:border-white">
                      <div className="h-2 w-2 rounded-full bg-white opacity-0 [.peer[data-state=checked]~label_&]:opacity-100" />
                    </div>
                    Paket
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="0"
                    id="surat"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="surat"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border bg-white p-3 peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-500 peer-data-[state=checked]:text-white"
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-500 [.peer[data-state=checked]~label_&]:border-white">
                      <div className="h-2 w-2 rounded-full bg-white opacity-0 [.peer[data-state=checked]~label_&]:opacity-100" />
                    </div>
                    Surat
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          {errors.shipperZipCode && (
            <p className="flex-none text-red-500 text-sm">
              {errors.shipperZipCode.message}
            </p>
          )}
          <Label htmlFor="from" className="font-medium text-gray-900 text-lg">
            Asal (Pengirim)
          </Label>
          <div className="flex w-full items-center gap-2">
            <MapPinHouseIcon className="text-brand-500" />
            <Controller
              control={control}
              name="shipperZipCode"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  type="text"
                  id="from"
                  className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                  placeholder="Ketik kelurahan / desa / kota asal / kode pos"
                  onFocus={() =>
                    setOpenDrawer({ flag: "sender", status: true })
                  }
                  onChange={onChange}
                  readOnly
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          {errors.receiverZipCode && (
            <p className="text-red-500 text-sm">
              {errors.receiverZipCode.message}
            </p>
          )}
          <Label htmlFor="dest" className="font-medium text-gray-900 text-lg">
            Tujuan
          </Label>
          <div className="flex w-full items-center gap-2">
            <MapPinCheckIcon className="text-brand-500" />
            <Controller
              control={control}
              name="receiverZipCode"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  type="text"
                  id="dest"
                  className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                  placeholder="Ketik kelurahan / desa / kota tujuan / kode pos"
                  onFocus={() =>
                    setOpenDrawer({ flag: "destination", status: true })
                  }
                  onChange={onChange}
                  readOnly
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight.message}</p>
          )}
          <Label htmlFor="weight" className="font-medium text-gray-900 text-lg">
            Berat aktual kiriman (gram)
          </Label>
          <div className="flex w-full items-center gap-2">
            <PackageIcon className="text-brand-500" />
            <Controller
              control={control}
              name="weight"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  type="number"
                  id="weight"
                  min={0}
                  className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                  placeholder="Ketik berat aktual kiriman"
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2">
          {errors.length && (
            <p className="text-red-500 text-sm">{errors.length.message}</p>
          )}
          {errors.width && (
            <p className="text-red-500 text-sm">{errors.width.message}</p>
          )}
          {errors.height && (
            <p className="text-red-500 text-sm">{errors.height.message}</p>
          )}
          <Label
            htmlFor="dimension"
            className="font-medium text-gray-900 text-lg"
          >
            Dimensi Kiriman (cm)
          </Label>
          <div className="flex w-full items-start gap-2">
            <FileBoxIcon className="shrink-0 text-brand-500" size={20} />

            <div className="grid w-full grid-cols-3 gap-3">
              {/* Panjang */}
              <div className="space-y-1">
                <Label
                  htmlFor="lengthCm"
                  className="text-sm font-medium text-gray-900"
                >
                  Panjang 
                </Label>
                <Controller
                  control={control}
                  name="length"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="lengthCm"
                      value={value}
                      type="number"
                      min={0}
                      className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                      placeholder="cth: 20"
                      onChange={onChange}
                    />
                  )}
                />
      {errors.length && (
        <p className="text-red-500 text-xs">{errors.length.message}</p>
      )}
              </div>

              {/* Lebar */}
              <div className="space-y-1">
                <Label
                  htmlFor="widthCm"
                  className="text-sm font-medium text-gray-900"
                >
                  Lebar
                </Label>
                <Controller
                  control={control}
                  name="width"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="widthCm"
                      value={value}
                      type="number"
                      min={0}
                      className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                      placeholder="cth: 15"
                      onChange={onChange}
                    />
                  )}
                />
                {errors.width && (
        <p className="text-red-500 text-xs">{errors.width.message}</p>
      )}
              </div>

              {/* Tinggi */}
              <div className="space-y-1">
                <Label
                  htmlFor="heightCm"
                  className="text-sm font-medium text-gray-900"
                >
                  Tinggi
                </Label>
                <Controller
                  control={control}
                  name="height"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="heightCm"
                      value={value}
                      type="number"
                      min={0}
                      className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                      placeholder="cth: 10"
                      onChange={onChange}
                    />
                  )}
                />
{errors.height && (
        <p className="text-red-500 text-xs">{errors.height.message}</p>
      )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <Controller
              control={control}
              name="isInsurance"
              render={({ field: { value, onChange } }) => (
                <Switch
                  id="airplane-mode"
                  className="data-[state=checked]:border-brand-500 data-[state=checked]:bg-brand-500"
                  checked={value as boolean}
                  onCheckedChange={onChange}
                />
              )}
            />
            <Label htmlFor="airplane-mode">Menggunakan asuransi</Label>
          </div>
        </div>
        {isInsurance && (
          <div className="flex flex-col items-start gap-2">
            {errors.valueGoods && (
              <p className="text-red-500 text-sm">
                {errors.valueGoods.message}
              </p>
            )}
            <Label
              htmlFor="valueGoods"
              className="font-medium text-gray-900 text-lg"
            >
              Nilai isi kiriman (rupiah)
            </Label>
            <div className="flex w-full items-center gap-2">
              <CoinsIcon className="text-brand-500" />
              <Controller
                control={control}
                name="valueGoods"
                render={({ field: { value, onChange } }) => (
                  <CurrencyInput
                    className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                    value={value}
                    
                    onChange={onChange}
                    placeholder="Ketik besaran nilai isi kiriman"
                  />
                )}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto mb-3 py-6">
        <Button
          className="w-full rounded-full bg-brand-500 py-6 text-white"
          type="submit"
          disabled={mutationCheckFee.isPending}
        >
          {mutationCheckFee.isPending ? "Memproses..." : "Cek Tarif"}
        </Button>
      </div>
    </form>
  );
}
