import ErrorPage from "@/components/layout/error";
import Loader from "@/components/layout/loader";
import React, { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("@/modules/home/home"));
const Register = React.lazy(() => import("@/modules/auth/register"));
const CheckRate = React.lazy(() => import("@/modules/home/check-rate"));
const RateResult = React.lazy(() => import("@/modules/home/check-rate/result"));
const NewShipment = React.lazy(
  () => import("@/modules/home/new-shipment/index"),
);
const SelectMapsAddress = React.lazy(
  () => import("@/modules/home/new-shipment/select-maps/index"),
);
const AddressFavorite = React.lazy(
  () => import("@/modules/home/new-shipment/address-favorite/index"),
);
const SelectPickupAddress = React.lazy(
  () => import("@/modules/home/new-shipment/select-pickup-address/index"),
);
const CreateShipment = React.lazy(
  () => import("@/modules/home/shipment/index"),
);
const ShipmentDetail = React.lazy(
  () => import("@/modules/home/new-shipment/shipment-detail"),
);
const Payment = React.lazy(() => import("@/modules/home/payment"));
const PaymentSuccess = React.lazy(
  () => import("@/modules/home/payment/payment-success"),
);
const ShipmentHistory = React.lazy(
  () => import("@/modules/home/shipment/shipment-history"),
);
const ShipmentDetailItem = React.lazy(
  () => import("@/modules/home/shipment/shipment-detail-item"),
);
const Tracking = React.lazy(() => import("@/modules/home/tracking"));
const ShipmentAddress = React.lazy(
  () => import("@/modules/home/shipment/shipment-address"),
);
const ShipmentItem = React.lazy(
  () => import("@/modules/home/shipment/shipment-item"),
);
const ListAddress = React.lazy(
  () => import("@/modules/home/shipment/shipment-address/list-address"),
);
const PaymentMethod = React.lazy(
  () => import("@/modules/home/payment/payment-method"),
);
const PrivacyData = React.lazy(() => import("@/modules/auth/pdp"));
const TermsAndConditions = React.lazy(() => import("@/modules/auth/snk"));
const ShipmentInfo = React.lazy(
  () => import("@/modules/home/shipment/shipment-info"),
);
const EmptyFeeResult = React.lazy(
  () => import("@/modules/home/check-rate/components/empty-fee-result"),
);
const HowToPayPage = React.lazy(
  () => import("@/modules/home/payment/components/how-to-pay-page"),
);
const CustomerCare = React.lazy(() => import("@/modules/home/customer-care"));

export const routes: Array<RouteObject> = [
  {
    index: true,
    element: (
      <Suspense>
        <Home />
      </Suspense>
    ),
  },

  {
    path: "register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "terms-and-conditions",
    element: (
      <Suspense>
        <TermsAndConditions />
      </Suspense>
    ),
  },
  {
    path: "check-rate",
    element: (
      <Suspense fallback={<Loader />}>
        <CheckRate />
      </Suspense>
    ),
  },
  {
    path: "new-shipment",
    element: (
      <Suspense fallback={<Loader />}>
        <NewShipment />
      </Suspense>
    ),
  },
  {
    path: "shipment-detail",
    element: (
      <Suspense fallback={<Loader />}>
        <ShipmentDetail />
      </Suspense>
    ),
  },
  {
    path: "address-favorite",
    element: (
      <Suspense fallback={<Loader />}>
        <AddressFavorite />
      </Suspense>
    ),
  },
  {
    path: "select-maps",
    element: (
      <Suspense fallback={<Loader />}>
        <SelectMapsAddress />
      </Suspense>
    ),
  },
  {
    path: "select-pickup-address",
    element: (
      <Suspense fallback={<Loader />}>
        <SelectPickupAddress />
      </Suspense>
    ),
  },
  {
    path: "rate-result",
    element: (
      <Suspense fallback={<Loader />}>
        <RateResult />
      </Suspense>
    ),
  },
  {
    path: "empty-fee-result",
    element: (
      <Suspense fallback={<Loader />}>
        <EmptyFeeResult />
      </Suspense>
    ),
  },
  {
    path: "create-shipment",
    element: (
      <Suspense fallback={<Loader />}>
        <CreateShipment />
      </Suspense>
    ),
  },

  {
    path: "shipment-detail/:bookingId",
    element: (
      <Suspense fallback={<Loader />}>
        <ShipmentDetailItem />
      </Suspense>
    ),
  },
  {
    path: "shipment-address",
    element: (
      <Suspense fallback={<Loader />}>
        <ShipmentAddress />
      </Suspense>
    ),
  },
  {
    path: "shipment-item",
    element: (
      <Suspense fallback={<Loader />}>
        <ShipmentItem />
      </Suspense>
    ),
  },
  {
    path: "history",
    element: (
      <Suspense fallback={<Loader />}>
        <ShipmentHistory />
      </Suspense>
    ),
  },
  {
    path: "shipment-info/:bookingId",
    element: (
      <Suspense fallback={<Loader />}>
        <ShipmentInfo />
      </Suspense>
    ),
  },
  {
    path: "payment-method",
    element: (
      <Suspense fallback={<Loader />}>
        <PaymentMethod />
      </Suspense>
    ),
  },
  {
    path: "payment",
    element: (
      <Suspense fallback={<Loader />}>
        <Payment />
      </Suspense>
    ),
  },
  {
    path: "payment-success",
    element: (
      <Suspense fallback={<Loader />}>
        <PaymentSuccess />
      </Suspense>
    ),
  },
  {
    path: "tracking",
    element: (
      <Suspense fallback={<Loader />}>
        <Tracking />
      </Suspense>
    ),
  },
  {
    path: "list-address",
    element: (
      <Suspense fallback={<Loader />}>
        <ListAddress />
      </Suspense>
    ),
  },
  {
    path: "pdp",
    element: (
      <Suspense fallback={<Loader />}>
        <PrivacyData />
      </Suspense>
    ),
  },
  {
    path: "how-to-pay",
    element: (
      <Suspense fallback={<Loader />}>
        <HowToPayPage />
      </Suspense>
    ),
  },
  {
    path: "customer-care",
    element: (
      <Suspense fallback={<Loader />}>
        <CustomerCare />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
