import Loader from "@/components/layout/loader";
import { Card, CardContent } from "@/components/ui/card";
import { cn, fetchApi } from "@/lib/utils";
import type { TrackingResponse } from "@/types/types";
import { skipToken, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PackageX } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function TrackingDetail() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { isLoading, data: trackingData } = useQuery({
    queryKey: ["tracking", orderId],
    queryFn: orderId
      ? () => fetchApi<TrackingResponse>(`tracking?bookingId=${orderId}`)
      : skipToken,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (trackingData?.code !== "000") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <PackageX className="text-red-500" size={82} />
        <p className="text-gray-400 text-sm">{trackingData?.message ?? "-"}</p>
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-xl">
      <CardContent className="p-6">
        {/* Transaction Details */}
        <div className="space-y-4">
          <h2 className="font-medium text-lg">Detail Transaksi</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="text-muted-foreground text-sm">
                Nomor Resi Kiriman
              </div>
              <div className="font-mono text-orange-500">
                {trackingData.data.connoteCode}
              </div>
            </div>
            {trackingData.data.extraData.pod.timeReceive && (
              <div className="space-y-1.5">
                <div className="text-muted-foreground text-sm">
                  Waktu Diterima
                </div>
                <p className="text-brand-500">
                  {format(
                    new Date(trackingData.data.extraData.pod.timeReceive),
                    "dd MMM yyyy HH:mm",
                    { locale: id }
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Sender Details */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-brand-100 p-4">
            <div className="text-brand-500 text-sm">Nama Pengirim</div>
            <div className="font-medium">{trackingData.data.sender.name}</div>
          </div>
          <div className={cn("rounded-lg bg-brand-100 p-4 text-brand-500", {})}>
            <div className="text-sm">Status</div>
            <p className="font-medium text-black">
              {trackingData.data.connoteStatusName}
            </p>
          </div>
        </div>
        {/* Package Details */}
        {/* <div className="mt-6">
          <h2 className="mb-4 font-medium text-lg">Detail Kiriman</h2>
          <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
            <div>
              <div className="text-muted-foreground text-sm">Jenis Barang</div>
              <div>Paket</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Detail</div>
              <div>PONSEL RETUR</div>
            </div>
          </div>
        </div> */}
        {/* Timeline */}
        <div className="mt-6">
          {trackingData.data.connoteHistoryDatas.map((item) => (
            <div
              className={cn("relative pb-5 pl-6", {
                "border-brand-200 border-l-2":
                  trackingData.data.connoteHistoryDatas.length > 1 &&
                  item !==
                    trackingData.data.connoteHistoryDatas[
                      trackingData.data.connoteHistoryDatas.length - 1
                    ],
              })}
              key={item.id}
            >
              <div className="-translate-x-1/2 absolute top-0 left-0 h-4 w-4 rounded-full bg-brand-500" />
              <div className="flex items-center justify-between">
                <div className="text-blue-500">
                  {format(new Date(item.date), "dd MMM yyyy HH:mm:ss", {
                    locale: id,
                  })}
                </div>
              </div>
              <div>
                <div className="font-medium">{item.action}</div>
                <p className="text-muted-foreground text-sm">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
