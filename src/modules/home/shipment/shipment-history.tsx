import { dataUserAtomWithStorage } from "@/atom/home-atom";
import HomeLayout from "@/components/layout/home-layout";
import Loader from "@/components/layout/loader";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useTitle from "@/hooks/useTitle";
import { cn, fetchApi } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { PackageX, PlusSquareIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  FAILED_COLOR_STATUS_ID,
  PAID_COLOR_STATUS_ID,
  PROCESSING_COLOR_STATUS_ID,
  SUCCESS_COLOR_STATUS_ID,
} from "@/atom/global-atom";

type ShipmentHistoryItem = {
  id: string;
  bookingDate: string;
  sender: {
    customerName: string;
    city: string;
  };
  destination: {
    customerName: string;
    city: string;
  };
  statusId:
    | "01"
    | "02"
    | "03"
    | "04"
    | "05"
    | "06"
    | "07"
    | "97"
    | "98"
    | "99"
    | null;
  statusName: string | null;
};

export default function ShipmentHistory() {
  useTitle("Kiriman Anda");
  const navigate = useNavigate();

  const dataUser = useAtomValue(dataUserAtomWithStorage);

  const { isLoading, data: shipmentHistories } = useQuery({
    queryKey: ["shipment-history"],
    queryFn: () =>
      fetchApi<{ items: ShipmentHistoryItem[] }>(
        `order/list?merchantUserId=${dataUser.id}`,
        {
          method: "get",
        },
      ),
    enabled: !!dataUser.id,
    retry: 5,
  });

  return (
    <HomeLayout>
      {isLoading && <Loader />}
      <NavHeader title="Kiriman Anda" />
      <div className="relative mt-3 min-h-32 w-full overflow-hidden rounded bg-brand-500 text-start">
        <div className="-left-32 absolute h-56 w-[95%] rounded-full bg-[#495867]" />
        <div className="relative z-10 flex h-full flex-wrap items-center justify-between gap-4 px-4 py-6 text-white">
          <div className="space-y-2">
            <p className="truncate text-xs">
              Anda sudah bertransaksi sebanyak:
            </p>
            <p className="font-bold text-2xl">
              {shipmentHistories?.data.items.length ?? 0}
            </p>
          </div>
          <div>
            <Button
              onClick={() => navigate("/new-shipment")}
              className="gap-2 bg-white text-brand-500 text-xs"
            >
              <PlusSquareIcon size={16} />
              Buat Kiriman
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex h-full w-full flex-col">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-bold">Riwayat Kiriman</p>
          {/* <Button variant={"link"} className="text-brand-500 text-xs">
            Lihat Semua
          </Button> */}
        </div>
        <div className="mb-10 flex min-h-[63vh] flex-col gap-3 py-3">
          {!shipmentHistories?.data.items.length ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-2 text-center">
              <PackageX className="text-gray-400" size={82} />
              <p className="my-auto w-3/4 text-center text-gray-400 text-sm">
                Daftar kirimanmu masih kosong, nih! Ayo isi dengan kiriman baru
                biar rame!
              </p>
            </div>
          ) : (
            shipmentHistories?.data.items.map((item) => (
              <Link to={`/shipment-detail/${item.id}`} key={item.id}>
                <Card className="border-brand-500 bg-brand-50 shadow-none">
                  <CardHeader className="space-0 flex flex-col flex-wrap gap-2 pb-2">
                    <CardTitle className="w-fit font-bold font-roboto text-lg">
                      {item.id}
                    </CardTitle>
                    <div
                      className={cn(
                        "m-0 flex h-8 w-fit items-center rounded-full bg-gray-500 px-3 font-semibold text-white text-xs",
                        {
                          "bg-green-500": SUCCESS_COLOR_STATUS_ID.includes(
                            item.statusId as string,
                          ),
                          "bg-red-500": FAILED_COLOR_STATUS_ID.includes(
                            item.statusId as string,
                          ),
                          "bg-sky-500": PROCESSING_COLOR_STATUS_ID.includes(
                            item.statusId as string,
                          ),
                          "bg-yellow-500": PAID_COLOR_STATUS_ID.includes(
                            item.statusId as string,
                          ),
                        },
                      )}
                    >
                      <p>{item?.statusName || "Dalam Proses"}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-start justify-between text-start">
                    <div className="w-1/2 flex-1 space-y-0.5">
                      <span className="text-gray-400 text-xs">Dari</span>
                      <div className="font-semibold">
                        {item.sender.customerName}
                      </div>
                      <div className="text-brand-500 text-sm">
                        {item.sender.city ?? "-"}
                      </div>
                    </div>
                    <div className="w-1/2 flex-1 space-y-0.5">
                      <span className="text-gray-400 text-xs">Kepada</span>
                      <div className="font-semibold">
                        {item.destination.customerName}
                      </div>
                      <div className="text-brand-500 text-sm">
                        {item.destination.city}
                      </div>
                    </div>
                    <div className="mt-3 w-full flex-none text-start text-gray-400 text-sm">
                      Dibuat pada{" "}
                      {format(new Date(item.bookingDate), "dd MMM yyyy HH:mm", {
                        locale: id,
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
        <div className="sticky right-0 bottom-0 left-0 mx-auto w-full px-3">
          <Button
            variant="outline"
            className="mt-auto mb-3 w-full rounded-full border-brand-500 py-6 text-brand-500"
            onClick={() => navigate("/")}
          >
            Kembali ke Halaman Utama
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
}
