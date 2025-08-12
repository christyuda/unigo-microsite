import { type ComponentProps, forwardRef, useState } from "react";
import { Input } from "./input";
import { formatCurrency } from "@/lib/utils";

interface CurrencyInputProps {
  value: number | string | undefined;
  onChange: (value: string) => void;
  className?: string;
}

const parseRupiah = (value: string) => {
  return Number.parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
};

const CurrencyInput = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & CurrencyInputProps
>(({ className, value, onChange, ...props }, ref) => {
  const [displayValue, setDisplayValue] = useState<string | number>(
    formatCurrency(value || "")
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseRupiah(inputValue);
    setDisplayValue(formatCurrency(numericValue));
    if (!numericValue) {
      onChange("");
      return;
    }
    onChange(numericValue.toString());
  };

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={handleChange}
      ref={ref}
      className={className}
      {...props}
    />
  );
});

export default CurrencyInput;
