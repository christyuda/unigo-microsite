import {
  checkRatePayloadAtom,
  orderDetailAtom,
  serviceDetailsAtom,
} from "@/atom/global-atom";
import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useTitle from "@/hooks/useTitle";
import { cn, formatCurrency, uppercaseToCapitalized } from "@/lib/utils";
import { useAtom, useAtomValue } from "jotai";
import { RESET } from "jotai/utils";
import { useNavigate } from "react-router-dom";

export default function RateResult() {
  useTitle("Pilih jenis layanan");
  const navigate = useNavigate();
  const serviceDetails = useAtomValue(serviceDetailsAtom);
  const [product, setSelectedProduct] = useAtom(orderDetailAtom);
  const [checkRatePayload, setCheckRatePayload] = useAtom(checkRatePayloadAtom);

  const setProductHandler = (value: string) => {
    const selectedProduct = serviceDetails.find(
      (item) => item.serviceCode === value,
    );

    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
    }
  };

  const freshCheckRateHandler = () => {
    setCheckRatePayload(RESET);
    navigate("/check-rate");
  };

  return (
    <HomeLayout>
      <NavHeader title="Pilih jenis layanan" />
      <div className="flex min-h-screen w-full flex-col gap-3">
        <div className="mt-2 w-full">
          <RadioGroup
            value={product.serviceCode}
            onValueChange={setProductHandler}
            className="grid grid-cols-1 gap-2"
          >
            {serviceDetails.map((opt) => (
              <div
                key={opt.serviceCode}
                className="grid w-full gap-x-5 px-1 transition-colors duration-200 ease-in-out "
              >
                <RadioGroupItem
                  value={opt.serviceCode}
                  id={opt.serviceCode}
                  className="sr-only"
                />
                <Label
                  htmlFor={opt.serviceCode}
                  className="block w-full cursor-pointer"
                >
                  <Card
                    className={cn("relative w-full max-w-md place-items-end", {
                      "border-brand-500 bg-brand-50":
                        product.serviceCode === opt.serviceCode,
                      "hover:bg-gray-100":
                        product.serviceCode !== opt.serviceCode,
                    })}
                  >
                    <CardContent className="mb-4 flex w-full items-end justify-between p-3">
                      <div
                        className={cn(
                          "flex w-2/4 flex-col justify-center gap-3 text-start text-gray-400 text-sm",
                          {
                            "w-3/4": opt.discount !== 0,
                          },
                        )}
                      >
                        <p className="mt-2 font-semibold text-[15px] text-black capitalize">
                          {uppercaseToCapitalized(opt.serviceName)}
                        </p>
                        <p>Tarif</p>
                        <p>Estimasi</p>
                      </div>
                      <div className="flex w-2/4 flex-col justify-center gap-3 text-start text-sm">
                        <div className="flex w-full items-center justify-between gap-2 pt-3">
                          <p className="font-bold text-brand-500 text-lg">
                            {formatCurrency(opt.totalFee)}
                          </p>
                          {opt.discount !== 0 && (
                            <p className="text-gray-500 line-through">
                              {formatCurrency(
                                opt.fee + opt.feeTax + opt.discount,
                              )}
                            </p>
                          )}
                        </div>
                        <p className="mt-1 text-xs">
                          {opt.estimation.toLowerCase().includes("0 hari")
                            ? "Hari ini"
                            : uppercaseToCapitalized(opt.estimation)}
                        </p>
                      </div>
                    </CardContent>
                    {(checkRatePayload.isInsurance === "1" ||
                      opt.insurance !== 0) && (
                      <div className="absolute right-1 bottom-0 flex-none gap-3 p-2 text-start">
                        <p className="truncate text-[8px] text-gray-400">
                          *Tarif dasar + asuransi
                        </p>
                      </div>
                    )}
                  </Card>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="mt-auto space-y-2 pb-3">
          {/* <Button
            onClick={() => navigate("/create-shipment")}
            className="w-full rounded-full bg-brand-500 py-6 text-white"
            disabled={!product.serviceCode}
          >
            Lanjut Buat Kiriman
          </Button> */}
          <Button
            className="w-full rounded-full border-brand-500 py-6 text-brand-500"
            type="button"
            variant={"outline"}
            onClick={freshCheckRateHandler}
          >
            Cek Tarif Baru
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
}
