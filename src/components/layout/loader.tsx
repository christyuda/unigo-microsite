import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 z-[999] flex h-full w-full items-center justify-center bg-white/60">
      <Loader2 className="animate-spin text-brand-500" size={48} />
    </div>
  );
}
