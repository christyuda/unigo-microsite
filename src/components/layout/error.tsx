import { CloudLightning } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-primary">
      <CloudLightning className="h-56 w-56 text-brand-500" />
      <h1 className="text-center font-semibold text-3xl leading-10">
        Terjadi Kesalahan
      </h1>
      <p className="mb-6 text-center text-gray-500 text-sm">
        Silahkan coba lagi nanti
      </p>
      <Button
        onClick={() => navigate("/")}
        variant={"outline"}
        className="w-full max-w-md rounded-full border-brand-500 py-6 text-brand-500"
      >
        Kembali ke Halaman Utama
      </Button>
    </div>
  );
}
