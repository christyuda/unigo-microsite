import { useAtom } from "jotai";

import {
  receiverAddressDataAtom,
  receiverFormAtom,
  emptyAddress,
  StepEnum,
  currentStepAtom,
} from "@/atom/shipments-atom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const inputStyle =
  "w-full h-[58px] rounded-[16px] border px-4 py-3 text-sm placeholder:text-[#B7B7B7]";

const FormReceiverSection = () => {
  const [form, setForm] = useAtom(receiverFormAtom);
  const [, setStep] = useAtom(currentStepAtom);
  const [receiverAddressData, setReceiverAddressData] = useAtom(
    receiverAddressDataAtom,
  );
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState(false);
// 'rumah' | 'kantor' | 'lainnya'
const [labelOption, setLabelOption] = useState<"rumah" | "kantor" | "lainnya">("lainnya");

// initialize based on existing form.noteLabel
useEffect(() => {
  const normalized = (form.noteLabel || "").trim().toLowerCase();
  if (normalized === "rumah") setLabelOption("rumah");
  else if (normalized === "kantor") setLabelOption("kantor");
  else setLabelOption("lainnya");
}, []); // run once

  const splitAddressNotes = (raw?: string) => {
    const parts = (raw ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    return {
      main: parts[0] || "",
      noteLabel: parts[1] || "",
      courierNote: parts[2] || "",
    };
  };

  // Prefill from address data (only if form fields are empty)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!receiverAddressData) return;

    const { noteLabel, courierNote } = splitAddressNotes(
      receiverAddressData.address,
    );

    setForm((prev) => ({
      ...prev,
      name: prev.name || receiverAddressData.customerName || "",
      phoneNumber: prev.phoneNumber || receiverAddressData.phone || "",
      noteLabel: prev.noteLabel || noteLabel,
      courierNote: prev.courierNote || courierNote,
      isFavorite: prev.isFavorite || false,
    }));
  }, [receiverAddressData, setForm]);

  const validate = {
    name: !!form.name && form.name.trim().length >= 2,
    phone: /^(08\d{8,12}|628\d{7,12})$/.test(form.phoneNumber),
    noteLabel:
    !form.isFavorite
      ? true
      : labelOption !== "lainnya"
        ? true
        : !!form.noteLabel && form.noteLabel.trim().length > 0,  };

  const isValid = validate.name && validate.phone && validate.noteLabel;

  const handleChange = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!isValid) {
      setShowErrors(true);
      return;
    }

    // Trim once before saving
    setForm((prev) => ({ ...prev, noteLabel: prev.noteLabel.trim() }));

    // Merge into receiverAddressData without losing map fields
    setReceiverAddressData((prev) => {
      const base = prev ?? emptyAddress();

      return {
        ...base,
        customerName: form.name,
        phone: form.phoneNumber,

        // keep map-derived location fields
        address: base.address,
        villageId: base.villageId,
        villageName: base.villageName,
        districtId: base.districtId,
        districtName: base.districtName,
        cityId: base.cityId,
        cityName: base.cityName,
        provinceId: base.provinceId,
        provinceName: base.provinceName,
        zipCode: base.zipCode,
        longitude: base.longitude,
        latitude: base.latitude,

        // propagate optional fields if stored in AddressData
        noteLabel: form.noteLabel.trim(),
        courierNote: form.courierNote,
      };
    });

    setStep(StepEnum.SHIPMENT);
    navigate("/shipment-detail");
  };

  return (
    <div className="space-y-5">
      <p className="font-bold text-gray-400 text-sm uppercase">
        Informasi Penerima
      </p>

      {/* Nama Penerima */}
      <div className="space-y-1">
        <Label className="text-[#0D1440] text-[15px]">Nama Penerima</Label>
        <Input
          placeholder="Masukkan nama lengkap"
          value={form.name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              handleChange("name", value);
            }
          }}
          className={cn(
            inputStyle,
            showErrors && !validate.name
              ? "border-red-500"
              : "border-[#E3E3E3]",
          )}
        />
        {showErrors && !validate.name && (
          <p className="mt-1 text-red-500 text-sm">Nama minimal 2 huruf.</p>
        )}
      </div>

      {/* Nomor HP */}
      <div className="space-y-1">
        <Label className="text-[#0D1440] text-[15px]">Nomor HP Penerima</Label>
        <Input
          placeholder="08xxxxxxxxxx atau 628xxxxxxxxxx"
          type="tel"
          value={form.phoneNumber}
          onChange={(e) => {
            const value = e.target.value;
            if (/^(0\d{0,13}|62\d{0,13})$/.test(value)) {
              handleChange("phoneNumber", value);
            }
          }}
          className={cn(
            inputStyle,
            showErrors && !validate.phone
              ? "border-red-500"
              : "border-[#E3E3E3]",
          )}
        />
        {showErrors && !validate.phone && (
          <p className="mt-1 text-red-500 text-sm">
            Nomor HP harus dimulai dengan 08 atau 62 dan memiliki panjang valid.
          </p>
        )}
      </div>

      {/* Catatan untuk kurir */}
      <div className="space-y-1">
        <Label className="text-[#0D1440] text-[15px]">
          Catatan untuk kurir
        </Label>
        <Input
          placeholder="Contoh: Rumah, Kantor, Gudang..."
          value={form.courierNote}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 100) {
              handleChange("courierNote", value);
            }
          }}
          className={cn(inputStyle, "border-[#E3E3E3]")}
        />
      </div>

      {/* Simpan Favorit */}
      <div>
        <p className="mb-1 font-bold text-gray-400 text-sm uppercase">
          Simpan sebagai favorit
        </p>
        <div className="flex w-full items-center justify-between rounded-[16px] bg-[#F6F6F6] px-4 py-4">
          <p className="font-semibold text-[#0D1440] text-sm">
            Simpan alamat ini ke favorit
          </p>
          <Switch
            checked={form.isFavorite}
            onCheckedChange={(val) => handleChange("isFavorite", val)}
            className={form.isFavorite ? "bg-orange-500" : "bg-gray-300"}
          />
        </div>
      </div>

      {/* Label Catatan */}
      {/* Label Alamat */}
<div className="space-y-3">

  <RadioGroup
    value={labelOption}
    onValueChange={(val: "rumah" | "kantor" | "lainnya") => {
      setLabelOption(val);
      if (val === "rumah") {
        handleChange("noteLabel", "Rumah");
      } else if (val === "kantor") {
        handleChange("noteLabel", "Kantor");
      } else {
        // kosongkan saat pilih Lainnya agar user isi bebas
        handleChange("noteLabel", "");
      }
    }}
    className="grid grid-cols-3 gap-2"
  >
    <div className="flex items-center space-x-2">
      <RadioGroupItem id="opt-rumah" value="rumah" className="peer sr-only" />
      <Label
        htmlFor="opt-rumah"
        className={cn(
          "w-full cursor-pointer rounded-[12px] border px-4 py-3 text-center font-medium",
          "peer-data-[state=checked]:bg-orange-500 peer-data-[state=checked]:text-white",
          "peer-data-[state=checked]:border-orange-500"
        )}
      >
        Rumah
      </Label>
    </div>

    <div className="flex items-center space-x-2">
      <RadioGroupItem id="opt-kantor" value="kantor" className="peer sr-only" />
      <Label
        htmlFor="opt-kantor"
        className={cn(
          "w-full cursor-pointer rounded-[12px] border px-4 py-3 text-center font-medium",
          "peer-data-[state=checked]:bg-orange-500 peer-data-[state=checked]:text-white",
          "peer-data-[state=checked]:border-orange-500"
        )}
      >
        Kantor
      </Label>
    </div>

    <div className="flex items-center space-x-2">
      <RadioGroupItem id="opt-lainnya" value="lainnya" className="peer sr-only" />
      <Label
        htmlFor="opt-lainnya"
        className={cn(
          "w-full cursor-pointer rounded-[12px] border px-4 py-3 text-center font-medium",
          "peer-data-[state=checked]:bg-orange-500 peer-data-[state=checked]:text-white",
          "peer-data-[state=checked]:border-orange-500"
        )}
      >
        Lainnya
      </Label>
    </div>
  </RadioGroup>

  {/* Free text only when "Lainnya" */}
  {labelOption === "lainnya" && (
    <div className="space-y-1">
      <Label className="text-[#0D1440] text-[15px]">Label Catatan</Label>
      <Input
        placeholder="Contoh: Gudang 1, Lantai 2..."
        value={form.noteLabel}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[a-zA-Z0-9\s.'-]*$/.test(value) || value === "") {
            handleChange("noteLabel", value);
          }
        }}
        className={cn(
          inputStyle,
          showErrors && !validate.noteLabel ? "border-red-500" : "border-[#E3E3E3]"
        )}
      />
      {showErrors && !validate.noteLabel && (
        <p className="mt-1 text-red-500 text-sm">
          Label tidak boleh kosong saat memilih “Lainnya”.
        </p>
      )}
    </div>
  )}
</div>

      {/* Tombol Lanjut / Kembali */}
      <div className="flex gap-3 pt-2">
        <Button
          onClick={() => navigate("/new-shipment?step=sender")}
          className="h-[56px] w-1/2 rounded-xl bg-orange-500 font-semibold text-lg text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Kembali
        </Button>

        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="h-[56px] w-1/2 rounded-xl bg-orange-500 font-semibold text-lg text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Lanjut
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default FormReceiverSection;
