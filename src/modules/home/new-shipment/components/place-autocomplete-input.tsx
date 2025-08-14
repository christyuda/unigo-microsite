import { forwardRef, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

type PlaceAutocompleteInputProps = {
  value: string;
  onChange: (val: string) => void;
  onPlaceSelect: (pos: { lat: number; lng: number }) => void;
  placeholder?: string;
  countryRestriction?: string; 
  className?: string;      
};

const PlaceAutocompleteInput = forwardRef<HTMLInputElement, PlaceAutocompleteInputProps>(
  ({ value, onChange, onPlaceSelect, placeholder = "Cari lokasi...", countryRestriction }, forwardedRef) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const places = useMapsLibrary("places");
    const map = useMap();
    const acRef = useRef<google.maps.places.Autocomplete | null>(null);

    // Merge forwardedRef with local ref
    useEffect(() => {
      if (typeof forwardedRef === "function") {
        forwardedRef(inputRef.current);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = inputRef.current;
      }
    }, [forwardedRef]);

    useEffect(() => {
      if (!places || !inputRef.current) return;

      if (!acRef.current) {
        acRef.current = new places.Autocomplete(inputRef.current, {
          fields: ["geometry", "formatted_address", "name"],
          ...(countryRestriction ? { componentRestrictions: { country: [countryRestriction] } } : {}),
        });

        acRef.current.addListener("place_changed", () => {
          const place = acRef.current!.getPlace();
          if (!place?.geometry?.location) return;

          onChange(place.formatted_address ?? place.name ?? "");

          onPlaceSelect({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
        });
      }

      // Bias results to map bounds if map is loaded
      if (map && acRef.current && map.getBounds) {
        const bounds = map.getBounds();
        if (bounds) acRef.current.setBounds(bounds);
      }
    }, [places, countryRestriction, map, onChange, onPlaceSelect]);

    return (
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
      />
    );
  }
);

PlaceAutocompleteInput.displayName = "PlaceAutocompleteInput";
export default PlaceAutocompleteInput;
