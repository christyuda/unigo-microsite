// components/pickup-address.tsx
import {
  pickupAddressDataAtom,
  senderAddressDataAtom,
  receiverAddressDataAtom,
  senderFormAtom,
  receiverFormAtom,
  emptyAddress,
  StepEnum,
  currentStepAtom,
  type AddressData,
} from "@/atom/shipments-atom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Map as GoogleMap,
  Marker,
  useMap,
  type MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { useAtom, useSetAtom } from "jotai";
import { Loader2, MapPin, Maximize2, Minimize2 } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAddressHistory } from "@/hooks/useAddressHistory";
import PlaceAutocompleteInput from "../components/place-autocomplete-input";

/* ───────── helpers ───────── */

type LatLng = { lat: number; lng: number };

type LocationDetails = {
  address: string;
  city: string;
  province: string;
  district: string;
  subdistrict: string;
  postalCode: string;
  lat: number;
  lng: number;
  label: string;

};

async function reverseGeocodeHere(
  lat: number,
  lng: number
): Promise<LocationDetails | null> {
  try {
    const apiKey = import.meta.env.VITE_HERE_MAPS;
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&lang=id-ID&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const addr = data?.items?.[0]?.address;
    const street = addr.street || "";
    const house = addr.houseNumber ? ` ${addr.houseNumber}` : "";
    const uiLabel = `${street}${house}`.trim() || addr.label || "";


    if (!addr) return null;
    return {
      address: addr.label || "",
      label: uiLabel,
      city: addr.city || "",
      province: addr.county || "",
      district: addr.district || "",
      subdistrict: addr.subdistrict || "",
      postalCode: addr.postalCode || "",
      lat,
      lng,
    };
  } catch {
    return null;
  }
}
function withHereZip(addr: string, zip?: string): string {
  if (!zip) return addr || "";
  const reIDZip = /\b\d{5}\b/;          
  if (reIDZip.test(addr)) {
    return addr.replace(reIDZip, zip);
  }
  if (addr.endsWith(zip) || addr.includes(`, ${zip}`)) return addr;
  return addr ? `${addr}, ${zip}` : zip;
}
async function reverseGeocodeGoogle(
  lat: number,
  lng: number
): Promise<{ formattedAddress: string; route?: string; streetNumber?: string } | null> {
  return new Promise((resolve) => {
    if (!('google' in window)) return resolve(null);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const r = results[0];
        const comps = r.address_components || [];
        const get = (t: string) =>
          comps.find((c) => c.types.includes(t))?.long_name || '';
        resolve({
          formattedAddress: r.formatted_address || '',
          route: get('route'),
          streetNumber: get('street_number'),
        });
      } else {
        resolve(null);
      }
    });
  });
}

async function resolveAddressHybrid(
  lat: number,
  lng: number
): Promise<LocationDetails | null> {
  const [h, g] = await Promise.all([
    reverseGeocodeHere(lat, lng),
    reverseGeocodeGoogle(lat, lng),
  ]);

  if (!h && !g) return null;

  const googleLabel = [g?.route, g?.streetNumber].filter(Boolean).join(" ").trim();
  const googleAddr = g?.formattedAddress || h?.address || "";
  const hereZip = h?.postalCode || "";
  return {
    address: withHereZip(googleAddr, hereZip), // 👈 tampilkan ZIP dari HERE
    label: googleLabel || h?.label || '',
    city: h?.city || '',
    province: h?.province || '',
    district: h?.district || '',
    subdistrict: h?.subdistrict || '',
    postalCode: h?.postalCode || '', // ← tetap dari HERE
    lat,
    lng,
  };
}


function toAddressData(d: LocationDetails): AddressData {
  return {
    ...emptyAddress(),
    address: d.address,
    villageName: d.subdistrict,
    districtName: d.district,
    cityName: d.city,
    provinceName: d.province,
    zipCode: Number(d.postalCode) || 0,
    longitude: String(d.lng),
    latitude: String(d.lat),
    shortlabel: d.label, 
  };
}

/* ───────── tiny hooks ───────── */

function useGeolocationOnce(fallback: LatLng): [LatLng, boolean] {
  const [pos, setPos] = useState<LatLng>(fallback);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    navigator.geolocation.getCurrentPosition(
      (p) => {
        if (!active) return;
        setPos({ lat: p.coords.latitude, lng: p.coords.longitude });
        setLoading(false);
      },
      () => {
        if (!active) return;
        setLoading(false);
      },
      { enableHighAccuracy: true, maximumAge: 30_000, timeout: 8_000 }
    );
    return () => {
      active = false;
    };
  }, []);
  return [pos, loading];
}

function useMapReady(): [boolean] {
  const map = useMap();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!map) return;
    
    
    setReady(false);
    const off1 = map.addListener("tilesloaded", () => setReady(true));
    const off2 = map.addListener("idle", () => setReady(true));
    return () => {
      off1.remove();
      off2.remove();
    };
  }, [map]);
  return [ready];
}

/* ───────── component ───────── */

const PickupAddress: React.FC = () => {
  const navigate = useNavigate();
  const { addhistory } = useAddressHistory();

  const [currentStep] = useAtom(currentStepAtom);
  const setPickupAddress = useSetAtom(pickupAddressDataAtom);
  const setSenderAddress = useSetAtom(senderAddressDataAtom);
  const setReceiverAddress = useSetAtom(receiverAddressDataAtom);
  const setSenderForm = useSetAtom(senderFormAtom);
  const setReceiverForm = useSetAtom(receiverFormAtom);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courierNote, setCourierNote] = useState("");
  const [markerPosition, setMarkerPosition] = useState<LatLng>({
    lat: -6.2,
    lng: 106.816666,
  });
  const [details, setDetails] = useState<LocationDetails | null>(null);
  const [addressText, setAddressText] = useState(""); 
  // posisi awal & status map
  const [initialCenter, geoLoading] = useGeolocationOnce(markerPosition);
  const [mapReady] = useMapReady();
  const map = useMap();
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // apply posisi awal -> marker & detail
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (details?.address) setAddressText(details.address);
  }, [details?.address]);
  useEffect(() => {
    setMarkerPosition(initialCenter);
    // fetch detail pertama kali
    
    (async () => {
      const d = await resolveAddressHybrid(initialCenter.lat, initialCenter.lng);
      if (d) {
        setDetails(d);
        const payload = toAddressData(d);
        setPickupAddress(payload);
        if (currentStep === StepEnum.SENDER) setSenderAddress(payload);
        else if (currentStep === StepEnum.RECEIVER) setReceiverAddress(payload);
      }
    })();
  }, [initialCenter.lat, initialCenter.lng]);

  const overallLoading = geoLoading || !mapReady;

  const panTo = useCallback(
    (pos: LatLng) => {
      map?.panTo(pos as any);
      map?.setZoom(16);
    },
    [map]
  );

  const setPosAndResolve = useCallback(
    async (pos: LatLng) => {
      setMarkerPosition(pos);
      const d = await resolveAddressHybrid(pos.lat, pos.lng);
      if (!d) return;
      setDetails(d);
      setAddressText(d.address); 
      const payload = toAddressData(d);
      setPickupAddress(payload);
      if (currentStep === StepEnum.SENDER) setSenderAddress(payload);
      else if (currentStep === StepEnum.RECEIVER) setReceiverAddress(payload);
    },
    [currentStep, setPickupAddress, setReceiverAddress, setSenderAddress]
  );

  const handleMapClick = (e: MapMouseEvent) => {
    const pos = {
      lat: e.detail.latLng?.lat || 0,
      lng: e.detail.latLng?.lng || 0,
    };
    setPosAndResolve(pos);
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setPosAndResolve(pos);
  };

  const handleSearchLocation = async () => {
    if (!searchQuery.trim()) return;
    if (!geocoderRef.current) geocoderRef.current = new google.maps.Geocoder();
    geocoderRef.current.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const loc = results[0].geometry.location;
        goTo({ lat: loc.lat(), lng: loc.lng() });  
      }
    });
  };
  const saveAddress = () => {
    if (!details) return; 
    const payload = { ...toAddressData(details), address: addressText, shortLabel: details.label,   };
  
    setPickupAddress(payload);
    if (currentStep === StepEnum.SENDER) {
      setSenderAddress(payload);
      setSenderForm((p) => ({ ...p, courierNote }));
    } else {
      setReceiverAddress(payload);
      setReceiverForm((p) => ({ ...p, courierNote }));
    }
  
    addhistory({
      id: `${Date.now()}`,
      
      customerName: "",
      phone: "",
      address: addressText,    
      label: details.label,
         
      zipCode: details.postalCode ? String(details.postalCode) : "",    
      lat: details.lat,
      lng: details.lng,
    });
  
    navigate(`/new-shipment?step=${currentStep}`);
  };
  const goTo = useCallback((pos: LatLng) => {
    // move marker + resolve HERE/Google (updates details & atoms)
    setPosAndResolve(pos);
    // center/zoom map to that marker
    panTo(pos);
  }, [panTo, setPosAndResolve]);


    return (
      <div className="w-full">
        {/* Map wrapper */}
        <div
  className={
    isFullScreen
      ? "fixed inset-0 z-[9999] m-0 h-[100dvh] min-h-[100dvh] w-[100vw] bg-white"
      : "relative mt-5 h-[360px] min-h-[360px] w-full"
  }
>
          {/* Search box */}
          <div className="absolute top-4 right-4 left-4 z-20">
            <div className="flex items-center gap-2 rounded-lg bg-white p-2 shadow">
              
              <PlaceAutocompleteInput
                value={searchQuery}
                onChange={setSearchQuery}
                onPlaceSelect={(pos) => {            // pos: { lat, lng }
                  goTo(pos);
                }}                countryRestriction="id"
                className="!h-12 rounded-[16px] px-4 text-[15px]"
              />
              <Button
                onClick={handleSearchLocation}
                className="!h-12 rounded-[16px] px-5 bg-orange-500 text-white"
              >
                Cari
              </Button>
            </div>
          </div>
    
          {/* Map + marker */}
          <div className="relative h-full w-full overflow-hidden rounded-[1em] border">
            <GoogleMap
              defaultZoom={13}
              defaultCenter={initialCenter}
              // center={markerPosition}       
              onClick={handleMapClick}
              
              streetViewControl={false}
              mapTypeControl={false}
              fullscreenControl={true}
              cameraControl={false}
              className={`absolute inset-0 transition-opacity duration-200 ${
                overallLoading ? "opacity-0" : "opacity-100"
              }`}
            />
            <Marker position={markerPosition} draggable onDragEnd={handleMarkerDragEnd} />
    
            {overallLoading && (
              <div className="pointer-events-none absolute inset-0 grid place-items-center bg-white/60 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-7 w-7 animate-spin" />
                  <span className="text-muted-foreground text-sm">Memuat peta…</span>
                </div>
              </div>
            )}
          </div>
    
          {/* Controls */}
          <div className="absolute right-4 bottom-6 z-10 flex gap-2">
            <Button
  onClick={() => { goTo(markerPosition); }}
  className="rounded-full border bg-white p-2 shadow-md"
            >
              <MapPin className="h-5 w-5 text-blue-500" />
            </Button>
            <Button
              onClick={() => setIsFullScreen((v) => !v)}
              className="rounded-full border bg-white p-2 shadow-md"
            >
              {isFullScreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>
    
        {/* Address info */}
        <div className="mt-4 w-full space-y-4 rounded-[16px] bg-white px-4 py-6">
          <div>
            <p className="font-bold text-gray-400 text-sm">ALAMAT DIPILIH</p>
            <Input
              type="text"
              value={addressText}
              onChange={(e) => {
                const address = e.target.value;
                setAddressText(address);

                setDetails(prev => (prev ? { ...prev, address } : null));

              }}
              placeholder={overallLoading ? "Mengambil alamat…" : "Tulis alamat lengkap…"}
              className="mt-2 w-full !h-14 rounded-[16px] border px-4 text-[15px] placeholder:text-[#B7B7B7]"
            />
          </div>
    
          <div>
            <Label>Catatan untuk kurir</Label>
            <Input
              placeholder="Contoh: Rumah, Kantor, Gudang..."
              value={courierNote}
              onChange={(e) => setCourierNote(e.target.value)}
              className="mt-2 w-full !h-14 rounded-[16px] border px-4 text-[15px]"
            />
          </div>
    
          <Button
            className="!h-14 w-full rounded-xl bg-orange-500 font-semibold text-lg text-white hover:bg-orange-400 disabled:opacity-50"
            onClick={saveAddress}
            disabled={overallLoading}
          >
            Simpan
          </Button>
        </div>
      </div>
    );
  }    

export default PickupAddress;
