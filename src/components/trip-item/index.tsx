"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactCountryFlag } from "react-country-flag";
import { Trip } from "@prisma/client";

type TripItemProps = {
  trip: Trip;
};

export function TripItem({ trip }: TripItemProps) {
  return (
    <Link href={`/trips/${trip?.id}`}>
      <div className="flex flex-col cursor-pointer">
        <Image
          className="rounded-md shadow-lg"
          width={350}
          height={350}
          src={trip?.coverImage}
          alt={trip?.name}
        />

        <h3 className="font-medium text-sm text-gray-800 mt-2">{trip?.name}</h3>
        <div className="flex items-center gap-2">
          <ReactCountryFlag countryCode={trip?.countryCode} svg />
          <p className="text-xs text-gray-800">{trip?.location}</p>
        </div>

        <p className="text-xs text-gray-800 mt-2">
          <span className="text-purple-600 font-semibold">
            R$ {trip?.pricePerDay?.toString()}
          </span>{" "}
          p/ dia
        </p>
      </div>
    </Link>
  );
}
