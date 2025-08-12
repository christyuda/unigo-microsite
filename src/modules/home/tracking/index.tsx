import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TrackingDetail from "./components/tracking-flow";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import useTitle from "@/hooks/useTitle";

export default function Tracking() {
  useTitle("Lacak Kiriman");
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderIdRef = useRef<HTMLInputElement>(null);

  const handlerCheckOrderId = () => {
    if (orderIdRef.current) {
      if (!orderIdRef.current.value) {
        toast.error("Masukkan ID Booking atau Nomor Resi Kiriman");
        return;
      }
      setSearchParams({ orderId: orderIdRef.current.value });
    }
  };

  const handleResetTrack = () => {
    searchParams.delete("orderId");
    if (orderIdRef.current?.value) {
      orderIdRef.current.value = "";
    }
    setSearchParams((prev) => {
      prev.delete("orderId");
      return prev;
    });
  };

  return (
    <HomeLayout>
      <NavHeader title="Tracking" />
      <div className="flex h-full w-full flex-col items-center gap-6 bg-background py-3 text-start">
        <Input
          type="text"
          className="w-full rounded-lg py-6"
          placeholder="Ketik ID Booking atau Nomor Resi Kiriman"
          ref={orderIdRef}
          defaultValue={orderId ? orderId : ""}
        />
        <div className="flex w-full flex-col items-center gap-3">
          <Button
            className="w-3/4 rounded-full bg-brand-500 py-6 text-white"
            onClick={handlerCheckOrderId}
          >
            Cek
          </Button>
          <Button
            variant={"link"}
            className="text-brand-500"
            onClick={handleResetTrack}
          >
            Reset
          </Button>
        </div>
        <Separator className="my-1 bg-gray-300" />
        {orderId ? (
          <TrackingDetail />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-gray-400">
            <PackageSearch size={82} className="text-brand-500" />
            <p className="w-3/4 text-center text-sm">
              Masukkan ID Booking untuk menampilkan detail pelacakan kiriman
              Anda.
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
