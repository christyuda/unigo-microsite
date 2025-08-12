import { PAYMENT_DATA } from "@/atom/payment-atom";
import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useTitle from "@/hooks/useTitle";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const HowToPayPage = () => {
  useTitle("Cara Pembayaran");
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <NavHeader title="Pilihan Cara Pembayaran" />
      <div className="mt-3 text-sm">
        <p>
          Berikut adalah pilihan metode pembayaran melalui VA yang tersedia:
        </p>
        <h3 className="mt-4 font-bold text-lg">Pilihan Bank Tersedia:</h3>
      </div>

      <Accordion
        type="single"
        collapsible
        className={cn("w-full space-y-4", "mt-3")}
      >
        {PAYMENT_DATA.map((bank) => (
          <AccordionItem
            key={bank.id}
            value={`item-${bank.id}`}
            className="overflow-hidden rounded-lg border border-brand-400"
          >
            <AccordionTrigger className="h-24 px-4 py-3 hover:no-underline [&>svg]:text-brand-500 [&[data-state=open]>div>svg]:rotate-180">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-5">
                  <img
                    src={bank.logo}
                    alt={`${bank.label} logo`}
                    width={40}
                    height={40}
                  />
                  <span className="font-bold text-base">{bank.label}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <img
                src={bank.howToPay}
                alt={`${bank.label} logo`}
                className="object-contain"
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="sticky bottom-0 mt-auto mb-3 flex h-24 w-full rounded-lg bg-white/60 px-3">
        <Button
          onClick={() => navigate(-1)}
          className="my-auto w-full rounded-full bg-brand-500 py-6 text-white"
        >
          Kembali
        </Button>
      </div>
    </HomeLayout>
  );
};

export default HowToPayPage;
