// hooks/useResetShipment.ts
import { useCallback, useState } from "react";
import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";

import {
  checkRatePayloadAtom,
  orderDetailAtom,
  splittedAddressAtom,
  userAddressAtom,
} from "@/atom/global-atom";

import { addOrderResultAtom } from "@/atom/order-atom";
import {
  selectedPaymentMethodAtom,
  underPaymentAtom,
} from "@/atom/payment-atom";

import {
  senderAddressDataAtom,
  receiverAddressDataAtom,
  pickupAddressDataAtom,
  itemDataAtom,
  feeDataAtom,
  itemTypeIdAtom,
  productIdAtom,
  productNameAtom,
  schedulePickupDataAtom,
  senderFormAtom,
  receiverFormAtom,
} from "@/atom/shipments-atom";

export default function useResetShipment() {
  const [cleared, setCleared] = useState(false);

  // global
  const setCheckRate = useSetAtom(checkRatePayloadAtom);
  const setSelectedProduct = useSetAtom(orderDetailAtom);
  const setSplittedAddress = useSetAtom(splittedAddressAtom);
  const setUserAddress = useSetAtom(userAddressAtom);

  // order & payment
  const setOrderResult = useSetAtom(addOrderResultAtom);
  const setSelectedPaymentMethod = useSetAtom(selectedPaymentMethodAtom);
  const setUnderPayment = useSetAtom(underPaymentAtom);

  // shipment
  const setSenderAddress = useSetAtom(senderAddressDataAtom);
  const setReceiverAddress = useSetAtom(receiverAddressDataAtom);
  const setPickupAddress = useSetAtom(pickupAddressDataAtom);

  const setItemData = useSetAtom(itemDataAtom);
  const setFeeData = useSetAtom(feeDataAtom);
  const setItemTypeId = useSetAtom(itemTypeIdAtom);
  const setProductId = useSetAtom(productIdAtom);
  const setProductName = useSetAtom(productNameAtom);
  const setSchedulePickup = useSetAtom(schedulePickupDataAtom);

  const setSenderForm = useSetAtom(senderFormAtom);
  const setReceiverForm = useSetAtom(receiverFormAtom);

  const resetAll = useCallback(() => {
    // global
    setCheckRate(RESET);
    setSelectedProduct(RESET);
    setSplittedAddress(RESET);
    setUserAddress(RESET);

    // order & payment
    setOrderResult(RESET);
    setSelectedPaymentMethod(RESET);
    setUnderPayment(RESET);

    // shipment
    setSenderAddress(RESET);
    setReceiverAddress(RESET);
    setPickupAddress(RESET);
    setItemData(RESET);
    setFeeData(RESET);
    setItemTypeId(RESET);
    setProductId(RESET);
    setProductName(RESET);
    setSchedulePickup(RESET);
    setSenderForm(RESET);
    setReceiverForm(RESET);

    setCleared(true);
  }, [
    setCheckRate, setSelectedProduct, setSplittedAddress, setUserAddress,
    setOrderResult, setSelectedPaymentMethod, setUnderPayment,
    setSenderAddress, setReceiverAddress, setPickupAddress,
    setItemData, setFeeData, setItemTypeId,
    setProductId, setProductName, setSchedulePickup,
    setSenderForm, setReceiverForm,
  ]);

  return { resetAll, cleared };
}
