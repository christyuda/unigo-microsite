import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { BaggageClaim,  PackageIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  cn,
  convertGramsToKilograms,
  uppercaseToCapitalized,
} from "@/lib/utils";
import { errorOrderAtom } from "@/atom/global-atom";

import { orderPayloadAtom } from "@/atom/shipments-atom";

export default function ShipmentDetail() {
  const navigate = useNavigate();

  const orderPayload = useAtomValue(orderPayloadAtom);
  const [orderError, setOrderError] = useAtom(errorOrderAtom);
  useEffect(() => {
    if (!orderError.noItemDesc) return;
    const t = setTimeout(() => {
      setOrderError((prev) => ({ ...prev, noItemDesc: false }));
    }, 800);
    return () => clearTimeout(t);
  }, [orderError.noItemDesc, setOrderError]);

  const productName = uppercaseToCapitalized(orderPayload?.productName ?? "-");
  const estimationRaw = orderPayload?.itemData?.arrivedEstimation ?? "-";
  const estimation = estimationRaw.toLowerCase?.().includes("0 hari")
    ? "Hari ini"
    : uppercaseToCapitalized(estimationRaw);

  const weightKg = convertGramsToKilograms(orderPayload?.itemData?.weight ?? 0);
  const description = orderPayload?.itemData?.description?.trim();

  return (
    <div className="w-full bg-white px-3">
      {/* Combined: Detail Kiriman + Layanan Dipilih */}
<div
  className={cn(
    "w-full rounded-lg bg-brand-50 px-3 py-4",
    { "animate-pulse bg-red-300": orderError.noItemDesc } // keep your highlight
  )}
>
  {/* Header + single action */}
  <div className="flex w-full items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <PackageIcon className="text-brand-500" />
      <Label className="font-roboto font-semibold text-md">
        Detail Kiriman & Layanan
      </Label>
    </div>
    <button
      type="button"
      className="text-brand-500 text-sm"
      onClick={() => navigate("/shipment-detail")}
    >
      Ubah
    </button>
  </div>

  {/* Detail Kiriman */}
  <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-x-2">
    <div className="flex items-center gap-3">
      <p className="font-roboto font-semibold">{weightKg}</p>
      <p
        className={cn("text-sm", {
          "text-gray-400": !description,
        })}
      >
        {description || "Belum Ada Keterangan"}
      </p>
    </div>
  </div>

  {/* Divider */}
  <div className="my-4 h-px bg-gray-200" />

  {/* Layanan Dipilih */}
  <div className="flex w-full items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <BaggageClaim className="text-brand-500" />
      <Label className="font-roboto font-semibold text-md">
        Layanan Dipilih
      </Label>
    </div>
    {/* <CircleAlertIcon className="text-gray-400" /> */}
  </div>

  <div className="mt-3 grid grid-cols-4 gap-2">
    <div className="col-span-2 text-start">
      <p className="font-roboto font-semibold text-md">Produk</p>
      <p className="text-sm">{productName}</p>
    </div>

    <div className="text-start">
      <p className="font-roboto font-semibold text-md">Est. Tiba</p>
      <p className="text-sm">{estimation}</p>
    </div>
  </div>
</div>


     
    </div>
  );
}
