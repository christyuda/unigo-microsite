import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Archive,
  Cpu,
  Utensils,
  Shirt,
  Pill,
  Car,
  Home,
  Wine,
  Gamepad2,
  MoreHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ShipmentCategoryDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (value: { label: string; description?: string }) => void;
  initialSelected?: string | null; // ← NEW
}

const categories = [
  { label: "Dokumen", icon: <Archive size={16} /> },
  { label: "Elektronik", icon: <Cpu size={16} /> },
  { label: "Makanan & Minuman", icon: <Utensils size={16} /> },
  { label: "Pakaian", icon: <Shirt size={16} /> },
  { label: "Obat-obatan", icon: <Pill size={16} /> },
  { label: "Otomotif", icon: <Car size={16} /> },
  { label: "Peralatan Rumah", icon: <Home size={16} /> },
  { label: "Barang Kaca", icon: <Wine size={16} /> },
  { label: "Mainan/Hobi", icon: <Gamepad2 size={16} /> },
  { label: "Lainnya", icon: <MoreHorizontal size={16} /> },
];

const ShipmentCategoryDrawer = ({
  open,
  onClose,
  onSelect,
  initialSelected = null,
}: ShipmentCategoryDrawerProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  // Preselect when opening (handles existing selection)
  useEffect(() => {
    if (!open) return;
    if (!initialSelected) {
      setSelected(null);
      setDescription("");
      return;
    }
    // If initialSelected matches a known category, preselect it; else treat as "Lainnya"
    const known = categories.some((c) => c.label === initialSelected);
    if (known) {
      setSelected(initialSelected);
      setDescription("");
    } else {
      setSelected("Lainnya");
      setDescription(initialSelected);
    }
  }, [open, initialSelected]);

  const handleConfirm = () => {
    if (selected === "Lainnya" && description.trim()) {
      onSelect({ label: "Lainnya", description: description.trim() });
    } else if (selected && selected !== "Lainnya") {
      onSelect({ label: selected });
    }
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="space-y-4 rounded-t-2xl p-4">
        <DrawerHeader>
          <DrawerTitle className="text-center font-bold text-[#0B0C44] text-xl">
            Pilih Jenis Barang yang Sesuai
          </DrawerTitle>
        </DrawerHeader>

        <div>
          <p className="mb-2 font-bold text-gray-400 text-sm">
            KATEGORI ISI KIRIMAN
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => {
              const isActive = selected === item.label;
              return (
                <Button
                  key={item.label}
                  onClick={() => {
                    setSelected(item.label);
                    if (item.label !== "Lainnya") setDescription("");
                  }}
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 px-4 py-[10px]",
                    "h-[46px] w-auto max-w-full justify-start rounded-[16px] border font-medium text-sm shadow-none",
                    isActive
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border border-[#E5E5E5] bg-[#F5F5F5] text-[#0B0C44]",
                  )}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {selected === "Lainnya" && (
          <div>
            <p className="mb-2 font-bold text-gray-400 text-sm">
              DESKRIPSI ISI KIRIMAN
            </p>
            <textarea
              placeholder="Tuliskan deskripsi isi kiriman..."
              value={description}
              maxLength={50}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[90px] w-full rounded-xl border border-gray-300 p-3 text-sm placeholder:text-gray-400"
            />
          </div>
        )}

        <Button
          disabled={
            !selected || (selected === "Lainnya" && !description.trim())
          }
          className="h-[50px] w-full rounded-xl bg-orange-500 font-semibold text-base text-white hover:bg-orange-400 disabled:opacity-50"
          onClick={handleConfirm}
        >
          Pilih dan Kembali ✔
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

export default ShipmentCategoryDrawer;
