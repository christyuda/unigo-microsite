import { underPaymentAtom } from "@/atom/payment-atom";
import Loader from "@/components/layout/loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { fetchApi, formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { HandCoins, Package } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type ShipmentInfo = {
  id: number;
  bookingId: string;
  typeId: number;
  typeName: string;
  title: string;
  content: string;
  amount: string;
  vaNumber: string;
  createdAt: string;
  updatedAt: string;
};

function UnderpaymentContent({ item }: { item: ShipmentInfo }) {
  const navigate = useNavigate();
  const setUnderPayment = useSetAtom(underPaymentAtom);

  const payUnderpaymentHandler = () => {
    setUnderPayment({
      bookingId: item.bookingId,
      underpaymentVa: item.vaNumber,
      amount: Number(item.amount),
    });

    // return;payUnderpaymentHandler
    navigate("/payment-method?pay=underpayment");
  };

  return (
    <div className="px-6">
      <p>Ups, sepertinya ada kekurangan pembayaran di pesanan kamu sebesar:</p>
      <div className="my-4">
        <p className="font-bold text-brand-500 text-lg">
          {formatCurrency(Number(item.amount))}
        </p>
      </div>
      <div className="mb-5">
        <p>
          Nomor Virtual Account:
          <br />
          <span className="font-semibold">{item.vaNumber} </span>
        </p>
      </div>
      <p>Biar paketmu bisa segera diproses, yuk selesaikan pembayarannya ya!</p>
      <Button
        className="my-6 w-full rounded-full bg-brand-500 py-6 text-white"
        onClick={payUnderpaymentHandler}
      >
        Pilih Metode Bayar
      </Button>
    </div>
  );
}

const IS_UNDERPAYMENT_TITLE =
  "Oops, sepertinya ada kekurangan pembayaran untuk paket kamu nih!";

export default function ShipmentInfo() {
  const { bookingId } = useParams();
  const { isLoading, data: infoData } = useQuery({
    queryKey: ["shipment-info", bookingId],
    queryFn: () =>
      fetchApi<{ items: ShipmentInfo[] }>(
        `transaction/info/list?bookingId=${bookingId}`,
        {
          method: "get",
        }
      ),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full flex-col gap-6 bg-background py-3 text-start">
      {!infoData?.data.items.length ? (
        <p className="text-center text-gray-300">Belum ada informasi kiriman</p>
      ) : (
        <Accordion type="multiple" className="space-y-2">
          {infoData?.data.items.map((item) => {
            return (
              <AccordionItem key={item.id} value={item.id.toString()}>
                <AccordionTrigger className="px-3 hover:no-underline">
                  <div className="flex w-full place-items-center gap-5 py-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center gap-3 rounded-full border border-brand-500 bg-brand-50 p-2 text-white">
                      {item.typeId === 1 ? (
                        <HandCoins
                          size={32}
                          className="shrink-0 text-brand-500"
                        />
                      ) : (
                        <Package
                          size={32}
                          className="shrink-0 text-brand-500"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-gray-400">{item.typeName}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {item.title.includes(IS_UNDERPAYMENT_TITLE) ? (
                    <UnderpaymentContent item={item} />
                  ) : (
                    <div className="text-pretty px-6 text-left leading-7">
                      {item.content}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
