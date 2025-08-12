// hooks/useAddressHistory.ts
import { addressHistoryAtom } from "@/atom/shipments-atom";
import type { AddressHistory } from "@/atom/shipments-atom";
import { useAtom } from "jotai";

export function useAddressHistory() {
  const [history, setHistory] = useAtom(addressHistoryAtom);

  const addhistory = (newItem: AddressHistory) => {
    setHistory((prev) => {
      // remove if address + postalCode match
      const filtered = prev.filter(
        (item) =>
          item.address !== newItem.address ||
          String(item.zipCode || "") !== String(newItem.zipCode || ""),
      );

      return [newItem, ...filtered].slice(0, 10);
    });
  };

  const remove = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = () => {
    setHistory([]);
  };

  return {
    history,
    addhistory,
    remove,
    clear,
  };
}
