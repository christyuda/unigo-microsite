// pages/address-selection.tsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import TabsSwitch from "../components/tabs-switch";
import AddressSearch from "../components/address-search";
import AddressSortButtons from "../components/address-sort-buttons";
import { AddressCard } from "../components/address-card";

import {
  currentStepAtom,
  senderAddressDataAtom,
  receiverAddressDataAtom,
  senderFormAtom,
  receiverFormAtom,
  senderPostalCodeAtom,
  receiverPostalCodeAtom,
  type AddressData,
} from "@/atom/shipments-atom";

import { useAddressList } from "@/hooks/useAddressList";
import { useAddressHistory } from "@/hooks/useAddressHistory";
import type { AddressApiItem } from "@/atom/shipments-atom";
import {
  composeAddressNotes,
  splitAddressNotes,
  extractAddressData,
  fetchApi,
  getMerchantUserId,
} from "@/lib/utils";


  // take the first line, then the part before the first comma
  const deriveShort = (text?: string) => {
    if (!text) return "";
    const firstLine = text.split("\n")[0];
    return firstLine.split(",")[0].trim();
  };
  
  // fallback from structured parts if needed
  const deriveShortFromParts = (a: AddressApiItem) => {
    const parts = [a.villageName, a.districtName, a.cityName].filter(Boolean);
    return parts.join(", ").trim();
  };
  
// map API item -> AddressData (atom)
const toAddressData = (a: AddressApiItem): AddressData => {
  const { main, noteLabel, courierNote } = splitAddressNotes(a.address);
  return {
    customerName: a.customerName ?? "",
    email: a.email || null,
    phone: a.phone ?? "",
    address: composeAddressNotes(main, noteLabel, courierNote),
    villageId: a.villageId || null,
    villageName: a.villageName ?? "",
    districtId: a.districtId || null,
    districtName: a.districtName ?? "",
    cityId: a.cityId || null,
    cityName: a.cityName ?? "",
    provinceId: a.provinceId || null,
    provinceName: a.provinceName || null,
    zipCode: Number(a.zipCode || 0),
    longitude: a.longitude ?? "",
    latitude: a.latitude ?? "",
    shortlabel: deriveShort(main) || deriveShortFromParts(a) || a.customerName || "Alamat",
    noteLabel,
    courierNote,
  };
};

const AddressSelection: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentStep] = useAtom(currentStepAtom);

  const setSenderAddress = useSetAtom(senderAddressDataAtom);
  const setReceiverAddress = useSetAtom(receiverAddressDataAtom);
  const setSenderForm = useSetAtom(senderFormAtom);
  const setReceiverForm = useSetAtom(receiverFormAtom);
  const setSenderPostal = useSetAtom(senderPostalCodeAtom);
  const setReceiverPostal = useSetAtom(receiverPostalCodeAtom);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const { addhistory } = useAddressHistory();

  // tab aktif → menentukan addressTypeId yang difetch
  const qsTab = searchParams.get("src") as "sender" | "receiver" | null;
  const initialTab: "sender" | "receiver" =
    qsTab === "sender" || qsTab === "receiver"
      ? qsTab
      : (currentStep as any) || "sender";

  const [tab, setTab] = useState<"sender" | "receiver">(initialTab);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"atoz" | "ztoa" | "saved">("atoz");
  
  const merchantUserId = getMerchantUserId();
  const addressTypeId = tab === "sender" ? "02" : "03";

  // fetch by params (sesuai requirement)
  const { data, loading, error, refetch } = useAddressList(
    merchantUserId,
    addressTypeId,
    true,
  );

  // filter & sort di client
  const list = useMemo(() => {
    const key = (search ?? "").toLowerCase();
    let out = data ?? [];
    if (key) {
      out = out.filter((a) =>
        [a.customerName, a.address, a.cityName, a.zipCode]
          .join(" ")
          .toLowerCase()
          .includes(key),
      );
    }
    if (sort === "atoz")
      out = [...out].sort((a, b) =>
        a.customerName.localeCompare(b.customerName),
      );
    else if (sort === "ztoa")
      out = [...out].sort((a, b) =>
        b.customerName.localeCompare(a.customerName),
      );
    return out;
  }, [data, search, sort]);

  const handleTabChange = (val: "sender" | "receiver") => {
    setTab(val);
    setSearchParams({ src: val }, { replace: true });
    // refetch otomatis karena dependency addressTypeId berubah
  };

  const deleteAddress = useMutation({
    mutationFn: async (id: string) =>
      fetchApi(`address/delete/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Alamat berhasil dihapus");
      refetch();
    },
    onError: () => toast.error("Gagal menghapus alamat, coba lagi."),
  });

  const handleDelete = (id?: string) => id && deleteAddress.mutate(id);

  const handleConfirm = (item: AddressApiItem) => {
    const payload = toAddressData(item);

    if (tab === "sender") {
      setSenderAddress(payload);
      setSenderForm((prev) => ({
        ...prev,
        name: payload.customerName || prev.name,
        phoneNumber: payload.phone || prev.phoneNumber,
        noteLabel: payload.noteLabel ?? prev.noteLabel,
        courierNote: payload.courierNote ?? prev.courierNote,
      }));
      setSenderPostal(String(payload.zipCode));
    } else {
      setReceiverAddress(payload);
      setReceiverForm((prev) => ({
        ...prev,
        name: payload.customerName || prev.name,
        phoneNumber: payload.phone || prev.phoneNumber,
        noteLabel: payload.noteLabel ?? prev.noteLabel,
        courierNote: payload.courierNote ?? prev.courierNote,
      }));
      setReceiverPostal(String(payload.zipCode));
    }

    // save ke history
    addhistory({
      id: `${Date.now()}`,
      label :payload.shortlabel,
      customerName: payload.customerName,
      phone: payload.phone,
      address: payload.address,
      zipCode: String(payload.zipCode),
      lat: Number(payload.latitude || 0),
      lng: Number(payload.longitude || 0),
    });

    navigate(`/new-shipment?step=${tab}`);
  };

  useEffect(() => {
    setSearchParams({ src: tab }, { replace: true });
  }, [tab, setSearchParams]);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Toolbar sticky */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto w-full max-w-screen-sm space-y-3 px-4 pt-3 pb-2">
          <TabsSwitch active={tab} onTabChange={handleTabChange} />
          <AddressSearch value={search} onChange={setSearch} />
          <AddressSortButtons value={sort} onChange={setSort} />
        </div>
      </div>

      {/* List */}
      <div className="mx-auto w-full max-w-screen-sm px-4 pb-8">
        {loading && (
          <p className="rounded-lg bg-neutral-50 px-3 py-2 text-muted-foreground text-sm">
            Memuat…
          </p>
        )}
        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-red-600 text-sm">
            {String(error)}
          </p>
        )}

        <div className="mt-3 space-y-3">
          {list.map((addr, index) => {
            // ✅ key yang stabil & unik
            const key =
            addr.id && addr.id.trim() !== ""
              ? addr.id
              : `${addr.customerName}-${addr.phone}-${addr.zipCode}-${addr.latitude}-${addr.longitude}-${index}`;
          

            const parsed = extractAddressData(
              `${addr.zipCode}#${addr.address}#${addr.cityName}`,
            );
            const preview = parsed
              ? `${parsed.village}, ${parsed.district}, ${parsed.city}, ${parsed.zipCode}`
              : addr.address;
              const { main } = splitAddressNotes(addr.address);
              const short = (addr as any).shortLabel || deriveShort(main) || deriveShortFromParts(addr);
              
            return (
              <AddressCard
                key={key} 
                id={addr.id}
                label={short}
                name={addr.customerName}
                address={preview}
                withActions 
                isSelected={selectedKey === key}         // ← bandingkan dengan key unik
                onSelect={() => setSelectedKey(key)}                
                onConfirm={() => handleConfirm(addr)}
                onDelete={() => handleDelete(addr.id)}
              />
            );
          })}

          {!loading && !error && list.length === 0 && (
            <p className="rounded-lg bg-neutral-50 px-3 py-2 text-muted-foreground text-sm">
              Tidak ada alamat.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressSelection;
