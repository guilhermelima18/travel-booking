/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Trip } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import ReactCountryFlag from "react-country-flag";
import { Bounce, toast } from "react-toastify";

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
  const { data, status } = useSession();

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

  const handleCheckoutReservation = useCallback(
    async ({
      tripId,
      userId,
      startDate,
      endDate,
      totalPaid,
      guests,
    }: {
      tripId: string;
      userId: string;
      startDate: string | null;
      endDate: string | null;
      totalPaid: number;
      guests: number;
    }) => {
      if (!startDate || !endDate) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/trips/checkout`,
          {
            method: "POST",
            body: Buffer.from(
              JSON.stringify({
                tripId: tripId,
                userId,
                startDate,
                endDate,
                totalPaid,
                guests,
              })
            ),
          }
        );

        const responseJSON = await response.json();

        if (responseJSON.success) {
          toast.success(`${responseJSON.message}`, {
            position: "top-right",
            autoClose: 5000,
            transition: Bounce,
          });
        } else if (responseJSON.error.code === "RESERVATION_DATE_CONFLICT") {
          toast.error(
            "Já existe uma reserva para esse usuário e essa data inicial e final.",
            {
              position: "top-right",
              autoClose: 5000,
              transition: Bounce,
            }
          );
        } else {
          toast.error("Não foi possível concluir o checkout!", {
            position: "top-right",
            autoClose: 5000,
            transition: Bounce,
          });
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push("/");
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
        <Button
          onClick={() =>
            handleCheckoutReservation({
              tripId: trip.id,
              userId: (data?.user as any)?.id,
              startDate,
              endDate,
              totalPaid: totalPrice,
              guests: Number(guests),
            })
          }
        >
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}
