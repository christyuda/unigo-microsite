import HomeLayout from "@/components/layout/home-layout";
import NavHeader from "@/components/shared/nav-header";
import { Card, CardContent } from "@/components/ui/card";
import useTitle from "@/hooks/useTitle";
import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const contactData = [
  {
    icon: Phone,
    label: "Halo Pos",
    value: "Hubungi 1500161",
  },
  {
    icon: Mail,
    label: "Surel",
    value: "halopos@posindonesia.co.id",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@posindonesia.ig",
  },
  {
    icon: X,
    label: "X",
    value: "@posindonesia",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "posindonesia",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "posindonesia_Officialbot",
  },
  {
    icon: MessageCircle,
    label: "Live chat",
    value: "www.posindonesia.co.id",
  },
];

export default function ContactInfo() {
  useTitle("Bantuan & Informasi");
  return (
    <HomeLayout>
      <NavHeader title="Bantuan & Informasi" />
      <Card className="mx-auto mt-6 w-full max-w-md bg-brand-50">
        <CardContent className="p-4">
          <div className="space-y-4 overflow-hidden">
            {contactData.map((item) => (
              <div
                key={item.label}
                className="group flex items-center space-x-4 rounded-t-md border-black border-b border-dashed p-2 pb-3 text-sm transition-all duration-200 ease-linear hover:bg-brand-100"
              >
                <div className="rounded-full bg-[#495867] p-2">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="truncate text-orange-500 transition-all duration-200 ease-linear">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Link
        to="/"
        className="mt-auto mb-3 w-full rounded-full bg-brand-500 p-3 text-center text-white"
      >
        Kembali
      </Link>
    </HomeLayout>
  );
}
