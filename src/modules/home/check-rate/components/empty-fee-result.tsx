import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyFeeResult() {
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <NavHeader title="Pilih Jenis Layanan" />
      <div className="mt-10 mb-3 flex min-h-[85vh] w-full flex-col items-center justify-center gap-3 px-6">
        <PackageX className="text-red-500" size={120} />
        <h1 className="text-center font-roboto font-semibold text-lg leading-10">
          Layanan tidak tersedia
        </h1>
        <p className="text-center text-gray-500 text-xs">
          Wah, layanannya belum ditemukan, nih! Coba cek lagi pencarianmu, siapa
          tau ada yang kurang.
        </p>
        <div className="mt-auto w-full">
          <Button
            className="w-full rounded-full border border-brand-500 py-6 text-brand-500"
            onClick={() => navigate("/check-rate")}
          >
            Cek Tarif Baru
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
}
