import OnboardingImg from "@/assets/onboard-img.png";
import { initialPhoneNumberAtom } from "@/atom/global-atom";
import { dataUserAtomWithStorage } from "@/atom/home-atom";
import NavHeader from "@/components/shared/nav-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import useTitle from "@/hooks/useTitle";
import { cn, fetchApi } from "@/lib/utils";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { SmartphoneIcon, UserCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  useTitle("Aktivasi Akun");
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useAtom(dataUserAtomWithStorage);
  const [phoneNumber, setPhoneNumber] = useAtom(initialPhoneNumberAtom);
  const [name, setName] = useState<string | undefined>(dataUser.name);
  const [agree, setAgree] = useState({
    tnc: false,
    pdp: false,
  });

  useEffect(() => {
    if (!phoneNumber) {
      navigate("/");
    }
  }, [phoneNumber, navigate]);

  const inputNameHandler = (e: string) => {
    setDataUser({ ...dataUser, id: phoneNumber, name: e });
    setName(e);
  };

  const handleRegister = async () => {
    try {
      if (!name || !phoneNumber.length) {
        toast.error("Periksa kembali informasi pengguna Anda.");
        return;
      }
      const recentCustomerParams = sessionStorage.getItem("customerParams");
      const response = await fetchApi<any>("user/create", {
        method: "POST",
        body: JSON.stringify({
          name,
          phoneNumber,
        }),
      });

      if (response.code === "000" && recentCustomerParams) {
        toast.success("Selamat, akun Anda telah berhasil dibuat!");
        setPhoneNumber(RESET);
        navigate(`/?custparam=${recentCustomerParams}`);
        sessionStorage.removeItem("customerParams");
      } else if (response.code === "000") {
        navigate("/");
      } else {
        toast.error(`Terjadi kesalahan, ${response.message} atau terdaftar`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-start text-center">
      <NavHeader showLogo />
      <>
        <div className="mt-10 mb-4">
          <img
            src={OnboardingImg}
            alt="Onboarding"
            className="h-48 w-48 object-contain"
          />
        </div>
        <div className="mt-auto w-full max-w-sm space-y-2 px-6">
          <h1 className="text-center font-semibold text-3xl leading-10">
            Layanan kurir Anda belum aktif
          </h1>
          <p>
            Aktifkan sekarang untuk menikmati pengiriman yang mudah dan cepat!
          </p>
        </div>
      </>
      <Card className="mt-6 mb-auto w-full max-w-sm border-none bg-white">
        <CardContent>
          <h1 className="mt-3 text-start leading-10">Informasi Pengguna</h1>
          <form>
            <div className="my-3 flex items-center gap-2">
              <UserCircleIcon className="text-brand-500" />
              <Input
                value={name}
                // defaultValue={dataUser.name ? dataUser.name : ""}
                type="text"
                id="name"
                className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                placeholder="Nama Lengkap"
                onChange={(e) => inputNameHandler(e.target.value)}
              />
            </div>
            <div className="my-5 flex items-center gap-2">
              <SmartphoneIcon className="text-brand-500" />
              <Input
                type="text"
                id="phone"
                className="w-full rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:border-brand-500 focus-visible:ring-0"
                placeholder="Nomor Telepon"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                readOnly={!!phoneNumber}
              />
            </div>
            <div className={cn("flex flex-col gap-6", "my-10")}>
              <div className="flex items-start space-x-2">
                <Checkbox
                  className="data-[state=checked]:bg-brand-500 data-[state=checked]:text-white"
                  id="terms"
                  onCheckedChange={(e) =>
                    setAgree({ ...agree, tnc: e as boolean })
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-start font-medium text-xs"
                >
                  Setuju dengan{" "}
                  <Link to="/terms-and-conditions" className="text-brand-500">
                    Syarat & Ketentuan Layanan
                  </Link>{" "}
                  yang berlaku
                </label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  className="data-[state=checked]:bg-brand-500 data-[state=checked]:text-white"
                  id="terms2"
                  onCheckedChange={(e) =>
                    setAgree({ ...agree, pdp: e as boolean })
                  }
                />
                <label
                  htmlFor="terms2"
                  className="text-start font-medium text-xs"
                >
                  Anda dapat membaca{" "}
                  <Link to="/pdp" className="text-brand-500">
                    Kebijakan Privasi dan Persetujuan Perlindungan Data Pribadi
                  </Link>
                </label>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleRegister}
              className="w-full rounded-full bg-brand-500 text-white"
              disabled={!agree.tnc || !agree.pdp || !name?.length}
            >
              Mulai Sekarang
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
