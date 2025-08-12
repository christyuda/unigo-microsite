import { cn } from "@/lib/utils";
import { Star, Trash2, ExternalLink } from "lucide-react";

interface AddressCardProps {
  id?: string;
  label: string;
  name: string;
  address: string;
  isPrimary?: boolean;
  withActions?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onConfirm?: () => void;
  onDelete?: (id: string) => void;
}

export const AddressCard = ({
  id,
  label,
  name,
  address,
  isPrimary = false,
  withActions = false,
  isSelected = false,
  onSelect,
  onConfirm,
  onDelete,
}: AddressCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-white p-4 text-left shadow-sm transition-colors",
        isSelected ? "border-[#F76B1C]" : "border-[#E6E6E6]",
        !isSelected && "cursor-pointer",
      )}
      {...(!isSelected && {
        onClick: onSelect,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelect?.();
          }
        },
        tabIndex: 0,
        role: "button",
      })}
    >
      <div className="mb-1 font-medium text-gray-500 text-sm">{label}</div>
      <div className="mb-1 font-bold text-[#0A0A0A] text-base leading-snug">
        {name}
      </div>
      <div className="mb-3 text-[#606060] text-sm leading-snug">{address}</div>

      {isSelected && (
        <div className="pt-2">
          <button
            type="button"
            className="w-full rounded-xl bg-[#F76B1C] py-2 font-semibold text-sm text-white"
            onClick={(e) => {
              e.stopPropagation(); // cegah klik outer div
              onConfirm?.();
            }}
          >
            Pilih
          </button>
        </div>
      )}
      {withActions && (
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-gray-400" />
          <button
            type="button"
            aria-label="Hapus alamat"
            title="Hapus alamat"
            onClick={(e) => {
              e.stopPropagation();
              id && onDelete?.(id);
              console.log("Hapus alamat dengan ID:", id);
            }}
            className="rounded p-1 hover:bg-gray-100 focus:outline-none focus:ring"
          >
            <Trash2 className="h-4 w-4 text-gray-400" />
          </button>{" "}
        </div>
      )}

      {isPrimary && (
        <ExternalLink className="absolute top-3 right-3 h-4 w-4 text-gray-400" />
      )}
    </div>
  );
};
