import { useAtom } from "jotai";
import { searchQueryAtom } from "@/atom/shipments-atom";

const PickupSearchInput = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  return (
    <input
      type="text"
      placeholder="Cari riwayat alamat..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full rounded-lg border px-4 py-2 text-sm"
    />
  );
};

export default PickupSearchInput;
