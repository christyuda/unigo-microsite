import { Button } from "@/components/ui/button";

interface AddressSortButtonsProps {
  value: "atoz" | "ztoa" | "saved";
  onChange: (val: "atoz" | "ztoa" | "saved") => void;
}

const AddressSortButtons = ({ value, onChange }: AddressSortButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant={value === "atoz" ? "default" : "outline"}
        className={`rounded-full px-4 py-2 font-semibold text-sm ${
          value === "atoz"
            ? "border-none bg-[#F76B1C] text-white"
            : "border-[#E0E0E0] text-[#333]"
        }`}
        onClick={() => onChange("atoz")}
      >
        A - Z
      </Button>
      <Button
        type="button"
        variant={value === "ztoa" ? "default" : "outline"}
        className={`rounded-full px-4 py-2 font-semibold text-sm ${
          value === "ztoa"
            ? "border-none bg-[#F76B1C] text-white"
            : "border-[#E0E0E0] text-[#333]"
        }`}
        onClick={() => onChange("ztoa")}
      >
        Z - A
      </Button>
      <Button
        type="button"
        variant={value === "saved" ? "default" : "outline"}
        className={`rounded-full px-4 py-2 font-semibold text-sm ${
          value === "saved"
            ? "border-none bg-[#F76B1C] text-white"
            : "border-[#E0E0E0] text-[#333]"
        }`}
        onClick={() => onChange("saved")}
      >
        Terakhir Disimpan
      </Button>
    </div>
  );
};

export default AddressSortButtons;
