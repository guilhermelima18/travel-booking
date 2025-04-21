"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Trip } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactCountryFlag from "react-country-flag";

import Button from "@/components/button";

import { convertDateWithoutUTC, formatPrice } from "@/helpers/functions";

export default function TripCheckout({
  params,
}: {
  params: { tripId: string };
}) {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();

  const getTripById = useCallback(
    async ({
      tripId,
      startDate,
      endDate,
    }: {
      tripId: string;
      startDate: string;
      endDate: string;
    }) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/trips/check-trip-reservation-is-available`,
          {
            method: "POST",
            body: Buffer.from(
              JSON.stringify({
                tripId: tripId,
                startDate: convertDateWithoutUTC(startDate as string),
                endDate: convertDateWithoutUTC(endDate as string),
              })
            ),
          }
        );
        const responseJSON = await response.json();

        if (responseJSON?.error) {
          return router.push("/");
        }

        if (responseJSON.success) {
          setTrip(responseJSON.trip);
          setTotalPrice(responseJSON.totalPrice);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [router]
  );

  useEffect(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (status === "unauthenticated") {
      return router.push("/");
    }

    if (params.tripId && status === "authenticated") {
      getTripById({
        tripId: params.tripId,
        startDate: convertDateWithoutUTC(startDate as string),
        endDate: convertDateWithoutUTC(endDate as string),
      });
    }
  }, [params, router, searchParams, status, getTripById]);

  if (!trip) return;

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = searchParams.get("guests");

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-semibold text-xl text-gray-900">Sua viagem</h1>

      <div className="flex flex-col border border-gray-200 p-4 mt-4 shadow-lg rounded-lg">
        <div className="flex items-center gap-4 border-b border-b-gray-200 pb-4">
          <div className="relative w-[124px] h-[106px]">
            <Image
              src={trip.coverImage}
              alt={trip.name}
              fill
              className="rounded-lg"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-gray-900 font-semibold">{trip.name}</h2>

            <div className="flex items-center gap-2">
              <ReactCountryFlag countryCode={trip?.countryCode} svg />
              <p className="text-xs text-gray-800 underline">
                {trip?.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-gray-900 mt-3">
          Informações sobre o preço
        </h3>

        <div className="flex justify-between mt-2">
          <p className="text-gray-900">Total:</p>
          <p className="font-medium text-gray-900">{formatPrice(totalPrice)}</p>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <h3 className="font-semibold">Data</h3>
        <div className="flex gap-2">
          <p>
            {format(startDate!, "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
          -
          <p>
            {format(endDate!, "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <h3 className="font-semibold">Hóspedes</h3>
        <div className="flex gap-2">
          <p>{guests} hóspedes</p>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <Button>Finalizar compra</Button>
      </div>
    </div>
  );
}
