import { Button } from "@/components/ui/button";

interface TabsSwitchProps {
  active: "sender" | "receiver";
  onTabChange: (tab: "sender" | "receiver") => void;
}

const TabsSwitch = ({ active, onTabChange }: TabsSwitchProps) => {
  return (
    <div className="flex w-full rounded-[16px] bg-[#F5F5F5] p-1">
      <Button
        type="button"
        variant="ghost"
        className={`h-[58px] flex-1 rounded-[12px] font-semibold text-base transition-all ${active === "sender" ? "bg-[#F76B1C] text-white" : "text-[#999999]"}`}
        onClick={() => onTabChange("sender")}
      >
        Pengirim
      </Button>

      <Button
        type="button"
        variant="ghost"
        className={`h-[58px] flex-1 rounded-[12px] font-semibold text-base transition-all ${active === "receiver" ? "bg-[#F76B1C] text-white" : "text-[#999999]"}`}
        onClick={() => onTabChange("receiver")}
      >
        Penerima
      </Button>
    </div>
  );
};

export default TabsSwitch;
