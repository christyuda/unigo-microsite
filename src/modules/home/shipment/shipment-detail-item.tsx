import {
  FAILED_COLOR_STATUS_ID,
  PAID_COLOR_STATUS_ID,
  PROCESSING_COLOR_STATUS_ID,
  SUCCESS_COLOR_STATUS_ID,
} from "@/atom/global-atom";
import { PAYMENT_DATA, paymentMethodAtom } from "@/atom/payment-atom";
import HomeLayout from "@/components/layout/home-layout";
import Loader from "@/components/layout/loader";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import useTitle from "@/hooks/useTitle";
import {
  cn,
  convertGramsToKilograms,
  fetchApi,
  formatCurrency,
} from "@/lib/utils";
import type { CheckVaResult, ShipmentDetailItem } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAtomValue } from "jotai";
import { CirclePlus, ClipboardIcon, Loader2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import ShipmentInfo from "./shipment-info";

const TRACK_STATUS_NOT_ALLOWED = ["00", "01", "02", "03", "04", "97", "98"];
const SHOW_PICKUP_TIME = ["04"];

type DrawerBankProps = {
  openBankDrawer: boolean;
  setOpenBankDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

function DrawerBank({ ...props }: DrawerBankProps) {
  const paymentMethods = useAtomValue(paymentMethodAtom);

  const paymentMethodHandler = useCallback(
    (value: string) => {
      const result = paymentMethods.find((item) => item.id === value);

      if (result) {
        props.setSelectedPaymentMethod(result.id);
      }
    },
    [paymentMethods, props.setSelectedPaymentMethod]
  );

  const selectBankHandler = () => {
    props.setOpenBankDrawer(!props.openBankDrawer);
  };

  return (
    <Drawer
      open={props.openBankDrawer}
      onOpenChange={() => props.setOpenBankDrawer(!props.openBankDrawer)}
    >
      <DrawerContent className="max-w-md rounded-t-xl px-3">
        <DrawerHeader>
          <DrawerTitle>Pilih Bank</DrawerTitle>
          <DrawerDescription>Daftar Bank Tersedia</DrawerDescription>
        </DrawerHeader>
        <RadioGroup
          className="mb-16 w-full"
          onValueChange={paymentMethodHandler}
        >
          {paymentMethods.map((item) => (
            <Card
              className={cn(
                "ease flex h-24 items-center bg-white transition-all duration-200",
                {
                  "border-brand-500 bg-brand-50":
                    props.selectedPaymentMethod === item.id,
                }
              )}
              key={item.id}
            >
              <CardContent className="m-0 flex w-full items-center justify-between px-6 py-0">
                <Label htmlFor={item.id} className="w-full font-medium text-sm">
                  <div className="flex items-center gap-8">
                    <img
                      src={item.logo}
                      alt="posind"
                      className="h-10 w-1/4 object-contain"
                    />
                    <p className="font-bold">{item.label}</p>
                  </div>
                </Label>
                <RadioGroupItem
                  value={item.id}
                  id={item.id}
                  checked={props.selectedPaymentMethod === item.id}
                />
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
        <DrawerFooter>
          <Button
            className="w-full rounded-full bg-brand-500 py-6 text-white"
            onClick={selectBankHandler}
          >
            Pilih
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function ShipmentDetailItemBookingId() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  useTitle(`Detail Kiriman | ${bookingId}`);
  const [openBankDrawer, setOpenBankDrawer] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [_, setCopied] = useState<boolean>(false);

  const { isLoading, data: shipmentDetail } = useQuery({
    queryKey: ["shipment-detail", bookingId],
    queryFn: async () => {
      const res = await fetchApi<ShipmentDetailItem>(
        `order/detail?bookingId=${bookingId}`,
        {
          method: "get",
        }
      );

      setSelectedPaymentMethod(res.data.vaType || "pos");

      if (res.data.statusId === "01") {
        toast.error("Pembayaran belum terverifikasi");
      }

      if (res.data.statusId === "02") {
        toast.success("Pembayaran sudah terverifikasi");
      }

      queryClient.invalidateQueries({
        queryKey: ["shipment-info", bookingId],
      });

      return res;
    },
    select(data) {
      return data.data;
    },
    enabled: !!bookingId,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });

  const generateVa = useMutation({
    mutationKey: ["generate-va"],
    mutationFn: () =>
      fetchApi<CheckVaResult>("va/create", {
        method: "post",
        body: JSON.stringify({
          bookingId,
          vaType: selectedPaymentMethod,
        }),
      }),
    onSuccess: (data) => {
      if (data.code !== "000") {
        toast.error("Gagal membuat nomor VA");
        return;
      }

      toast.success("Nomor VA berhasil dibuat!");

      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["shipment-detail", bookingId],
        });
      }, 800);
    },
  });

  const checkPaymentMutate = useMutation({
    mutationKey: ["check-payment"],
    mutationFn: () =>
      fetchApi<any>("va/advice", {
        method: "post",
        body: JSON.stringify({
          bookingId,
        }),
      }),
    onSuccess: (data) => {
      if (data.code !== "000") {
        toast.error("Belum ada pembayaran diterima");
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["shipment-detail", bookingId],
      });

      toast.success("Pembayaran sudah terverifikasi");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Terjadi kesalahan, silahkan coba lagi!");
    },
  });

  const paymentMethodData = useMemo(() => {
    return PAYMENT_DATA.find((pay) => pay.id === selectedPaymentMethod);
  }, [selectedPaymentMethod]);

  const vaNumberPrefix = useMemo(() => {
    if (paymentMethodData?.prefix && shipmentDetail?.vaNumber) {
      return `${paymentMethodData.prefix}${shipmentDetail.vaNumber}`;
    }

    return shipmentDetail?.vaNumber || "-";
  }, [paymentMethodData, shipmentDetail]);

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
      {isLoading && <Loader />}
      <NavHeader title="Detail Kiriman" />
      <div className="flex h-[93vh] w-full flex-col gap-3 bg-background py-3 text-start">
        <div className="w-full">
          <p className="font-roboto text-gray-400">Order ID</p>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-brand-500 text-lg">
              {shipmentDetail?.id}
            </h1>
            <p
              className={cn(
                "rounded-md bg-gray-500 p-1 text-[8px] text-white",
                {
                  "bg-red-500 text-white": FAILED_COLOR_STATUS_ID.includes(
                    shipmentDetail?.statusId as string
                  ),
                  "bg-green-500 text-white": SUCCESS_COLOR_STATUS_ID.includes(
                    shipmentDetail?.statusId as string
                  ),
                  "bg-sky-500 text-white": PROCESSING_COLOR_STATUS_ID.includes(
                    shipmentDetail?.statusId as string
                  ),
                  "bg-yellow-500 text-white": PAID_COLOR_STATUS_ID.includes(
                    shipmentDetail?.statusId as string
                  ),
                }
              )}
            >
              {shipmentDetail?.statusName ?? "Dalam Proses"}
            </p>
          </div>
          {shipmentDetail?.bookingDate && (
            <p className="text-[10px] text-gray-500">
              Order dibuat pada{" "}
              {format(shipmentDetail?.bookingDate, "dd MMM yyyy HH:mm", {
                locale: id,
              })}
            </p>
          )}
        </div>
        <Separator className="bg-gray-300" />
        <div className={cn("mb-3 rounded-xl border p-2 shadow", "space-y-6")}>
          <h2 className="border-b pb-1 font-roboto font-semibold text-lg">
            Informasi Alamat
          </h2>
          {/* Pickup Address */}
          <div className="flex gap-3">
            <div className="mt-1.5">
              <div className="h-3 w-3 shrink-0 rounded-full bg-brand-500" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="font-medium">
                  {shipmentDetail?.sender.customerName ?? "-"} |{" "}
                  {shipmentDetail?.sender.phone ?? "-"}
                </div>
              </div>
              <div className="text-neutral-500 text-sm">
                {shipmentDetail?.sender.address ?? "-"},{" "}
                {shipmentDetail?.sender.city ?? "-"}
              </div>
              {SHOW_PICKUP_TIME.includes(
                shipmentDetail?.statusId as string
              ) && (
                <>
                  <Separator className="bg-gray-200" />
                  <div className="text-neutral-500 text-sm">
                    <span className="font-medium text-xs">Waktu Pickup</span>
                    <div>-</div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Delivery Address */}
          <div className="flex gap-3">
            <div className="mt-1.5 shrink-0">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="font-medium">
                  {shipmentDetail?.destination.customerName ?? "-"} |{" "}
                  {shipmentDetail?.destination.phone ?? "-"}
                </div>
              </div>
              <div className="text-neutral-500 text-sm">
                {shipmentDetail?.destination.address ?? "-"},{" "}
                {shipmentDetail?.destination.city ?? "-"}
              </div>
              <Separator className="bg-gray-200" />
              <div className="text-neutral-500 text-sm">
                <span className="font-medium text-xs">Perkiraan Tiba</span>
                <div>
                  {shipmentDetail?.destination.arrivedEstimation
                    ?.toLowerCase()
                    .includes("0 hari")
                    ? "Hari ini"
                    : shipmentDetail?.destination.arrivedEstimation ?? "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!TRACK_STATUS_NOT_ALLOWED.includes(
          shipmentDetail?.statusId as string
        ) && (
          <Link
            to={`/tracking?orderId=${shipmentDetail?.id ?? "0"}`}
            className="w-full rounded-full border border-brand-500 py-3 text-center font-bold text-brand-500 hover:bg-brand-50"
          >
            Lacak
          </Link>
        )}
        <Separator className="mt-0 bg-gray-300" />
        <div className="flex flex-col space-y-4">
          <h2 className="font-roboto font-semibold text-lg">
            Informasi Kiriman
          </h2>
          <Card>
            <CardContent className="space-y-4 p-4 text-gray-500">
              <div className="flex items-center justify-between">
                <span className="text-sm">Deskripsi Kiriman</span>
                <span className="text-sm">
                  {shipmentDetail?.item.description ?? "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Berat & ukuran</span>
                <span className="text-sm">
                  {convertGramsToKilograms(
                    Number(shipmentDetail?.item.weight || 0)
                  )}{" "}
                  | {Number(shipmentDetail?.item.length)}x
                  {Number(shipmentDetail?.item.width)}x
                  {Number(shipmentDetail?.item.height)} cm
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Nilai kiriman</span>
                <span className="text-sm">
                  {formatCurrency(Number(shipmentDetail?.item.value || 0))}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex items-start justify-between">
                  <span className="font-normal text-sm">Total Pembayaran</span>
                  <div className="text-right">
                    <div className="font-medium text-brand-500 text-xl">
                      {formatCurrency(
                        Number(shipmentDetail?.fee.totalAmount || 0)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {shipmentDetail?.statusId === "03" && (
            <Card className="border-brand-500 bg-brand-50">
              <CardContent className="flex flex-col gap-3 p-3">
                <h3 className="font-semibold text-lg">Informasi Pickup</h3>
                <div>
                  <Label className="text-gray-400 text-sm">
                    Nama Petugas Picker
                  </Label>
                  <p>{shipmentDetail?.pickupDetail?.pickuperName ?? "-"}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm">Nomor ponsel</Label>
                  <p>{shipmentDetail?.pickupDetail?.pickuperPhone ?? "-"}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <ShipmentInfo />
        <div className={cn("mt-auto pb-3", "space-y-3")}>
          {shipmentDetail?.statusId === "01" && (
            <>
              <Separator className="mt-3 mb-6 bg-gray-300" />
              <Card className="mb-3 border-brand-500">
                <CardContent className="flex flex-col items-start justify-between gap-4 p-4 text-gray-500 text-sm">
                  <div className="flex w-full justify-between">
                    {paymentMethodData?.logo && (
                      <img
                        src={paymentMethodData.logo}
                        alt={`label ${paymentMethodData?.label}`}
                        className="h-8 w-auto"
                      />
                    )}
                    <Link to="/how-to-pay" className="text-brand-500 underline">
                      Lihat Cara Bayar
                    </Link>
                  </div>
                  <div className="w-full">
                    <p>Nomor Virtual Account </p>
                    <div className="flex items-end justify-between gap-2">
                      {shipmentDetail.vaNumber.length > 0 ? (
                        <p className="font-semibold text-black text-lg underline">
                          {paymentMethodData?.prefix ?? ""}
                          {shipmentDetail.vaNumber ?? "-"}
                        </p>
                      ) : (
                        <Button
                          size={"sm"}
                          className="mt-3 w-full items-center rounded-lg bg-slate-500 text-white shadow-none hover:bg-slate-700"
                          onClick={() => generateVa.mutate()}
                        >
                          <CirclePlus />
                          Buat Nomor VA
                        </Button>
                      )}
                      {shipmentDetail.vaNumber.length > 0 && (
                        <Button
                          variant={"link"}
                          className="px -0 m-0 gap-2 border text-sm"
                          size={"sm"}
                          onClick={copyToClipboard}
                        >
                          <ClipboardIcon size={16} className="text-brand-500" />
                          <span className="text-sm">Salin</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button
                className="w-full rounded-full border border-brand-500 bg-white py-6 text-brand-500 hover:bg-brand-100"
                onClick={() => setOpenBankDrawer(!openBankDrawer)}
              >
                Ganti pilihan bank pembayaran
              </Button>
              <Button
                className="w-full rounded-full bg-brand-500 py-6 text-white hover:bg-brand-600"
                onClick={() => checkPaymentMutate.mutate()}
                // onClick={() =>
                //   queryClient.invalidateQueries({
                //     queryKey: ["shipment-detail", bookingId],
                //   })
                // }
                disabled={checkPaymentMutate.isPending}
              >
                {checkPaymentMutate.isPending ? (
                  <Loader2 className="shrink-0 animate-spin" size={128} />
                ) : (
                  "Cek Status Pembayaran"
                )}
              </Button>
            </>
          )}
        </div>
        <DrawerBank
          openBankDrawer={openBankDrawer}
          setOpenBankDrawer={setOpenBankDrawer}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
      </div>
    </HomeLayout>
  );
}
