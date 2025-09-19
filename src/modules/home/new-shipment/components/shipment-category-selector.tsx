import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Archive,
  Cpu,
  Shirt,
  Utensils,
  Pill,
  Car,
  MoreHorizontal,
} from "lucide-react";
import ShipmentCategoryDrawer from "./shipment-category-drawer";
import { useAtom } from "jotai";
import { itemDataAtom, itemTypeIdAtom } from "@/atom/shipments-atom"; // or "@/atom/order-shipment-atom"
import { Input } from "@/components/ui/input";

const quickCategories = [
  { label: "Dokumen", icon: <Archive size={16} /> },
  { label: "Elektronik", icon: <Cpu size={16} /> },
  { label: "Makanan & Minuman", icon: <Utensils size={16} /> },
  { label: "Pakaian", icon: <Shirt size={16} /> },
  { label: "Obat-obatan", icon: <Pill size={16} /> },
  { label: "Otomotif", icon: <Car size={16} /> },
];

const ShipmentCategorySelector = () => {
  const [itemData, setItemData] = useAtom(itemDataAtom);
  const [, setItemTypeId] = useAtom(itemTypeIdAtom);
  const computeItemTypeId = (labelOrDesc: string, weight: number) => {
    const t = (labelOrDesc || "").trim().toLowerCase();
    return t === "dokumen" && weight <= 2000 ? 0 : 1;
  };
  useEffect(() => {
    setItemTypeId(
      computeItemTypeId(itemData.description || "", itemData.weight),
    );
  }, [itemData.description, itemData.weight]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // What’s currently selected (free text)
  const description = itemData.description || "";

  // Is the current description one of quick categories?
  const quickLabels = useMemo(() => quickCategories.map((c) => c.label), []);
  const isQuick = description && quickLabels.includes(description);

  const isActive = (label: string) => description === label;

  const updateDescription = (val: string) => {
    setItemData((prev) => ({ ...prev, description: val }));
  };

  // Keep any local UI in sync if needed (here we only rely on atoms)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {}, [description]);

  return (
    <div className="space-y-3">
      <p className="font-bold text-gray-400 text-sm">JENIS KIRIMAN</p>

      <div className="flex flex-wrap gap-2">
        {quickCategories.map((item) => (
          <Button
            key={item.label}
            onClick={() => {
              updateDescription(item.label);
              setItemTypeId(computeItemTypeId(item.label, itemData.weight)); // ← penting
            }}
            variant={isActive(item.label) ? "default" : "outline"}
            className={`rounded-full ${
              isActive(item.label)
                ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-400"
                : "border-gray-200 text-gray-700"
            }`}
          >
            {item.icon}
            <span className="ml-1">{item.label}</span>
          </Button>
        ))}

        <Button
          onClick={() => setIsSheetOpen(true)}
          variant="outline"
          className="rounded-full border-gray-200 text-gray-700"
        >
          <MoreHorizontal size={16} />
          <span className="ml-1">Selengkapnya</span>
        </Button>
      </div>

      {/* Show a pill if selection is NOT in quick buttons (drawer-only or custom) */}
      {!!description && !isQuick && (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={description}
            onChange={(e) => updateDescription(e.target.value)}
            maxLength={50}
            placeholder="Ketik deskripsi..."
            className="w-full rounded-xl border border-gray-300 p-3 text-[#0B0C44] text-sm placeholder:text-gray-400"
          />
        </div>
      )}

      <ShipmentCategoryDrawer
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        initialSelected={description} // ← preselect in drawer
        onSelect={({ label, description: desc }) => {
          const finalText = desc ?? label;
          updateDescription(finalText);
          setItemTypeId(computeItemTypeId(label, itemData.weight));
          setIsSheetOpen(false);
        }}
      />
    </div>
  );
};

export default ShipmentCategorySelector;
