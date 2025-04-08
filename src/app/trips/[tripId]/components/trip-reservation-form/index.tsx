"use client";

import { Trip } from "@prisma/client";

import DatePicker from "@/components/date-picker";
import Input from "@/components/input";
import Button from "@/components/button";

type TripReservationFormProps = {
  trip: Trip;
};

export function TripReservationForm({ trip }: TripReservationFormProps) {
  return (
    <form className="p-4">
      <div className="flex items-center gap-2">
        <DatePicker placeholder="Data início" />
        <DatePicker placeholder="Data fim" />
      </div>
      <div className="mt-2">
        <Input placeholder={`Nº de hóspedes (max: ${trip?.maxGuests})`} />
      </div>

      <div className="flex justify-between mt-4">
        <p className="font-medium text-sm text-gray-800">Total:</p>
        <p className="font-medium text-sm text-gray-800">R$ 2.500,00</p>
      </div>

      <Button className="mt-4 w-full">Reservar agora</Button>
    </form>
  );
}
