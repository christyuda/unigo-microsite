// atoms/order-shipment-atom.ts
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

/* ---------- Types ---------- */
export type AddressData = {
  customerName: string;
  email: string | null;
  phone: string;
  address: string;
  villageId: string | null;
  villageName: string;
  districtId: string | null;
  districtName: string;
  cityId: string | null;
  cityName: string;
  provinceId: string | null;
  provinceName: string | null;
  zipCode: number;
  longitude: string;
  latitude: string;
  noteLabel?: string; // optional if you want to keep it here
  courierNote?: string; // optional if you want to keep it here
};

export type ItemData = {
  weight: number;
  length: number;
  width: number;
  height: number;
  diameter: number;
  value: number;
  description: string;
  IsInsurance: "0" | "1";
  arrivedEstimation: string;
};

export type FeeData = {
  feeAmount: number;
  insuranceAmount: number;
  discountAmount: number;
  feeTaxAmount: number;
  insuranceTaxAmount: number;
  codValue: number;
  totalAmount: number;
};

export type SchedulePickupData = {
  isPickup: 0 | 1;
  schedulePickupId: string | null;
  schedulePickup: string | null; // ISO string or display string
  availablePickupRequest: string | null; // up to you
};

export type OrderShipmentPayload = {
  merchantUserId: string;
  itemTypeId: number;
  productId: string;
  productName: string;
  itemData: ItemData;
  feeData: FeeData;
  pickupAddressData: AddressData;
  senderAddressData: AddressData;
  receiverAddressData: AddressData;
  schedulePickupData: SchedulePickupData;
};

/* ---------- Defaults ---------- */
export const emptyAddress = (): AddressData => ({
  customerName: "",
  email: null,
  phone: "",
  address: "",
  villageId: null,
  villageName: "",
  districtId: null,
  districtName: "",
  cityId: null,
  cityName: "",
  provinceId: null,
  provinceName: null,
  zipCode: 0,
  longitude: "",
  latitude: "",
});

export const defaultItemData = (): ItemData => ({
  weight: 0,
  length: 0,
  width: 0,
  height: 0,
  diameter: 0,
  value: 0,
  description: "",
  IsInsurance: "0",
  arrivedEstimation: "",
});

export const defaultFeeData = (): FeeData => ({
  feeAmount: 0,
  insuranceAmount: 0,
  discountAmount: 0,
  feeTaxAmount: 0,
  insuranceTaxAmount: 0,
  codValue: 0,
  totalAmount: 0,
});

export const defaultSchedulePickup = (): SchedulePickupData => ({
  isPickup: 0,
  schedulePickupId: null,
  schedulePickup: null,
  availablePickupRequest: null,
});

// atoms/order-shipment-atom.ts (continued)

/* ---------- Step atoms (persisted) ---------- */
export const pickupAddressDataAtom = atomWithStorage<AddressData>(
  "pickupAddressData",
  emptyAddress(),
);

export const senderAddressDataAtom = atomWithStorage<AddressData>(
  "senderAddressData",
  emptyAddress(),
);

export const receiverAddressDataAtom = atomWithStorage<AddressData>(
  "receiverAddressData",
  emptyAddress(),
);

// Forms (names, notes, favorite toggle). Keep them separate from AddressData if you prefer.
export type PersonForm = {
  name: string;
  phoneNumber: string;
  noteLabel: string;
  courierNote: string;
  isFavorite: boolean;
};

export const senderFormAtom = atomWithStorage<PersonForm>("senderForm", {
  name: "",
  phoneNumber: "",
  noteLabel: "",
  courierNote: "",
  isFavorite: false,
});

export const receiverFormAtom = atomWithStorage<PersonForm>("receiverForm", {
  name: "",
  phoneNumber: "",
  noteLabel: "",
  courierNote: "",
  isFavorite: false,
});

// Shipment basics
export const merchantUserIdAtom = atomWithStorage<string>(
  "merchantUserId",
  "", // fill after login/session
);

export const itemTypeIdAtom = atomWithStorage<number>("itemTypeId", 0);
export const productIdAtom = atomWithStorage<string>("productId", "");
export const productNameAtom = atomWithStorage<string>("productName", "");

export const itemDataAtom = atomWithStorage<ItemData>(
  "itemData",
  defaultItemData(),
);

export const feeDataAtom = atomWithStorage<FeeData>(
  "feeData",
  defaultFeeData(),
);

export const schedulePickupDataAtom = atomWithStorage<SchedulePickupData>(
  "schedulePickupData",
  defaultSchedulePickup(),
);

/* ---------- Derived payload (read-only) ---------- */
export const orderPayloadAtom = atom<OrderShipmentPayload>((get) => ({
  merchantUserId: get(merchantUserIdAtom),
  itemTypeId: get(itemTypeIdAtom),
  productId: get(productIdAtom),
  productName: get(productNameAtom),
  itemData: get(itemDataAtom),
  feeData: get(feeDataAtom),
  pickupAddressData: get(pickupAddressDataAtom),
  senderAddressData: get(senderAddressDataAtom),
  receiverAddressData: get(receiverAddressDataAtom),
  schedulePickupData: get(schedulePickupDataAtom),
}));

/* ---------- Address history ---------- */
export type AddressHistory = {
  id: string; // unique ID
  addressTypeName: string; // e.g., "Alamat Pengirim" / "Alamat Penerima"
  customerName: string;
  phone: string;
  address: string;
  zipCode?: string;
  lat: number;
  lng: number;
};

export const addressHistoryAtom = atomWithStorage<AddressHistory[]>(
  "addressHistory",
  [],
);
export const searchQueryAtom = atom<string>("");

export type SelectedCourierService = {
  serviceCode: string;
  serviceName: string;
  estimation: string;
  totalFee: number;
  discount: number;
};

export const selectedCourierServiceAtom = atom<SelectedCourierService | null>(
  null,
);

export const senderPostalCodeAtom = atom<string>("");
export const receiverPostalCodeAtom = atom<string>("");
// atom/new-shipment-atom.ts
export const StepEnum = {
  SENDER: "sender",
  RECEIVER: "receiver",
  SHIPMENT: "shipment",
} as const;

export type StepType = (typeof StepEnum)[keyof typeof StepEnum];

export const currentStepAtom = atomWithStorage<
  "sender" | "receiver" | "shipment"
>("shipment-current-step", "sender");
export type AddressApiItem = {
  id: string;
  merchantUserId: string;
  customerName: string;
  email: string; // API kirim string kosong -> biarkan string
  phone: string;
  addressTypeId: "01" | "02" | "03";
  addressTypeName: string; // "Sender Location" | "Receiver Location" | ...
  address: string; // "main \n label \n courierNote"
  villageId: string;
  villageName: string;
  districtId: string;
  districtName: string;
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  countryId: string;
  countryName: string;
  zipCode: string; // API string
  longitude: string;
  latitude: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AddressListResponse = {
  items: AddressApiItem[];
  pagination: Record<string, unknown>;
};

export type ApiResponse<T> = {
  status: boolean;
  code: string;
  message: string;
  data: T;
};
