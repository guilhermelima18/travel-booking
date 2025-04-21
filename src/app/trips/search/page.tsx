"use client";

import { useCallback, useEffect, useState } from "react";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { TripItem } from "@/components/trip-item";

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const searchParams = useSearchParams();

  const text = searchParams.get("text");

  const getTripsSearch = useCallback(async ({ text }: { text: string }) => {
    try {
      const trips = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/trips/trip-search?text=${text}`
      );
      const tripsJSON = await trips.json();

      setTrips(tripsJSON);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (text) {
      getTripsSearch({
        text,
      });
    }
  }, [text, getTripsSearch]);

  if (!trips?.length) {
    return (
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="font-semibold text-xl text-center text-gray-900">
          Não encontramos nada com base
          <br />
          na sua busca.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center p-5">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="font-semibold text-xl text-gray-900">
          Viagens encontradas:
        </h1>
        <h4 className="text-gray-900 font-medium">
          Listamos as melhores viagens para você
        </h4>
      </div>

      {trips?.map((trip) => (
        <TripItem key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
