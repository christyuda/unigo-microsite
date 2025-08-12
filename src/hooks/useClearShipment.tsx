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
import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useClearShipment = ({ navigateTo }: { navigateTo: string }) => {
  const navigate = useNavigate();
  const setOrderResult = useSetAtom(addOrderResultAtom);
  const setSelectedPaymentMethod = useSetAtom(selectedPaymentMethodAtom);
  const setCheckRate = useSetAtom(checkRatePayloadAtom);
  const setSelectedProduct = useSetAtom(orderDetailAtom);
  const setSplittedAddress = useSetAtom(splittedAddressAtom);
  const setUserAddress = useSetAtom(userAddressAtom);
  const setUnderPayment = useSetAtom(underPaymentAtom);

  return useCallback(() => {
    setCheckRate(RESET);
    setSelectedProduct(RESET);
    setSplittedAddress(RESET);
    setSelectedPaymentMethod(RESET);
    setUserAddress(RESET);
    setOrderResult(RESET);
    setUnderPayment(RESET);

    navigate(navigateTo);
  }, [
    navigateTo,
    navigate,
    setCheckRate,
    setSelectedProduct,
    setSplittedAddress,
    setUserAddress,
    setOrderResult,
    setSelectedPaymentMethod,
    setUnderPayment,
  ]);
};

export default useClearShipment;
