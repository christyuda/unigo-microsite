// src/features/address-favorite/components/address-search.tsx

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AddressSearchProps {
  value: string;
  onChange: (val: string) => void;
}

const AddressSearch = ({ value, onChange }: AddressSearchProps) => {
  return (
    <div className="relative">
      <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-[#999999]" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari alamat"
        className="h-[48px] rounded-xl bg-[#FAFAFA] pr-4 pl-10 text-sm placeholder:text-[#999999]"
      />
    </div>
  );
};

export default AddressSearch;
