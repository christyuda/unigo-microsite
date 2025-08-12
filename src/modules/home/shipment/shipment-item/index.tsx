// components/shipment-item.tsx
import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useTitle from "@/hooks/useTitle";
import { useAtom } from "jotai";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ⬇️ pakai atom baru langsung ke itemData
import { itemDataAtom } from "@/atom/shipments-atom";

export default function ShipmentItem() {
  useTitle("Detail Kiriman");
  const navigate = useNavigate();
  const [itemData, setItemData] = useAtom(itemDataAtom);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const saveDescriptionHandler = () => {
    const newDescription = descriptionRef.current?.value?.trim() ?? "";

    if (!newDescription.length) {
      toast.error("Deskripsi kiriman tidak boleh kosong");
      return;
    }

    setItemData((prev) => ({
      ...prev,
      description: newDescription,
    }));

    toast.success("Deskripsi kiriman berhasil disimpan");
    setTimeout(() => navigate(-1), 600);
  };

  return (
    <HomeLayout>
      <NavHeader title="Detail Kiriman" />

      <div className="mt-2 flex h-full w-full flex-col items-center gap-3">
        {/* Info bantu (opsional) */}
        <div className="grid grid-cols-4 place-items-center gap-3 border-b pb-3">
          <Label
            htmlFor="fragile"
            className="col-span-3 ml-auto text-start font-medium text-xs"
          >
            <h3 className="mb-3 font-bold text-lg">Barang pecah belah</h3>
            <p>
              Kami sarankan mengaktifkan asuransi dan tambahan kemasan untuk
              menjamin keamanan paket Anda.
            </p>
          </Label>
          <Checkbox
            className="data-[state=checked]:bg-brand-500 data-[state=checked]:text-white"
            id="fragile"
          />
        </div>

        <div className="grid grid-cols-4 place-items-center gap-3 border-b pb-3">
          <Label
            htmlFor="valuable"
            className="col-span-3 ml-auto text-start font-medium text-xs"
          >
            <h3 className="mb-3 font-bold text-lg">Barang berharga</h3>
            <p>
              Untuk barang berharga, aktifkan opsi asuransi dan gunakan kemasan
              yang sesuai.
            </p>
          </Label>
          <Checkbox
            className="data-[state=checked]:bg-brand-500 data-[state=checked]:text-white"
            id="valuable"
          />
        </div>

        <div className="grid grid-cols-4 place-items-center gap-3 border-b pb-3">
          <Label
            htmlFor="dangerous"
            className="col-span-3 ml-auto text-start font-medium text-xs"
          >
            <h3 className="mb-3 font-bold text-lg">Barang berbahaya</h3>
            <p>
              Barang berbahaya diatur ketat oleh peraturan. Pastikan konten
              kiriman mematuhi ketentuan yang berlaku.
            </p>
          </Label>
          <Checkbox
            className="data-[state=checked]:bg-brand-500 data-[state=checked]:text-white"
            id="dangerous"
          />
        </div>

        {/* Deskripsi */}
        <div className="w-full text-start">
          <h3 className="mb-3 font-roboto text-lg">Deskripsi Isi Kiriman</h3>
          <Textarea
            className="border-0 bg-brand-50 text-sm"
            placeholder="Contoh: Dokumen, Pakaian, Elektronik, dll..."
            rows={8}
            ref={descriptionRef}
            defaultValue={itemData.description}
          />
        </div>

        {/* Actions */}
        <div className="mt-auto mb-6 w-full space-y-3 text-start">
          <Button
            className="w-full rounded-full bg-brand-500 py-6 text-white"
            onClick={saveDescriptionHandler}
          >
            Simpan
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/check-rate")}
            className="w-full rounded-full border-brand-500 py-6 text-brand-500"
          >
            Ubah Dimensi Kiriman
          </Button>
        </div>
      </div>
    </HomeLayout>
  );
}
