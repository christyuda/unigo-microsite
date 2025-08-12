import PosAjaLogo from "@/assets/posaja.png";
import { ArrowLeftCircleIcon, House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useClearShipment from "@/hooks/useClearShipment";

interface NavHeaderProps {
  showLogo?: boolean;
  title?: string;
}

function NavHeader({ showLogo, title }: NavHeaderProps) {
  const navigate = useNavigate();
  const clearShipment = useClearShipment({ navigateTo: "/" });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="sticky top-0 left-0 z-50 flex h-14 w-full max-w-full items-center justify-between gap-2 border-b bg-background p-3">
        <div className="w-[32px]">
          <ArrowLeftCircleIcon
            className="cursor-pointer"
            size={24}
            onClick={handleBack}
          />
        </div>
        {showLogo && (
          <div className="w-full">
            <img
              src={PosAjaLogo}
              alt="PosAja"
              className="h-10 w-full object-contain"
            />
          </div>
        )}
        {!!title && (
          <div className="w-fit">
            <p className="font-bold text-md">{title}</p>
          </div>
        )}
        <div className="w-[32px]">
          <House
            className="cursor-pointer text-brand-500"
            onClick={clearShipment}
            size={24}
          />
        </div>
      </div>
    </>
  );
}

export default NavHeader;
