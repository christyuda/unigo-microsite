import {
  paymentMethodAtom,
  selectedPaymentMethodAtom,
} from "@/atom/payment-atom";
import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useTitle from "@/hooks/useTitle";
import { cn } from "@/lib/utils";
import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentMethod() {
  useTitle("Pilih Metode Pembayaran");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isUnderpayment = searchParams.get("pay") === "underpayment";
  const paymentMethods = useAtomValue(paymentMethodAtom);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useAtom(
    selectedPaymentMethodAtom
  );

  const paymentMethodHandler = useCallback(
    (value: string) => {
      const result = paymentMethods.find((item) => item.id === value);

      if (result) {
        setSelectedPaymentMethod(result);
      }
    },
    [paymentMethods, setSelectedPaymentMethod]
  );

  const submitPaymentHandler = () => {
    if (isUnderpayment) {
      navigate(`/payment?pay=${searchParams.get("pay")}`);
    } else {
      navigate("/payment");
    }
  };

  return (
    <HomeLayout>
      <NavHeader title="Metode Pembayaran" />
      <div className="mt-3 px-3 text-start text-sm">
        <p>Berikut adalah pilihan metode pembayaran yang tersedia:</p>
        <h3 className="my-3 font-bold text-lg">Vitual Account (VA)</h3>
      </div>
      <div className="flex h-full w-full flex-col gap-6 pb-3">
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
                    selectedPaymentMethod.id === item.id,
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
                  checked={selectedPaymentMethod.id === item.id}
                />
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
        <div className="sticky bottom-0 left-0 mx-auto mt-auto w-full max-w-md bg-white p-3">
          <Button
            className="w-full rounded-full bg-brand-500 py-6 text-white"
            disabled={!selectedPaymentMethod.id}
            onClick={submitPaymentHandler}
          >
            Pilih
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
}
