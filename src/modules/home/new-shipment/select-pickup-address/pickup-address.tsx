// pages/pickup-address-content.tsx
import useTitle from "@/hooks/useTitle";
import SearchHistoryCard from "../components/search-history-card";
import PickupSearchInput from "../components/pickup-search-input";
import PickupOptionButtons from "../components/pickup-option-button";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { useAddressHistory } from "@/hooks/useAddressHistory";

import {
  senderAddressDataAtom,
  receiverAddressDataAtom,
  senderFormAtom,
  receiverFormAtom,
  emptyAddress,
  StepEnum,
  type AddressData,
  searchQueryAtom,
  currentStepAtom,
} from "@/atom/shipments-atom";

const PickupAddressContent: React.FC = () => {
  useTitle("Alamat Pickup");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const [currentStep] = useAtom(currentStepAtom);

  const setSenderAddress = useSetAtom(senderAddressDataAtom);
  const setReceiverAddress = useSetAtom(receiverAddressDataAtom);
  const setSenderForm = useSetAtom(senderFormAtom);
  const setReceiverForm = useSetAtom(receiverFormAtom);

  const { history, remove, clear } = useAddressHistory();

  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  useEffect(() => {
    return () => setSearchQuery("");
  }, [setSearchQuery]);

  const filteredHistory = useMemo(() => {
    const keyword = (searchQuery ?? "").toLowerCase();
    return history.filter((item) => {
      return (
        (item.label ?? "").toLowerCase().includes(keyword) ||
        (item.customerName ?? "").toLowerCase().includes(keyword) ||
        (item.address ?? "").toLowerCase().includes(keyword) ||
        (item.zipCode ?? "").toString().toLowerCase().includes(keyword)
      );
    });
  }, [history, searchQuery]);

  const handleSelect = (id: string) => setSelectedId(id);

  const prettyType = (label?: string, rawType?: string) => {
    if (label && label.trim()) return label; // ✅ Prefer HERE label
    const t = (rawType ?? "").toLowerCase();
    if (t.includes("receiver")) return "Alamat Penerima";
    if (t.includes("sender") || t.includes("pickup")) return "Alamat Pengirim";
    return "Pilihan dari Peta";
  };
  
  const toAddressData = (entry: {
    name: string;
    address: string;
    phone?: string;
    shortLabel?: string; 
    postalCode: string | number;
  }): AddressData => {
    const zip = Number(entry.postalCode) || 0;
    return {
      ...emptyAddress(),
      customerName: entry.name || "",
      phone: entry.phone ?? "",
      address: entry.address || "",
      zipCode: zip,
    };
  };

  const handleConfirmAddress = (address: {
    id: string;
    label: string;
    name: string;
    address: string;
    postalCode?: string;
    phone?: string;
  }) => {
    if (!address.postalCode) {
      alert("Kode pos tidak ditemukan di data riwayat");
      console.warn("[RIWAYAT] Postal code kosong:", address);
      return;
    }

    // Ambil baris 2 & 3 sebagai note (opsional, jika format address multi-baris)
    const [, noteLabel = "", courierNote = ""] = (address.address ?? "")
      .split("\n")
      .map((s) => s.trim());

    const addrData = toAddressData({
      name: address.name,
      address: address.address,
      phone: address.phone,
      shortLabel: address.label, 
      postalCode: address.postalCode,
    });

    if (currentStep === StepEnum.SENDER) {
      // Simpan ke AddressData (pengirim)
      setSenderAddress((prev) => ({
        ...(prev ?? emptyAddress()),
        ...addrData,
        noteLabel,
        courierNote,
      }));

      // Prefill form pengirim
      setSenderForm((prev) => ({
        ...prev,
        name: address.name,
        phoneNumber: address.phone ?? "",
        noteLabel,
        courierNote,
      }));

      navigate("/new-shipment?step=sender");
    } else if (currentStep === StepEnum.RECEIVER) {
      // Simpan ke AddressData (penerima)
      setReceiverAddress((prev) => ({
        ...(prev ?? emptyAddress()),
        ...addrData,
        noteLabel,
        courierNote,
      }));

      // Prefill form penerima
      setReceiverForm((prev) => ({
        ...prev,
        name: address.name,
        phoneNumber: address.phone ?? "",
        noteLabel,
        courierNote,
      }));

      navigate("/new-shipment?step=receiver");
    } else {
      console.warn("🔁 STEP TIDAK DIKENAL:", currentStep);
      navigate("/new-shipment");
    }
  };

  return (
    <div className="space-y-4 bg-white px-4 pt-4 pb-8">
      <PickupSearchInput />

      <PickupOptionButtons
        onFavoriteClick={() => navigate("/address-favorite")}
        onMapClick={() => navigate("/select-maps")}
      />

      <div>
        <h2 className="pb-2 font-bold text-gray-400 text-sm">
          RIWAYAT PENCARIAN
        </h2>
        {history.length === 0 && (
          <p className="text-gray-500 text-sm">Riwayat Alamat Tidak ada.</p>
        )}

        <div className="space-y-3">
          {history.length > 0 && <Button onClick={clear}>Hapus Semua</Button>}
          {filteredHistory.map((item) => (
            <SearchHistoryCard
              key={item.id}
              title={prettyType(item.label)}
              subtitle={item.customerName}
              subsubtitle={item.address}
              isSelected={selectedId === item.id}
              onSelect={() => handleSelect(item.id)}
              onRemove={() => remove(item.id)}
              onConfirm={() =>
                handleConfirmAddress({
                  id: item.id,
                  label: prettyType(item.label),
                  name: item.customerName,
                  address: item.address,
                  phone: item.phone,
                  postalCode: item.zipCode,
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PickupAddressContent;
