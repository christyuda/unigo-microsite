import { atom } from "jotai";
import PosLogo from "@/assets/posindnew.png";
import BniLogo from "@/assets/payment-icon/bni.png";
import BcaLogo from "@/assets/payment-icon/bca.png";
import MandiriLogo from "@/assets/payment-icon/mandiri.png";
import BriLogo from "@/assets/payment-icon/bri.png";
// import BsiLogo from "@/assets/payment-icon/bsi.png";
import PosHow from "@/assets/how-to-pay/posind.png";
import BniHow from "@/assets/how-to-pay/bni.png";
import BcaHow from "@/assets/how-to-pay/bca.png";
import MandiriHow from "@/assets/how-to-pay/mandiri.png";
import BriHow from "@/assets/how-to-pay/bri.png";
// import BsiHow from "@/assets/how-to-pay/bsi.png";
import { atomWithStorage } from "jotai/utils";
import { storage } from "@/lib/utils";
import type { SyncStorage } from "jotai/vanilla/utils/atomWithStorage";
import type { PaymentMethod } from "@/types/types";

type UnderPaymentType = {
  bookingId: string;
  underpaymentVa: string;
  amount: number;
};

export const PAYMENT_DATA = [
  {
    id: "pos",
    label: "Pos Indonesia",
    logo: PosLogo,
    prefix: undefined,
    howToPay: PosHow,
  },
  {
    id: "bni",
    label: "Bank Negara Indonesia",
    logo: BniLogo,
    prefix: "85108",
    howToPay: BniHow,
  },
  {
    id: "bca",
    label: "Bank Central Asia",
    logo: BcaLogo,
    prefix: "81618",
    howToPay: BcaHow,
  },
  {
    id: "mandiri",
    label: "Bank Mandiri",
    logo: MandiriLogo,
    prefix: "88588",
    howToPay: MandiriHow,
  },
  {
    id: "bri",
    label: "Bank Rakyat Indonesia",
    logo: BriLogo,
    prefix: "10954",
    howToPay: BriHow,
  },
  // {
  //   id: "bsi",
  //   label: "Bank Syariah Indonesia",
  //   logo: BsiLogo,
  //   prefix: undefined,
  //   howToPay: BsiHow,
  // },
];

export const paymentMethodAtom = atom<PaymentMethod[]>(PAYMENT_DATA);

export const selectedPaymentMethodAtom = atomWithStorage<PaymentMethod>(
  "active-payment",
  {
    id: "",
    label: "",
    logo: "",
    prefix: "",
  },
  storage as SyncStorage<PaymentMethod>
);

export const underPaymentAtom = atomWithStorage<UnderPaymentType>(
  "underpayment-order",
  {
    bookingId: "",
    underpaymentVa: "",
    amount: 0,
  },
  storage as SyncStorage<UnderPaymentType>
);
