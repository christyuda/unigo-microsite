import { selectedPaymentMethodAtom } from "@/atom/payment-atom";
import { Card, CardContent } from "@/components/ui/card";
import { useAtomValue } from "jotai";

const HowToPayCard = () => {
  const selectedPaymentMethod = useAtomValue(selectedPaymentMethodAtom);

  return (
    <div className="mx-auto w-full max-w-md text-start">
      <p className="mb-4 text-start font-bold">Cara Pembayaran</p>
      <Card className="border-brand-500 bg-brand-50">
        <CardContent className="px-3 py-3 text-sm">
          <img
            src={selectedPaymentMethod.howToPay}
            alt="logo"
            className="h-full w-full object-contain"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HowToPayCard;
