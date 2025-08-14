  import {  currentStepAtom } from "@/atom/shipments-atom";
  import type { AddressApiItem, AddressData,  } from "@/atom/shipments-atom";
  import type { ApiResponse } from "@/types/types";
  import { type ClassValue, clsx } from "clsx";
  import type { Setter } from "jotai";
  import { createJSONStorage } from "jotai/utils";
  import ky, { type Input, type Options } from "ky";
  import { twMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  // A basic API helper function using ky
  export async function fetchApi<T = any>(
    endpoint: Input,
    options: Options = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await ky(endpoint, {
        // prefixUrl: import.meta.env.VITE_API_URL, // Base URL for the API
        prefixUrl: import.meta.env.VITE_MU,
        timeout: 60000, // Set a timeout for the   request
        retry: {
          limit: 3,
          methods: ["get"],
          statusCodes: [413],
          backoffLimit: 3000,
        },
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        ...options, // Spread any additional options passed to the helper
      });

      // Parse and return the JSON response
      return await response.json();
    } catch (error) {
      // Handle errors (network errors, HTTP errors, etc.)
      console.error("API fetch error:", error);
      throw error; // You can also rethrow the error or handle it differently
    }
  }

  export function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout | null;
    return (...args: any[]) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  }

  /**
   * Transforms a string from uppercase to capitalized case.
   *
   * @param {string} text - The text to transform.
   * @returns {string} - The transformed text with each word capitalized.
   */
  export function uppercaseToCapitalized(text: string): string | null {
    if (!text) return null;

    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  export function extractAddressData(value: string) {
    if (!value) return null;

    const [zipCode, address, city] = value.split("#");
    const districtAndVillage = address.match(
      /(?:Kel\.|Ds\.)\s+((?:\S+\s+){0,4}\S+).*Kec\.\s+((?:\S+\s+){0,4}\S+)/
    );

    if (districtAndVillage) {
      return {
        zipCode: Number(zipCode),
        district: districtAndVillage[2],
        village: districtAndVillage[1],
        city,
        origin: value,
      };
    }

    return null; // Return null if the match fails
  }

  export function formatCurrency(
    value: number | bigint | string | readonly string[],
    locale = "id-ID",
    currency = "IDR",
    digit = 0
  ) {
    if (!value) return "";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0, // IDR typically doesn't use decimal places
      maximumFractionDigits: digit,
    }).format(Number(value));
  }

  /**
   * Converts grams to kilograms.
   *
   * @param {number} grams - The weight in grams.
   * @returns {string} - The weight in kilograms.
   */
  export function convertGramsToKilograms(grams: number): string {
    if (!grams) {
      return "-";
    }

    const resultKg = grams / 1000;
    return `${Math.ceil(resultKg)} Kg`;
  }


  export function getMerchantUserId(): string {
    try {
      const userRaw = sessionStorage.getItem("data-user");
      const user = userRaw ? JSON.parse(userRaw) : null;
      const merchantUserId = user?.id || "";
      
      return merchantUserId || "";
    } catch {
      return "";
    }
  }

  export const storage = createJSONStorage(() => sessionStorage);



  export const resetNewShipmentAtoms = (set: Setter) => {
    // Reset state atoms
    set(currentStepAtom, "sender");
    

    localStorage.removeItem("sender-address");
    localStorage.removeItem("receiver-address");
    localStorage.removeItem("order-payload"); 
  };


  export const splitAddressNotes = (raw?: string) => {
    const parts = (raw ?? "").split("\n").map((s) => s.trim());
    return {
      main: parts[0] ?? "",
      noteLabel: parts[1] ?? "",
      courierNote: parts[2] ?? "",
    };
  };

  export const composeAddressNotes = (main: string, noteLabel: string, courierNote: string) =>
    [main ?? "", noteLabel ?? "", courierNote ?? ""].join("\n");


  export function mapApiItemToAddressData(a: AddressApiItem): AddressData {
    return {
      customerName: a.customerName ?? "",
      email: a.email ? a.email : null,
      phone: a.phone ?? "",
      address: a.address ?? "",
      villageId: a.villageId || null,
      villageName: a.villageName ?? "",
      districtId: a.districtId || null,
      districtName: a.districtName ?? "",
      cityId: a.cityId || null,
      cityName: a.cityName ?? "",
      provinceId: a.provinceId || null,
      provinceName: a.provinceName || null,
      zipCode: Number(a.zipCode || 0),     // <- konversi aman
      longitude: a.longitude ?? "",
      latitude: a.latitude ?? "",
    };
  }



  /** Map step to your API’s addressType */
export const addressTypeFor = (who: "sender" | "receiver") => {
  // Follow your existing usage: sender -> "02", receiver -> "03"
  return who === "sender"
    ? { id: "02", name: "Sender Location" }
    : { id: "03", name: "Receiver Location" };
};

/** Build the API body for /address/create from AddressData + flags */
export const buildAddressCreateBody = (opts: {
  who: "sender" | "receiver";
  merchantUserId: string;
  data: AddressData;
  isFavorite: boolean;
}) => {
  const { id, name } = addressTypeFor(opts.who);
  const a = opts.data;
  return {
    merchantUserId: opts.merchantUserId,
    customerName: a.customerName || "",
    email: a.email,                          // null allowed by your API
    phone: a.phone || "",
    addressTypeId: id as "02" | "03",
    addressTypeName: name,
    address: a.address || "",                // already "main\nlabel\ncourierNote"
    villageId: a.villageId,
    villageName: a.villageName || "",
    districtId: a.districtId,
    districtName: a.districtName || "",
    cityId: a.cityId,
    cityName: a.cityName || "",
    provinceId: a.provinceId,
    provinceName: a.provinceName || "",
    countryId: null,                         // adjust if you have it
    countryName: "indonesia",                // or ""
    zipCode: String(a.zipCode || ""),
    longitude: a.longitude || "",
    latitude: a.latitude || "",
    isFavorite: !!opts.isFavorite,
  };
};