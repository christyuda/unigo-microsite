// pages/ShipmentPrice.tsx (atau lokasi file-mu sekarang)
import { errorOrderAtom } from "@/atom/global-atom";
import { addOrderResultAtom } from "@/atom/order-atom";
// import { currentStepAtom } from "@/atom/new-shipment-atom"; // kalau tidak dipakai, boleh dihapus import ini

import {
  orderPayloadAtom,
  // address data
  senderAddressDataAtom,
  receiverAddressDataAtom,
  pickupAddressDataAtom,
  emptyAddress,
  // item & fee & product
  itemDataAtom,
  feeDataAtom,
  itemTypeIdAtom,
  productIdAtom,
  productNameAtom,
  // schedule
  schedulePickupDataAtom,
  defaultSchedulePickup,
  // forms
  senderFormAtom,
  receiverFormAtom,
} from "@/atom/shipments-atom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useCheckHours from "@/hooks/useHours";
import { cn, fetchApi, formatCurrency } from "@/lib/utils";
import type { OrderResult } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMerchantUserId } from "@/lib/utils";
export default function ShipmentPrice() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState({ agree: false });

  // READ-ONLY payload untuk review
  const [orderPayload] = useAtom(orderPayloadAtom);

  // penampung hasil & error
  const [orderResult, setOrderResult] = useAtom(addOrderResultAtom);
  const [orderError, setOrderError] = useAtom(errorOrderAtom);

  // setters untuk RESET state sumber (bukan orderPayloadAtom)
  const setSenderAddress = useSetAtom(senderAddressDataAtom);
  const setReceiverAddress = useSetAtom(receiverAddressDataAtom);
  const setPickupAddress = useSetAtom(pickupAddressDataAtom);

  const setItemData = useSetAtom(itemDataAtom);
  const setFeeData = useSetAtom(feeDataAtom);
  const setItemTypeId = useSetAtom(itemTypeIdAtom);
  const setProductId = useSetAtom(productIdAtom);
  const setProductName = useSetAtom(productNameAtom);
  const setSchedulePickup = useSetAtom(schedulePickupDataAtom);

  const setSenderForm = useSetAtom(senderFormAtom);
  const setReceiverForm = useSetAtom(receiverFormAtom);

  const { tommorowPickup } = useCheckHours(15);

  const mutationOrder = useMutation({
    mutationFn: (payload: any) =>
      fetchApi<OrderResult>("order/addorder", {
        method: "post",
        body: JSON.stringify(payload),
      }),
    onError: () => {
      toast.error("Terjadi kesalahan, silakan coba lagi!");
    },
    onSuccess: (data) => {
      if (data.code !== "000") {
        if (data.message?.includes("item_description")) {
          setOrderError({ ...orderError, noItemDesc: true });
          toast.error("Lengkapi detail kiriman terlebih dahulu");
          return;
        }
        toast.error(
          data.message ||
            "Terjadi kesalahan, silakan periksa kembali data kiriman Anda",
        );
        return;
      }

      toast.success("Kiriman berhasil dibuat");
      setOrderResult(data.data);

      // --- RESET Storage atom ---
      setSenderAddress(emptyAddress());
      setReceiverAddress(emptyAddress());
      setPickupAddress(emptyAddress());

      setItemData((prev) => ({
        ...prev,
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        diameter: 0,
        value: 0,
        description: "",
        IsInsurance: "0",
        arrivedEstimation: "",
      }));
      setFeeData({
        feeAmount: 0,
        insuranceAmount: 0,
        discountAmount: 0,
        feeTaxAmount: 0,
        insuranceTaxAmount: 0,
        codValue: 0,
        totalAmount: 0,
      });
      setItemTypeId(0);
      setProductId("");
      setProductName("");

      setSchedulePickup(defaultSchedulePickup());

      setSenderForm({
        name: "",
        phoneNumber: "",
        noteLabel: "",
        courierNote: "",
        isFavorite: false,
      });
      setReceiverForm({
        name: "",
        phoneNumber: "",
        noteLabel: "",
        courierNote: "",
        isFavorite: false,
      });
      // -----------------------------------------------------------------------

      setTimeout(() => {
        navigate("/payment-method");
      }, 600);
    },
  });

  const paymentHandle = () => {
    if (!orderPayload) {
      toast.error(
        "Data pengiriman tidak lengkap. Silakan kembali dan lengkapi form.",
      );
      return;
    }

    const {
      senderAddressData,
      receiverAddressData,
      schedulePickupData,
      itemData,
      feeData,
      itemTypeId,
      productId,
      productName,
    } = orderPayload;
    const merchantUserId =
      (orderPayload as any)?.merchantUserId || getMerchantUserId();

    if (!merchantUserId) {
      toast.error("Sesi pengguna tidak ditemukan. Silakan login ulang.");
      return;
    }

    if (
      !senderAddressData?.customerName ||
      !senderAddressData?.phone ||
      !senderAddressData?.address
    ) {
      toast.error("Silakan lengkapi alamat pengirim terlebih dahulu.");
      return;
    }

    if (
      !receiverAddressData?.customerName ||
      !receiverAddressData?.phone ||
      !receiverAddressData?.address
    ) {
      toast.error("Silakan lengkapi alamat penerima terlebih dahulu.");
      return;
    }

    if (
      schedulePickupData?.isPickup === undefined ||
      schedulePickupData?.schedulePickupId === undefined ||
      schedulePickupData?.schedulePickup === undefined ||
      schedulePickupData?.availablePickupRequest === undefined
    ) {
      toast.error("Silakan pilih jadwal pickup terlebih dahulu.");
      return;
    }

    if (orderResult?.bookingId) {
      toast.error("Kiriman sudah dibuat");
      navigate("/payment-method");
      return;
    }

    const fullPayload = {
      merchantUserId,
      itemTypeId,
      productId,
      productName,
      itemData,
      feeData,
      senderAddressData,
      receiverAddressData,
      schedulePickupData,
    };

    mutationOrder.mutate(fullPayload);
  };

  if (!orderPayload) return null;

  const fee = orderPayload.feeData;

  return (
    <div className="w-full bg-white p-3">
      <div className="rounded-xl border border-brand-500 p-3 text-start text-sm">
        <p className="mb-3 font-semibold text-brand-500">Detail Pembayaran</p>

        <div className="mb-1 flex items-center justify-between gap-3">
          <p>Ongkir</p>
          <p>
            {formatCurrency(
              (fee?.feeAmount || 0) +
                (fee?.feeTaxAmount || 0) +
                (fee?.discountAmount || 0),
            )}
          </p>
        </div>

        <div className="mb-1 flex items-center justify-between gap-3">
          <p>Asuransi</p>
          <p>
            {formatCurrency(
              (fee?.insuranceAmount || 0) + (fee?.insuranceTaxAmount || 0),
            ) || "-"}
          </p>
        </div>

        {fee?.discountAmount !== 0 && fee?.discountAmount !== undefined && (
          <div className="mb-1 flex items-center justify-between gap-3">
            <p>Diskon</p>
            <p>{`${fee.discountAmount > 0 ? "-" : ""} ${formatCurrency(
              fee.discountAmount || 0,
            )}`}</p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3 text-lg">
          <p className="font-semibold">Total Bayar</p>
          <p className="font-semibold text-brand-500">
            {formatCurrency(fee?.totalAmount || 0)}
          </p>
        </div>
      </div>

      <div className={cn("flex flex-col gap-6", "my-10")}>
        <div className="flex items-start space-x-2">
          <Checkbox
            className="data-[state=checked]:bg-brand-500 data-[state=checked]:text-white"
            id="terms"
            onCheckedChange={(e) => setTerms({ agree: Boolean(e) })}
          />
          <label htmlFor="terms" className="text-start font-medium text-xs">
            Saya telah memastikan bahwa informasi pengiriman telah sesuai dan
            memastikan kemasan/bungkus kiriman dalam keadaan baik.
          </label>
        </div>
      </div>

      {tommorowPickup && (
        <Card className="mb-3 border border-red-500 bg-brand-50 p-0">
          <CardHeader className="p-3">
            <CardTitle className="font-bold text-lg">
              Informasi penting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="ml-2 list-outside list-decimal space-y-2 text-gray-600 text-xs">
              <li>Layanan pengambilan paket hari ini berakhir pukul 15:00.</li>
              <li>Pesanan setelah jam tersebut kemungkinan dijemput besok.</li>
            </ol>
            <p className="text-gray-600 text-xs">
              Apakah Anda ingin melanjutkan pembuatan pesanan? Mohon konfirmasi
              kembali.
            </p>
          </CardContent>
        </Card>
      )}

      <Button
        className="h-[56px] w-full rounded-xl bg-orange-500 font-semibold text-lg text-white hover:bg-orange-400"
        type="button"
        onClick={paymentHandle}
        disabled={!terms.agree || mutationOrder.isPending}
      >
        {mutationOrder.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Lanjut ke pembayaran"
        )}
      </Button>

      <Button variant="link" className="w-full text-brand-500 text-xs">
        Kembali ke Halaman Utama
      </Button>
    </div>
  );
}
