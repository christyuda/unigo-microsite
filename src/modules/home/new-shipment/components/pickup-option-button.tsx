import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onFavoriteClick: () => void;
  onMapClick: () => void;
}

const PickupOptionButtons = ({ onFavoriteClick, onMapClick }: Props) => {
  return (
    <div className="flex justify-center gap-6">
      <Button
        variant="ghost"
        onClick={onFavoriteClick}
        className="flex h-[96px] w-[167px] flex-1 flex-col items-center justify-center gap-2 rounded-[16px] border-2 border-[#F76B1C] bg-white font-bold text-[#0A0A3D] shadow-none hover:bg-orange-100"
      >
        <Star className="h-6 w-6 fill-[#F76B1C] stroke-none" />
        <span className="text-sm">Alamat Favorit</span>
      </Button>

      <Button
        variant="ghost"
        onClick={onMapClick}
        className="flex h-[96px] w-[167px] flex-1 flex-col items-center justify-center gap-2 rounded-[16px] border-2 border-[#F76B1C] bg-white font-bold text-[#0A0A3D] shadow-none hover:bg-orange-100"
      >
        <MapPin className="h-6 w-6 text-[#F76B1C]" />
        <span className="text-sm">Pilih di Peta</span>
      </Button>
    </div>
  );
};

export default PickupOptionButtons;
