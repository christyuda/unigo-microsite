import { addOrderResultAtom, orderPayloadAtom } from "@/atom/order-atom";
import {
  selectedPaymentMethodAtom,
  underPaymentAtom,
} from "@/atom/payment-atom";
import HomeLayout from "@/components/layout/home-layout";
import Loader from "@/components/layout/loader";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchApi, formatCurrency } from "@/lib/utils";
import type { CheckVaResult, ShipmentDetailItem } from "@/types/types";
import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { ClipboardIcon, Loader2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import HowToPayCard from "./components/how-to-pay-card";
import useClearShipment from "@/hooks/useClearShipment";
import useTitle from "@/hooks/useTitle";

export default function Payment() {
  useTitle("Pembayaran");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isUnderpayment = searchParams.get("pay") === "underpayment";
  const underPayment = useAtomValue(underPaymentAtom);
  const [orderResult] = useAtom(addOrderResultAtom);
  const [orderPayload] = useAtom(orderPayloadAtom);
  const [paymentMethod] = useAtom(selectedPaymentMethodAtom);
  const [initLoad, setInitLoad] = useState<boolean>(false);
  const [_, setCopied] = useState<boolean>(false);
  const checkHistoryHandler = useClearShipment({ navigateTo: "/history" });

  const { isLoading, data: checkVaResult } = useQuery({
    queryKey: ["check-va", orderResult.bookingId, paymentMethod.id],
    queryFn:
      orderResult.bookingId && !isUnderpayment
        ? () =>
            fetchApi<CheckVaResult>("va/create", {
              method: "post",
              body: JSON.stringify({
                bookingId: orderResult.bookingId,
                vaType: paymentMethod.id,
              }),
            })
        : skipToken,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });

  const { isLoading: isCheckPayment } = useQuery({
    queryKey: [
      "shipment-detail-payment",
      orderResult.bookingId || underPayment.bookingId,
      initLoad,
    ],
    queryFn: async () => {
      const res = await fetchApi<ShipmentDetailItem>(
        `order/detail?bookingId=${
          orderResult.bookingId || underPayment.bookingId
        }`,
        {
          method: "get",
        }
      );

      // Belum bayar
      if (res.data.statusId === "01") {
        toast.error("Pembayaran belum terverifikasi");
      }

      // Kurang Bayar
      if (res.data.statusId === "97") {
        toast.error("Pembayaran kurang bayar belum terverifikasi");
      }

      if (res.data.statusId === "02") {
        toast.success("Pembayaran sudah terverifikasi");
        navigate(
          `/shipment-detail/${orderResult.bookingId || underPayment.bookingId}`
        );
      }

      return res;
    },
    staleTime: 10000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    enabled: initLoad,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!paymentMethod.id) {
      navigate("/history");
    }

    if (initLoad) {
      setInitLoad(true);
    }
  }, []);

  const checkPaymentMutate = useMutation({
    mutationKey: ["check-payment"],
    mutationFn: () =>
      fetchApi<any>("va/advice", {
        method: "post",
        body: JSON.stringify({
          bookingId: orderResult.bookingId,
        }),
      }),
    onSuccess: (data) => {
      console.log(data);

      if (data.code !== "000") {
        toast.error("Belum ada pembayaran diterima");
        return;
      }

      toast.success("Pembayaran sudah terverifikasi");
      setTimeout(() => {
        navigate("/payment-success");
      }, 1000);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Terjadi kesalahan, silahkan coba lagi!");
    },
  });

  const vaNumberPrefix = useMemo(() => {
    if (
      paymentMethod.prefix &&
      checkVaResult?.data.vaNumber &&
      !isUnderpayment
    ) {
      return `${paymentMethod.prefix}${checkVaResult?.data.vaNumber}`;
    }

    if (isUnderpayment) {
      if (paymentMethod.prefix) {
        return `${paymentMethod.prefix}${underPayment.underpaymentVa}`;
      }

      return underPayment.underpaymentVa;
    }

    return checkVaResult?.data.vaNumber || "-";
  }, [checkVaResult, paymentMethod.prefix, isUnderpayment, underPayment]);

  const copyToClipboard = async () => {
    try {
      if (!vaNumberPrefix) {
        throw new Error("Invalid number");
      }

      await navigator.clipboard.writeText(vaNumberPrefix);

      setCopied(true);
      toast.success("Nomor VA telah disalin");
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.log(err);
      toast.error("Gagal menyalin nomor VA, silahkan coba lagi");
    }
  };

  return (
    <HomeLayout>
      {(isLoading || isCheckPayment) && <Loader />}
      <NavHeader title="Pembayaran" />
      <div className="flex h-full min-h-screen flex-col py-3">
        <p className="mb-3">
          Order ID:{" "}
          <span className="font-semibold text-brand-500">
            {orderResult.bookingId || underPayment.bookingId}
          </span>
        </p>
        <p className="text-start">
          Silahkan selesaikan pembayaran Anda dengan cara dibawah ini:
        </p>
        <div className="my-6 flex w-full items-center gap-6">
          <div>
            <img
              src={paymentMethod.logo}
              alt="pos logo"
              className="h-16 w-auto"
            />
          </div>
          <p className="font-bold">{paymentMethod.label}</p>
        </div>
        <div className="mt-3 flex flex-col items-start">
          <p className="text-sm">Nomor Virtual Account</p>
          <div className="flex w-full items-center justify-between">
            <p className="my-3 font-bold text-xl">{vaNumberPrefix}</p>
            <Button
              variant={"link"}
              className="gap-2 border"
              onClick={copyToClipboard}
            >
              <ClipboardIcon size={16} className="text-brand-500" />
              <span className="text-sm">Salin</span>
            </Button>
          </div>
        </div>
        <div className="mt-3 flex flex-col items-start justify-end">
          <p className="text-sm">Lihat Ringkasan Pembayaran</p>
          <div className="flex w-full items-center justify-between">
            <p className="my-3 font-bold text-lg">Total Pembayaran</p>
            <p className="font-bold text-brand-500 text-xl">
              {formatCurrency(
                orderPayload.feeData.totalAmount ?? underPayment.amount
              )}
            </p>
          </div>
        </div>
        <Separator className="mt-0 mb-4 bg-gray-300" />
        <div className="mb-3">
          <HowToPayCard />
        </div>
        <div className="sticky bottom-0 mt-auto mb-2 flex w-full max-w-md flex-col justify-center rounded-lg bg-white/75 p-2">
          <Button
            onClick={() => checkPaymentMutate.mutate()}
            disabled={checkPaymentMutate.isPending}
            className="w-full rounded-full bg-brand-500 py-6 text-white"
          >
            {checkPaymentMutate.isPending ? (
              <Loader2Icon className="animate-spin" size={64} />
            ) : (
              "Cek Status Pembayaran"
            )}
          </Button>
          <Button
            variant={"link"}
            onClick={checkHistoryHandler}
            className="my-0 w-full rounded-full text-center text-brand-500"
          >
            Lihat Riwayat Kiriman
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
}
