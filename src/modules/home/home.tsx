import BoxArrow from "@/assets/icon/box-arrow.png";
import Box from "@/assets/icon/box.png";
import Pin from "@/assets/icon/pin.png";
import Pattern from "@/assets/pattern1.png";
import PosAjaLogo from "@/assets/posaja.png";
import Banner from "@/assets/banner1212.jpg";
import { initialPhoneNumberAtom } from "@/atom/global-atom";
import HomeLayout from "@/components/layout/home-layout";
import Loader from "@/components/layout/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchApi } from "@/lib/utils";
import type { ResponseCheckUser } from "@/types/types";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { RESET } from "jotai/utils";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { dataUserAtomWithStorage } from "../../atom/home-atom";

const DATA_MENU = [
  {
    name: "Buat Kiriman",
    icon: Box,
    href: "/new-shipment",
    description:
      "Siap kirim paket? Pesan pengiriman sekarang dan dapatkan harga terbaik!",
  },
  {
    name: "Cek Tarif",
    icon: Box,
    href: "/check-rate",
    description:
      "Sebelum kirim paket? Cek tarif terlebih dahulu dan dapatkan harga terbaik!",
  },
  {
    name: "Kiriman Anda",
    icon: BoxArrow,
    href: "/history",
    description: "Lihat semua riwayat pengiriman Anda, mudah dan praktis.",
  },
  {
    name: "Lacak Kiriman",
    icon: Pin,
    href: "/tracking",
    description: "Pantau perjalanan paket Anda, setiap langkahnya!",
  },
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const setPhoneNumber = useSetAtom(initialPhoneNumberAtom);
  const customerParams =
    searchParams.get("custParams") ||
    searchParams.get("custparams") ||
    searchParams.get("custParam") ||
    searchParams.get("custparam");

  const [user, setUser] = useAtom(dataUserAtomWithStorage);
  // const [step, setStep] = useAtom(stepAtom)

  const { isLoading } = useQuery({
    queryKey: ["userCheck", customerParams],
    queryFn: customerParams
      ? async () => {
          const res = await fetchApi<ResponseCheckUser>(
            `user/check/${customerParams}`,
            {
              method: "get",
            },
          );

          sessionStorage.setItem("customerParams", customerParams);

          if (res.code === "000") {
            setUser(res.data);
            setSearchParams({ custParams: customerParams });
          }

          if (res.code === "002") {
            setUser(RESET);
            setPhoneNumber(res.data.phoneNumber as string);
            navigate("/register");
          }

          return res;
        }
      : skipToken,
    staleTime: 5000,
  });

  return (
    <HomeLayout>
      {(isLoading || !user.name) && <Loader />}
      <img
        src={Pattern}
        alt="pattern"
        className="absolute top-0 left-0 mx-auto h-auto object-contain"
      />
      <div className="relative z-10 w-full p-3">
        <img
          src={PosAjaLogo}
          alt="pattern"
          className="h-16 w-fit object-contain"
        />
        <div className="mt-6 space-y-3 text-start">
          {user.name && !isLoading ? (
            <p className="text-2xl">Hello {user.name}</p>
          ) : (
            <div className="h-8 w-full max-w-48 animate-pulse rounded-md bg-gray-300" />
          )}
          <h3 className="font-bold text-3xl">Ayo Kirim & Lacak</h3>
        </div>
        <div>
          <div className="mt-10 flex items-end justify-between gap-2">
            <p className="font-semibold text-sm">Highlights</p>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl">
            <img src={Banner} alt="banner" className="h-auto w-full" />
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-around gap-3">
          {DATA_MENU.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex h-32 items-center gap-3 rounded-xl border bg-white p-3 text-start shadow-lg hover:bg-gray-100"
            >
              <img
                src={item.icon}
                alt="icon"
                className="h-16 w-1/4 shrink-0 object-contain"
              />
              <div>
                <p className="font-roboto font-semibold text-lg">{item.name}</p>
                <p className="text-sm leading-6">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-start font-semibold text-lg">
                Artikel Terkait
              </CardTitle>
            </CardHeader>
            <CardContent className="text-start">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <Link to="/terms-and-conditions">
                    Syarat & Ketentuan Layanan
                  </Link>
                  <ChevronRight className="text-gray-400" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Link to="/pdp">Kebijakan Privasi</Link>
                  <ChevronRight className="text-gray-400" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Link to="/customer-care">Bantuan & Informasi</Link>
                  <ChevronRight className="text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </HomeLayout>
  );
}
