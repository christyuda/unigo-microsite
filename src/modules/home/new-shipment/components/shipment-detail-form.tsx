import { useState, useMemo, useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { cn, fetchApi } from "@/lib/utils";
import { getMerchantUserId, buildAddressCreateBody,  } from "@/lib/utils";

import type { CourierService } from "@/types/types";

// atoms
import {
  itemTypeIdAtom,
  itemDataAtom,
  feeDataAtom,
  productIdAtom,
  productNameAtom,
  schedulePickupDataAtom,
  senderAddressDataAtom,
  receiverAddressDataAtom,
  receiverFormAtom,
  senderFormAtom,
} from "@/atom/shipments-atom";

const inputStyle = "h-[56px] rounded-xl text-sm";

function ServiceSkeleton() {
  return (
    <Card className="border-gray-300 bg-white">
      <CardContent className="p-4">
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-3 w-40 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 ml-auto h-5 w-28 animate-pulse rounded bg-gray-200" />
      </CardContent>
    </Card>
  );
}

const ShipmentDetailForm: React.FC = () => {
  const navigate = useNavigate();

  // atoms
  const [itemTypeId, setItemTypeId] = useAtom(itemTypeIdAtom);
  const [itemData, setItemData] = useAtom(itemDataAtom);
  const setFeeData = useSetAtom(feeDataAtom);
  const setProductId = useSetAtom(productIdAtom);
  const setProductName = useSetAtom(productNameAtom);
  const setSchedulePickup = useSetAtom(schedulePickupDataAtom);
  const senderAddress = useAtomValue(senderAddressDataAtom);
  const receiverAddress = useAtomValue(receiverAddressDataAtom);
  const senderForm = useAtomValue(senderFormAtom);
const receiverForm = useAtomValue(receiverFormAtom);

  // local state
  const [isInsured, setIsInsured] = useState(itemData.IsInsurance === "1");
  const [services, setServices] = useState<CourierService[]>([]);
  const [showServices, setShowServices] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState(
    itemData.value
      ? `Rp ${new Intl.NumberFormat("id-ID").format(itemData.value)}`
      : "",
  );

  const resetServices = () => {
    setServices([]);
    setSelectedService(null);
    setShowServices(false);
  };

  const parseNumber = (v: string) => (Number.isNaN(Number(v)) ? 0 : Number(v));

  // zips as string (API expects string)
  const shipperZipCode = senderAddress?.zipCode
    ? String(senderAddress.zipCode)
    : "";
  const receiverZipCode = receiverAddress?.zipCode
    ? String(receiverAddress.zipCode)
    : "";

  // rule: surat(0) > 2000g => paket(1)
  const effectiveItemTypeId = useMemo(
    () => (itemTypeId === 0 && itemData.weight > 2000 ? 1 : itemTypeId),
    [itemTypeId, itemData.weight],
  );

  const feePayload = useMemo(
    () => ({
      itemTypeId: effectiveItemTypeId,
      shipperZipCode,
      receiverZipCode,
      weight: itemData.weight,
      length: itemData.length,
      width: itemData.width,
      height: itemData.height,
      diameter: 0,
      valueGoods: isInsured ? itemData.value : 0,
      isInsurance: isInsured ? 1 : 0,
    }),
    [
      effectiveItemTypeId,
      shipperZipCode,
      receiverZipCode,
      itemData.weight,
      itemData.length,
      itemData.width,
      itemData.height,
      isInsured,
      itemData.value,
    ],
  );

  const {
    mutate: checkFee,
    isPending: isLoading,
    reset: resetMutation,
  } = useMutation({
    mutationFn: () =>
      fetchApi<{ items: CourierService[] }>("order/getfee", {
        method: "post",
        body: JSON.stringify(feePayload),
      }),
    onMutate: () => {
      // buka panel list + tampilkan skeleton
      setShowServices(true);
      setServices([]);
    },
    onSuccess: (res) => {
      if (res.code !== "000") {
        toast.error(res.message || "Gagal mengambil layanan");
        return;
      }
      const list = res.data?.items ?? [];
      if (!list.length) {
        toast("Layanan tidak tersedia untuk rute/dimensi ini.", { icon: "ℹ️" });
        return;
      }
      setServices(list);
    },
    onError: () => {
      toast.error("[API-POS] Gagal mengambil layanan", { duration: 8000 });
    },
  });

  // bersih-bersih kalau unmount saat loading
  useEffect(() => {
    return () => resetMutation();
  }, [resetMutation]);

  const handleCheckServices = () => {
    // VALIDASI
    if (!shipperZipCode || !receiverZipCode) {
      toast.error("Kode pos pengirim & penerima harus terisi");
      return;
    }
    if (itemData.weight <= 0) {
      toast.error("Berat kiriman harus lebih dari 0 gram");
      return;
    }
    if (itemData.length <= 0 || itemData.width <= 0 || itemData.height <= 0) {
      toast.error("Dimensi kiriman harus diisi dengan benar");
      return;
    }
    if (isInsured && itemData.value <= 0) {
      toast.error("Nilai barang harus > 0 jika menggunakan asuransi");
      return;
    }

    // apply rule: surat->paket
    if (itemTypeId === 0 && itemData.weight > 2000) {
      setItemTypeId(1);
    }

    checkFee();
  };
  const saveFavoritesIfNeeded = async () => {
    const merchantUserId = getMerchantUserId();
    const tasks: Promise<any>[] = [];
  
    if (senderForm?.isFavorite && senderAddress) {
      const body = buildAddressCreateBody({
        who: "sender",
        merchantUserId,
        data: senderAddress,
        isFavorite: true,
      });
      tasks.push(
        fetchApi("address/create", {
          method: "post",
          body: JSON.stringify(body),
        }).then((res) => {
          if (res.code !== "000") throw new Error(res.message || "Create sender favorite failed");
        })
      );
    }
  
    if (receiverForm?.isFavorite && receiverAddress) {
      const body = buildAddressCreateBody({
        who: "receiver",
        merchantUserId,
        data: receiverAddress,
        isFavorite: true,
      });
      tasks.push(
        fetchApi("address/create", {
          method: "post",
          body: JSON.stringify(body),
        }).then((res) => {
          if (res.code !== "000") throw new Error(res.message || "Create receiver favorite failed");
        })
      );
    }
  
    if (tasks.length) {
      await Promise.allSettled(tasks); // don’t block the user if one fails
    }
  };
  const handleNextStep = async ()  => {
    if (!selectedService) {
      toast.error("Silakan pilih layanan pengiriman terlebih dahulu.");
      return;
    }
    const chosen = services.find(
      (s) => String(s.serviceCode) === selectedService,
    );
    if (!chosen) {
      toast.error("Layanan yang dipilih tidak ditemukan.");
      return;
    }
    if (!senderAddress || !receiverAddress) {
      toast.error("Alamat pengirim/penerima belum lengkap.");
      return;
    }
    try {
      await saveFavoritesIfNeeded();
    } catch (e) {
      toast.error(`Gagal menyimpan alamat favorit: ${e instanceof Error ? e.message : "Unknown error"}`);
      return;
    }
    // commit service & fee
    setProductId(String(chosen.serviceCode));
    setProductName(chosen.serviceName);

    setItemData((prev) => ({
      ...prev,
      arrivedEstimation: chosen.estimation,
      IsInsurance: isInsured ? "1" : "0",
      value: isInsured ? prev.value : 0,
      diameter: 0,
      description: prev.description ?? "",
    }));

    setFeeData({
      feeAmount: chosen.fee,
      insuranceAmount: chosen.insurance,
      discountAmount: chosen.discount,
      feeTaxAmount: chosen.feeTax,
      insuranceTaxAmount: chosen.insuranceTax,
      codValue: 0,
      totalAmount: chosen.totalFee,
    });

    // keep previous pickup schedule (or set default)
    setSchedulePickup((p) => ({
      ...(p ?? {
        isPickup: 0,
        schedulePickupId: null,
        schedulePickup: null,
        availablePickupRequest: null,
      }),
    }));

    

    navigate("/create-shipment");
  };

  return (
    <div className="space-y-6">
      {/* Berat Kiriman */}
      <div className="space-y-2">
        <Label className="font-bold text-gray-400 text-sm">BERAT KIRIMAN</Label>
        <div className="space-y-1">
          <Label className="font-medium text-gray-700 text-sm">
            Berat (gram)
          </Label>
          <Input
            type="number"
            inputMode="numeric"
            value={String(itemData.weight)}
            onChange={(e) => {
              const raw = e.target.value;
              if (/^\d*$/.test(raw)) {
                setItemData((prev) => ({ ...prev, weight: parseNumber(raw) }));
                resetServices();
              }
            }}
            placeholder="Masukkan berat dalam gram"
            className={inputStyle}
          />
        </div>
      </div>

      {/* Dimensi */}
      <div className="space-y-2">
        <Label className="font-bold text-gray-400 text-sm">DIMENSI (CM)</Label>
        <div className="flex gap-3">
          {(["Panjang", "Lebar", "Tinggi"] as const).map((label, idx) => {
            const keys = ["length", "width", "height"] as const;
            const key = keys[idx];
            return (
              <div className="flex-1 space-y-1" key={label}>
                <Label className="font-medium text-gray-700 text-sm">
                  {label}
                </Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={String(itemData[key])}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (/^\d*$/.test(raw)) {
                      setItemData((prev) => ({
                        ...prev,
                        [key]: parseNumber(raw),
                      }));
                      resetServices();
                    }
                  }}
                  className={inputStyle}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Asuransi */}
      <div className="space-y-2">
        <Label className="font-bold text-gray-400 text-sm">ASURANSI</Label>
        <div className="flex items-center justify-between rounded-xl bg-[#F2F2F2] px-4 py-3">
          <p className="font-semibold text-[#0B0C44] text-sm">
            Gunakan Asuransi
          </p>
          <Switch
            checked={isInsured}
            onCheckedChange={(checked) => {
              setIsInsured(checked);
              setItemData((prev) => ({
                ...prev,
                IsInsurance: checked ? "1" : "0",
                value: checked ? prev.value : 0,
              }));
              resetServices();
            }}
            className="data-[state=checked]:bg-orange-500"
          />
        </div>

        {isInsured && (
          <div className="mt-1 space-y-1">
            <Label className="font-medium text-gray-700 text-sm">
              Nilai Barang (Rp)
            </Label>
            <Input
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "");
                const numeric = Number(raw);
                setItemData((prev) => ({
                  ...prev,
                  value: Number.isNaN(numeric) ? 0 : numeric,
                }));
                setServices([]);
                setShowServices(false);
                setDisplayValue(
                  raw
                    ? `Rp ${new Intl.NumberFormat("id-ID").format(numeric)}`
                    : "",
                );
              }}
              placeholder="Masukkan nilai barang"
              className={inputStyle}
            />
          </div>
        )}
      </div>

      {/* Cek Layanan */}
      <Button
        onClick={handleCheckServices}
        disabled={isLoading}
        className={cn(
          "h-[56px] w-full rounded-xl font-semibold text-lg text-white",
          isLoading ? "bg-orange-400" : "bg-orange-500 hover:bg-orange-400",
        )}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Memuat layanan...
          </span>
        ) : (
          "Cek Layanan"
        )}
      </Button>

      {/* Pilih Layanan */}
      {showServices && (
        <div className="space-y-3">
          <p className="font-bold text-gray-400 text-sm uppercase">
            Pilih Layanan
          </p>

          {/* SKELETON saat loading */}
          {isLoading && (
            <div className="space-y-2">
              <ServiceSkeleton />
              <ServiceSkeleton />
              <ServiceSkeleton />
            </div>
          )}

          {/* LIST saat sudah ada data */}
          {!isLoading &&
            services.map((svc) => {
              const codeStr = String(svc.serviceCode);
              const isActive = selectedService === codeStr;
              return (
                <Card
                  key={codeStr}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedService(codeStr)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setSelectedService(codeStr);
                  }}
                  className={cn(
                    "cursor-pointer border px-4 py-4 transition-all",
                    isActive
                      ? "border-orange-500 bg-[#FFF9F4]"
                      : "border-gray-300 bg-white",
                  )}
                >
                  <CardContent className="flex w-full items-start justify-between gap-4 p-4">
                    <div className="flex-1">
                      <p className="font-semibold text-[#0B0C44] text-sm capitalize">
                        {svc.serviceName}
                      </p>
                      <p className="mt-1 text-gray-500 text-xs">
                        Estimasi:{" "}
                        {svc.estimation.toLowerCase().includes("0 hari")
                          ? "Hari ini"
                          : svc.estimation}
                      </p>
                    </div>
                    <div className="space-y-1 text-right">
                      {svc.discount > 0 && (
                        <p className="text-gray-400 text-xs line-through">
                          Rp{" "}
                          {(svc.totalFee + svc.discount).toLocaleString(
                            "id-ID",
                          )}
                        </p>
                      )}
                      <p className="font-bold text-[#0B0C44] text-lg">
                        Rp {svc.totalFee.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      )}

      {/* Next */}
      <Button
        onClick={handleNextStep}
        disabled={!selectedService || isLoading}
        className="h-[56px] w-full rounded-xl bg-orange-500 font-semibold text-lg text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Selanjutnya
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default ShipmentDetailForm;
