import Image from "next/image";
import { Trip, TripReservation } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";

import { formatPrice } from "@/helpers/functions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Button from "@/components/button";

type TripReservationItemProps = {
  reservation: TripReservation;
  trip: Trip;
};

export function TripReservationItem({
  reservation,
  trip,
}: TripReservationItemProps) {
  return (
    <div className="flex flex-col">
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

        <div className="flex flex-col mt-4 border-b border-b-gray-200 pb-4">
          <h3 className="font-semibold">Data</h3>
          <div className="flex gap-2">
            <p>
              {format(reservation.startDate, "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
            -
            <p>
              {format(reservation.endDate, "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-4 border-b border-b-gray-200 pb-4">
          <h3 className="font-semibold">Hóspedes</h3>
          <div className="flex gap-2">
            <p>{reservation.guests} hóspedes</p>
          </div>
        </div>

        <h3 className="font-semibold text-lg text-gray-900 mt-3">
          Informações sobre o preço
        </h3>

        <div className="flex justify-between mt-2 border-b border-b-gray-200 pb-4">
          <p className="text-gray-900">Total:</p>
          <p className="font-medium text-gray-900">
            {formatPrice(Number(reservation?.totalPaid))}
          </p>
        </div>

        <div className="w-full flex mt-4">
          <Button variant="danger" className="w-full">
            Cancelar viagem
          </Button>
        </div>
      </div>
    </div>
  );
}
