// map-address-helpers.ts

import type { AddressData } from "@/atom/shipments-atom";

export function mapPlaceToAddressData(p: {
  label: string;      // full formatted address
  name?: string;      // place name
  lat: number;
  lng: number;
  zip?: number;
  city?: string;
  district?: string;
  village?: string;
}): AddressData {
  return {
    customerName: "",
    email: null,
    phone: "",
    address: p.label,
    villageId: null,
    villageName: p.village ?? "",
    districtId: null,
    districtName: p.district ?? "",
    cityId: null,
    cityName: p.city ?? "",
    provinceId: null,
    provinceName: null,
    zipCode: p.zip ?? 0,
    longitude: String(p.lng),
    latitude: String(p.lat),
  };
}

// (Optional) append to history
export function pushAddressHistory(entry: AddressData, max = 10) {
  const key = "addressHistory";
  const raw = localStorage.getItem(key);
  const arr: AddressData[] = raw ? JSON.parse(raw) : [];
  const next = [entry, ...arr].slice(0, max);
  localStorage.setItem(key, JSON.stringify(next));
}
