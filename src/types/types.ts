export type ApiResponse<T = any> = {
  code: string;
  data: T;
  message: string;
  status: boolean;
};

export type ResponseCheckUser = {
  phoneNumber?: string | undefined;
  id: string;
  name: string;
  email?: string | undefined;
  created_at: string;
  updated_at: string;
};

export type CreateAddressPayload = {
  merchant_user_id: string;
  customer_name: string;
  email: string;
  phone: string;
  address_type_id: string;
  address_type_name: string;
  address: string;
  village_id: string;
  village_name: string;
  district_id: string;
  district_name: string;
  city_id: string;
  city_name: string;
  province_id: string;
  province_name: string;
  country_id: string;
  country_name: string;
  zip_code: string;
  longitude: string;
  latitude: string;
};

export type CheckRatePayload = {
  itemTypeId: number | string;
  shipperZipCode: string;
  receiverZipCode: string;
  weight: string | number | undefined;
  length: string | number | undefined;
  width: string | number | undefined;
  height: string | number | undefined;
  diameter: string | number | undefined;
  valueGoods: string | number | undefined;
  isInsurance: boolean | string;
  description?: string;
};

export type ServiceDetails = {
  serviceCode: string;
  serviceName: string;
  fee: number;
  feeTax: number;
  insurance: number;
  insuranceTax: number;
  totalFee: number;
  notes: string;
  estimation: string;
  penyesuaian: number;
  penyesuaianpersentase: number;
  discount: number;
};

export type AddressInfo = {
  merchantUserId: string;
  customerName: string;
  email: string | null;
  phone: string;
  addressTypeId: "00" | "01" | "02" | "03"; // Use literal types for specific values
  addressTypeName: "Pickup Location" | "Sender Location" | "Receiver Location"; // Use literal types
  address: string;
  villageId: string | null;
  villageName: string;
  districtId: string | null;
  districtName: string;
  cityId: string | null;
  cityName: string;
  provinceId: string | null;
  provinceName: string | null;
  countryId: string | null;
  countryName: string;
  zipCode: string | number;
  longitude: string;
  latitude: string;
};

export type OrderPayload = {
  merchantUserId: string;
  itemTypeId: string;
  productId: string;
  itemData: ItemData;
  feeData: FeeData;
  pickupAddressData: AddressData;
  senderAddressData: AddressData;
  receiverAddressData: AddressData;
  schedulePickupData: SchedulePickupData;
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

export type ItemData = {
  weight: number;
  length: number;
  width: number;
  height: number;
  diameter: number;
  value: number;
  description: string;
  IsInsurance: number;
};

export type AddressData = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  villageId: string;
  villageName: string;
  districtId: string;
  districtName: string;
  cityId: string;
  cityName: string;
  provinceId: string;
  provinceName: string;
  zipCode: string;
  longitude: string;
  latitude: string;
};

export type SchedulePickupData = {
  isPickup: number;
  schedulePickupId: string;
  schedulePickup: string;
  availablePickupRequest: string;
};

export type AddressDetails = AddressInfo & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type OrderResult = {
  bookingId: string;
  bookingDate: string;
  bookingStatus: string;
};

export type CheckVaResult = {
  bookingId: string;
  vaNumber: string;
};

export type PaymentMethod = {
  id: string;
  label: string;
  logo: string;
  prefix?: string | undefined;
  howToPay?: string | undefined;
};

export type ShipmentDetailItem = {
  id: string;
  bookingDate: string;
  vaNumber: string;
  vaType: string;
  sender: {
    customerName: string;
    city: string;
    address: string;
    phone: string;
  };
  destination: {
    customerName: string;
    city: string;
    address: string;
    phone: string;
    arrivedEstimation: string | null;
  };
  pickupDetail?: {
    pickupSchedule: string;
    pickuperName: string;
    pickuperPhone: string;
  };
  item: {
    weight: string;
    length: string;
    width: string;
    height: string;
    diameter: string;
    value: string;
    description: string;
    isInsurance: number;
  };
  fee: {
    totalAmount: string;
  };
  statusId: string;
  statusName: string;
};

export type TrackingResponse = {
  bookingId: string;
  connoteId: string;
  connoteCode: string;
  transactionId: string;
  connoteNumber: number;
  connoteOrder: number;
  paymentTypeName: string;
  connoteStatusId: number;
  connoteStatusName: string;
  location: Location;
  tarif: Tarif;
  zone: Zone;
  sender: Receiver;
  receiver: Receiver;
  item: Item;
  price: Price;
  zoneDestinationDatas: ZoneDestinationData[];
  connoteSenderCustomFieldDatas: any[];
  connoteCustomFieldData: any;
  currentLocationData: any;
  connoteHistoryDatas: ConnoteHistoryData[];
  koliDatas: any[];
  locationCreatedData: any;
  extraData: ExtraData;
};

export type ConnoteHistoryData = {
  sequence: number;
  id: string;
  code: string;
  connoteId: string;
  state: string;
  action: string;
  content: string;
  date: Date;
  coordinate: string;
  organizationId: string;
  uniqueId: string;
  photo: string;
  signature: string;
  refId: string;
  username: string;
  locationName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ExtraData = {
  pod: Pod;
  isLocked: number;
  createFrom: string;
  codValue: string;
  uniqueId: string;
  bags: string;
  receivingPhoto: string;
  receivingSign: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Pod = {
  timeReceive: string;
  coordinate: string;
  receiver: string;
  signature: string;
  photo: string;
};

export type Item = {
  productId: string;
  actualWeight: number;
  volume_Weight: number;
  chargeableWeight: number;
  connoteTotalPackage: string;
};

export type Location = {
  locationId: string;
  location_name: string;
  location_type: string;
  organizationId: number;
};

export type Price = {
  connoteServicePrice: number;
  connoteAmount: number;
  surchargeAmount: number;
  connoteSurchargeAmount: number;
  totalDiscount: number;
};

export type Receiver = {
  name: string;
  phone: string;
  email: string;
  address: string;
  addressDetail: string;
  zipcode: string;
};

export type Tarif = {
  sourceTarif: string;
  idSourceTarif: string;
  formulaData: FormulaData;
  formulaName: string;
};

export type FormulaData = {
  baseTarif: number;
  baseTarif2: number;
  baseTarif3: number;
  pembulatanBerat: number;
  tarif: number;
};

export type Zone = {
  sourceZipCode: string;
  destinationZipCode: string;
  connoteSlaDay: string;
  connoteSlaDate: string;
};

export type ZoneDestinationData = {
  sequence: number;
  name: string;
  code: string;
  typeCode: string;
  cache: boolean;
};

export type AddressListResponse = {
  status: boolean;
  code: string;
  message: string;
  data: {
    items: AddressDetailsFavorite[];
    pagination: Record<string, any>;
  };
};
export interface AddressHistory {
  id: string;
  merchantUserId: string;
  customerName: string;
  email: string;
  phone: string;
  addressTypeId: string;
  addressTypeName: string;
  address: string;
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
  zipCode: string;
  longitude: string;
  latitude: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  
}
export type CourierService = {
  serviceCode: string | number;
  serviceName: string;
  estimation: string;
  totalFee: number;
  fee: number;
  feeTax: number;
  insurance: number;
  insuranceTax: number;
  notes: string;
  discount: number;
  
};

export type AddressDetailsFavorite = {
  id: string;
  merchantUserId: string;
  customerName: string;
  email: string;
  phone: string;
  addressTypeId: string;
  addressTypeName: string;
  address: string;
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
  zipCode: string;
  longitude: string;
  latitude: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};


export type ParsedAddress = {
  main: string;
  kel: string;
  kec: string;
};