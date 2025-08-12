import BoxSuccess from "@/assets/done.svg";
import { addOrderResultAtom } from "@/atom/order-atom";
import { Button } from "@/components/ui/button";
import useClearShipment from "@/hooks/useClearShipment";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const orderData = useAtomValue(addOrderResultAtom);
  const checkHistoryHandler = useClearShipment({ navigateTo: "/history" });

  useEffect(() => {
    if (!orderData.bookingId) {
      navigate("/");
    }
  }, [orderData, navigate]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between p-3">
      <div className="my-auto flex flex-col items-center gap-4">
        <img src={BoxSuccess} alt="box success" className="h-90 w-auto" />
        <h1 className="font-bold text-xl">Kiriman berhasil dibuat</h1>
        <p className="max-w-xs text-center text-gray-500 text-sm">
          Sekarang duduk dan bersantailah, Picker kami akan mengambil paket
          Anda. Terima kasih!
        </p>
      </div>
      <Button
        onClick={checkHistoryHandler}
        className="w-full flex-none rounded-full bg-brand-500 py-6 text-white"
      >
        Lihat Riwayat Kiriman
      </Button>
    </div>
  );
}
