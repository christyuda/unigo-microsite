import type {
  AddressInfo,
  CheckRatePayload,
  ServiceDetails,
} from "@/types/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { storage } from "@/lib/utils";
import type { SyncStorage } from "jotai/vanilla/utils/atomWithStorage";

type ParsedAddress = {
  zipCode: number;
  district: string;
  village: string;
  city: string;
  origin: string;
};

type SplittedAddress = {
  pickup: Partial<ParsedAddress>;
  destination: Partial<ParsedAddress>;
  sender: Partial<ParsedAddress>;
};

type UserAddress = {
  pickup: Partial<AddressInfo>;
  sender: Partial<AddressInfo>;
  destination: Partial<AddressInfo>;
};

type ShowAdressDrawerAtom = {
  status: boolean;
  flag: "empty" | "pickup" | "destination" | "sender";
};

export const SUCCESS_COLOR_STATUS_ID = ["07"];
export const FAILED_COLOR_STATUS_ID = ["97", "98", "99"];
export const PAID_COLOR_STATUS_ID = ["02"];
export const PROCESSING_COLOR_STATUS_ID = ["03", "04", "05", "06"];

export const initialPhoneNumberAtom = atomWithStorage<string>(
  "phone-number",
  "",
  storage as SyncStorage<string>
);

export const showAdressDrawerAtom = atom<ShowAdressDrawerAtom>({
  status: false,
  flag: "empty",
});

export const errorOrderAtom = atom<{
  noItemDesc: boolean;
  noPickupName: boolean;
  noSenderName: boolean;
  noReceiverName: boolean;
}>({
  noItemDesc: false,
  noPickupName: false,
  noSenderName: false,
  noReceiverName: false,
});

export const splittedAddressAtom = atomWithStorage<SplittedAddress>(
  "splitted-address",
  {
    pickup: {},
    sender: {},
    destination: {},
  },
  storage as SyncStorage<SplittedAddress>
);

export const userAddressAtom = atomWithStorage<UserAddress>(
  "user-address",
  {
    pickup: {},
    sender: {},
    destination: {},
  },
  storage as SyncStorage<UserAddress>
);

export const DUMMY_SERVICE = [
  {
    serviceCode: 240,
    serviceName: "Pos Reguler",
    fee: 6092.98,
    feeTax: 67.02,
    insurance: 450.45,
    insuranceTax: 49.55,
    totalFee: 6660,
    notes: "-",
    estimation: "3 HARI",
    penyesuaian: 0,
    penyesuaianpersentase: 0,
    discount: 840,
  },
  {
    serviceCode: "2Q9",
    serviceName: "Pos Sameday",
    fee: 13926.81,
    feeTax: 153.19,
    insurance: 0.0,
    insuranceTax: 0.0,
    totalFee: 14080.0,
    notes: "-",
    estimation: "0 HARI",
    penyesuaian: 0,
    penyesuaianpersentase: 0,
    discount: 1920,
  },
  {
    serviceCode: 447,
    serviceName: "Pos Nextday",
    fee: 8704.25,
    feeTax: 95.75,
    insurance: 0.0,
    insuranceTax: 0.0,
    totalFee: 8800.0,
    notes: "-",
    estimation: "1 HARI",
    penyesuaian: 0,
    penyesuaianpersentase: 0,
    discount: 1200,
  },
];

export const checkRatePayloadAtom = atomWithStorage<CheckRatePayload>(
  "check-rate-payload",
  {
    itemTypeId: "1",
    shipperZipCode: "",
    receiverZipCode: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    diameter: "0",
    valueGoods: "",
    isInsurance: false,
    description: "",
  },
  storage as SyncStorage<CheckRatePayload>
);

export const serviceDetailsAtom = atomWithStorage<ServiceDetails[]>(
  "service-item",
  [
    {
      serviceCode: "",
      serviceName: "",
      fee: 0,
      feeTax: 0,
      insurance: 0,
      insuranceTax: 0,
      totalFee: 0,
      notes: "-",
      estimation: "",
      penyesuaian: 0,
      penyesuaianpersentase: 0,
      discount: 0,
    },
  ],
  storage as SyncStorage<ServiceDetails[]>
);

export const orderDetailAtom = atomWithStorage<Partial<ServiceDetails>>(
  "selected-product",
  {},
  storage as SyncStorage<Partial<ServiceDetails>>
);
