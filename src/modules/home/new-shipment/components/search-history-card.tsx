import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  subsubtitle: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onConfirm?: () => void;
  onRemove?: () => void;
}

const SearchHistoryCard = ({
  title,
  subtitle,
  subsubtitle,
  isSelected = false,
  onSelect,
  onConfirm,
  onRemove,
}: Props) => {
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
      {/* Tombol hapus */}
      {onRemove && (
        <Button
          className="absolute top-2 right-2 text-gray-200 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X size={16} />
        </Button>
      )}
      <div className="mb-1 font-bold text-[#0A0A0A] text-base leading-snug">
        {title}
      </div>
      <div className="mb-1 text-[#606060] text-sm leading-snug">{subtitle}</div>
      <div className="text-[#A0A0A0] text-sm leading-snug">{subsubtitle}</div>

      {isSelected && (
        <div className="pt-2">
          <button
            type="button"
            className="w-full rounded-xl bg-[#F76B1C] py-2 font-semibold text-sm text-white"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm?.();
            }}
          >
            Pilih
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchHistoryCard;
