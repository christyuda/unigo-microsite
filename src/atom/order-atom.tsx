import type { OrderResult } from "@/types/types";
import { atom } from "jotai";
import { dataUserAtomWithStorage } from "./home-atom";
import {
  splittedAddressAtom,
  checkRatePayloadAtom,
  userAddressAtom,
  orderDetailAtom,
} from "./global-atom";
import { atomWithStorage } from "jotai/utils";
import { storage } from "@/lib/utils";
import type { SyncStorage } from "jotai/vanilla/utils/atomWithStorage";

export const orderPayloadAtom = atom((get) => {
  const dataUser = get(dataUserAtomWithStorage);
  const address = get(userAddressAtom);
  const order = get(orderDetailAtom);
  const splitAddress = get(splittedAddressAtom);
  const rate = get(checkRatePayloadAtom);

  const payload = {
    merchantUserId: dataUser.id,
    itemTypeId: rate.itemTypeId,
    productId: order.serviceCode,
    productName: order.serviceName,
    itemData: {
      weight: rate.weight,
      length: rate.length,
      width: rate.width,
      height: rate.height,
      diameter: rate.diameter,
      value: rate.valueGoods,
      description: rate.description,
      IsInsurance: rate.isInsurance,
      arrivedEstimation: order.estimation,
    },
    feeData: {
      feeAmount: order.fee,
      insuranceAmount: order.insurance,
      discountAmount: 0,
      feeTaxAmount: order.feeTax,
      insuranceTaxAmount: order.insuranceTax,
      codValue: 0,
      totalAmount: order.totalFee,
    },
    pickupAddressData: {
      customerName: address.pickup.customerName,
      email: address.pickup.email,
      phone: address.pickup.phone,
      address: address.pickup.address,
      villageId: null,
      villageName: `Kel. ${splitAddress.pickup.village}`,
      districtId: null,
      districtName: `Kec. ${splitAddress.pickup.district}`,
      cityId: null,
      cityName: splitAddress.pickup.city,
      provinceId: null,
      provinceName: null,
      zipCode: splitAddress.pickup.zipCode,
      longitude: "",
      latitude: "",
    },
    senderAddressData: {
      customerName: address.sender.customerName,
      email: address.sender.email,
      phone: address.sender.phone,
      address: address.sender.address,
      villageId: null,
      villageName: `Kel. ${splitAddress.sender.village}`,
      districtId: null,
      districtName: `Kec. ${splitAddress.sender.district}`,
      cityId: null,
      cityName: splitAddress.sender.city,
      provinceId: null,
      provinceName: null,
      zipCode: splitAddress.sender.zipCode,
      longitude: "",
      latitude: "",
    },
    receiverAddressData: {
      customerName: address.destination.customerName,
      email: address.destination.email,
      phone: address.destination.phone,
      address: address.destination.address,
      villageId: null,
      villageName: `Kel. ${splitAddress.destination.village}`,
      districtId: null,
      districtName: `Kec. ${splitAddress.destination.district}`,
      cityId: null,
      cityName: splitAddress.destination.city,
      provinceId: null,
      provinceName: null,
      zipCode: splitAddress.destination.zipCode,
      longitude: "",
      latitude: "",
    },
    schedulePickupData: {
      isPickup: 1,
      schedulePickupId: null,
      schedulePickup: null,
      availablePickupRequest: null,
    },
  };
  return payload;
});

export const addOrderResultAtom = atomWithStorage<OrderResult>(
  "order-data",
  {
    bookingId: "",
    bookingDate: "",
    bookingStatus: "",
  },
  storage as SyncStorage<OrderResult>
);
