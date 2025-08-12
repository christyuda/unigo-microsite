import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import React from "react";

interface AddressOptionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  isPrimary?: boolean;
}

const AddressOptionButton = React.forwardRef<
  HTMLButtonElement,
  AddressOptionButtonProps
>(({ icon, label, isPrimary = false, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center justify-between rounded-[16px] border px-4 py-4",
        isPrimary ? "border-orange-500" : "border-[#E3E3E3]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-5 w-5 items-center justify-center text-orange-500">
          {icon}
        </div>
        <span className="font-semibold text-[#0D1440] text-base">{label}</span>
      </div>
      <ChevronRight
        className={cn(
          "h-5 w-5",
          isPrimary ? "text-orange-500" : "text-gray-400",
        )}
      />
    </button>
  );
});

AddressOptionButton.displayName = "AddressOptionButton";

export default AddressOptionButton;
