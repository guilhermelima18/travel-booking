import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { TripReservationForm } from "./components/trip-reservation-form";
import { getTripByID } from "@/services/trips";
import { TripDescription } from "./components/trip-description";
import { TripHighlight } from "./components/trip-highlight";
import { TripLocation } from "./components/trip-location";

export default async function Trip({ params }: { params: { tripId: string } }) {
  const { tripId } = params;
  const trip = await getTripByID({ tripId: tripId });

  if (!trip) return;

  return (
    <div className="container mx-auto">
      <div className="relative w-full h-[300px]">
        <Image
          fill
          src={trip?.coverImage}
          alt={trip?.name}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col p-4">
        <h1 className="font-semibold text-xl text-purple-600">{trip?.name}</h1>

        <div className="flex items-center gap-2">
          <ReactCountryFlag countryCode={trip?.countryCode} svg />
          <p className="text-xs text-gray-800 underline">{trip?.location}</p>
        </div>

        <p className="text-xs text-gray-800 mt-2">
          <span className="text-purple-600 font-semibold">
            R$ {trip?.pricePerDay?.toString()}
          </span>{" "}
          p/ dia
        </p>
      </div>

      <TripReservationForm trip={trip} />

      <div className="bg-gray-300 w-full h-[1px] my-4 px-4" />

      <TripDescription description={trip?.description} />
      <TripHighlight highlights={trip?.highlights} />
      <TripLocation />
    </div>
  );
}
