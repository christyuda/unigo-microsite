// hooks/useAddressList.ts
import { useCallback, useEffect, useState } from "react";
import { fetchApi } from "@/lib/utils";
import type {
  ApiResponse,
  AddressApiItem,
  AddressListResponse,
} from "@/atom/shipments-atom";

export function useAddressList(
  merchantUserId: string,
  addressTypeId: "02" | "03", // 02=sender, 03=receiver
  isFavorite: boolean,
) {
  const [data, setData] = useState<AddressApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    if (!merchantUserId) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetchApi<
        ApiResponse<AddressListResponse> | AddressListResponse
      >("address/list", {
        // ini akan menghasilkan:
        // /api/v1/kurir/address/list?merchantUserId=...&addressTypeId=...&isFavorite=true/false
        searchParams: {
          merchantUserId,
          addressTypeId,
          isFavorite: String(isFavorite),
        },
      });

      // server kadang membungkus di { status, code, data }, kadang langsung data
      const items =
        (res as any)?.data?.items ??
        (res as any)?.data?.data?.items ?? // jaga-jaga
        (res as any)?.items ??
        [];

      setData(Array.isArray(items) ? (items as AddressApiItem[]) : []);
    } catch (e) {
      console.error(e);
      setError("Gagal mengambil data alamat");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [merchantUserId, addressTypeId, isFavorite]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!cancelled) await fetchAddresses();
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchAddresses]);

  return { data, loading, error, refetch: fetchAddresses, setData };
}
