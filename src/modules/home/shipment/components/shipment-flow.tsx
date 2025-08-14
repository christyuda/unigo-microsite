// components/shipment-flow.tsx
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// (opsional) fallback legacy global atoms
import { splittedAddressAtom, userAddressAtom } from "@/atom/global-atom";

// ✅ pakai atom BARU
import {
  orderPayloadAtom, // derived (read-only)
  senderFormAtom,
  receiverFormAtom,
  senderAddressDataAtom,
  receiverAddressDataAtom,
} from "@/atom/shipments-atom";

export default function ShipmentFlow() {
  const navigate = useNavigate();

  // (opsional) fallback lama — aman dihapus kalau sudah tidak dipakai
  const splitAddress = useAtomValue(splittedAddressAtom);
  const userAddress = useAtomValue(userAddressAtom);

  // ✅ data utama dari atom baru
  const orderPayload = useAtomValue(orderPayloadAtom);
  const senderForm = useAtomValue(senderFormAtom);
  const receiverForm = useAtomValue(receiverFormAtom);
  const senderAddress = useAtomValue(senderAddressDataAtom);
  const receiverAddress = useAtomValue(receiverAddressDataAtom);

  // display helpers
  const senderName =
    senderForm.name ||
    senderAddress.customerName ||
    splitAddress?.sender?.city ||
    "-";

  const senderAddr = senderAddress.address || "-";

  const receiverName = receiverForm.name || receiverAddress.customerName || "-";

  const receiverAddr = receiverAddress.address || "-";

  const senderStepDone =
    Boolean(userAddress?.sender?.customerName) ||
    Boolean(orderPayload?.senderAddressData?.cityName) ||
    Boolean(senderAddress.cityName);

  const receiverStepDone =
    Boolean(userAddress?.destination?.customerName) ||
    Boolean(receiverAddress.cityName) ||
    Boolean(orderPayload?.receiverAddressData?.cityName);

  return (
    <div className="relative mt-6 w-full bg-white">
      {/* garis vertikal putus-putus */}
      <div className="absolute top-[22px] left-[11px] h-[calc(100%-125px)] w-[1px] border-gray-400 border-l-2 border-dashed" />

      <div className="space-y-4">
        {/* SENDER */}
        <div className="relative flex gap-4">
          {/* indikator step */}
          <div className="relative flex flex-col items-center">
            <div
              className={cn(
                "h-6 w-6 rounded-full border-2 border-primary transition-colors duration-200",
                senderStepDone
                  ? "border-brand-500 bg-brand-500"
                  : "border-gray-400 bg-gray-200",
              )}
            />
            <div className="w-px flex-1 border-gray-300 border-l-2 border-dashed" />
          </div>

          {/* kartu konten */}
          <div
            className={cn(
              "flex-1 rounded-xl bg-brand-50 p-3 transition-shadow duration-200 hover:shadow-sm sm:p-4",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 text-start">
                <span className="font-roboto text-gray-500 text-sm">
                  Pengirim
                </span>
                <p className="font-semibold text-base text-gray-900">
                  {senderName}
                </p>
                <p className="line-clamp-2 text-gray-500 text-xs">
                  {senderAddr}
                </p>
              </div>
              <Button
                variant="link"
                className="font-medium text-orange-500 text-sm"
                onClick={() => navigate("/new-shipment?step=sender")}
              >
                Ubah
              </Button>
            </div>
          </div>
        </div>

        {/* RECEIVER */}
        <div className="relative flex gap-4">
          {/* indikator step */}
          <div className="relative flex flex-col items-center">
            <div
              className={cn(
                "h-6 w-6 rounded-full border-2 border-primary transition-colors duration-200",
                receiverStepDone
                  ? "border-brand-500 bg-brand-500"
                  : "border-gray-400 bg-gray-200",
              )}
            />
          </div>

          {/* kartu konten */}
          <div
            className={cn(
              "flex-1 rounded-xl bg-brand-50 p-3 transition-shadow duration-200 hover:shadow-sm sm:p-4",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 text-start">
                <span className="font-roboto text-gray-500 text-sm">
                  Penerima
                </span>
                <p className="font-semibold text-base text-gray-900">
                  {receiverName}
                </p>
                <p className="line-clamp-2 text-gray-500 text-xs">
                  {receiverAddr}
                </p>
              </div>
              <Button
                variant="link"
                className="font-medium text-orange-500 text-sm"
                onClick={() => navigate("/new-shipment?step=receiver")}
              >
                Ubah
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
