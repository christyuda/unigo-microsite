// src/components/home/CreateShipmentMenuCard.tsx
import Box from "@/assets/icon/box.png";
import { Link, useNavigate } from "react-router-dom";
import useResetShipment from "@/hooks/useResetShipment";
import React from "react";

export default function CreateShipmentMenuCard() {
  const navigate = useNavigate();
  const { resetAll } = useResetShipment();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();      // stop default <Link> first
    resetAll();              // clear all shipment-related atoms
    navigate("/new-shipment");
  };

  return (
    <Link
      to="/new-shipment"
      onClick={handleClick}
      className="flex h-32 items-center gap-3 rounded-xl border bg-white p-3 text-start shadow-lg hover:bg-gray-100"
      aria-label="Buat Kiriman"
    >
      <img
        src={Box}
        alt="icon"
        className="h-16 w-1/4 shrink-0 object-contain"
      />
      <div>
        <p className="font-roboto font-semibold text-lg">Buat Kiriman</p>
        <p className="text-sm leading-6">
          Siap kirim paket? Pesan pengiriman sekarang dan dapatkan harga terbaik!
        </p>
      </div>
    </Link>
  );
}
