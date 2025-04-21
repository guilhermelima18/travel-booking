"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Trip } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";

import DatePicker from "@/components/date-picker";
import Input from "@/components/input";
import Button from "@/components/button";

import { convertDateWithoutUTC, formatPrice } from "@/helpers/functions";

type TripReservationFormProps = {
  trip: Trip;
};

type CreateTripReservationForm = {
  startDate: Date | null;
  endDate: Date | null;
  guests: string;
};

export function TripReservationForm({ trip }: TripReservationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    control,
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateTripReservationForm>();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const handleCreateTripReservation = async (
    data: CreateTripReservationForm
  ) => {
    setIsLoading(true);

    const startDate = data.startDate?.toISOString();
    const endDate = data.endDate?.toISOString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/check-trip-reservation-is-available`,
      {
        method: "POST",
        body: Buffer.from(
          JSON.stringify({
            tripId: trip?.id,
            startDate: convertDateWithoutUTC(startDate as string),
            endDate: convertDateWithoutUTC(endDate as string),
          })
        ),
      }
    );

    const responseJSON = await response.json();

    if (responseJSON?.error?.code === "TRIP_ALREADY_RESERVED") {
      setIsLoading(false);

      setError("startDate", {
        type: "manual",
        message: "Essa data já está reservada.",
      });

      setError("endDate", {
        type: "manual",
        message: "Essa data já está reservada.",
      });

      return;
    }

    router.push(
      `/trips/${trip?.id}/checkout?startDate=${startDate}&endDate=${endDate}&guests=${data.guests}`
    );

    setIsLoading(false);
  };

  const totalPrice = useMemo(() => {
    if (startDate && endDate) {
      const differenceInDaysCount = differenceInDays(endDate, startDate);

      return formatPrice(Number(trip?.pricePerDay) * differenceInDaysCount);
    }

    return formatPrice(0);
  }, [startDate, endDate, trip?.pricePerDay]);

  return (
    <form className="p-4">
      <div className="flex items-center gap-2">
        <Controller
          control={control}
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              placeholder="Data início"
              selected={value}
              onChange={onChange}
              openToDate={value ?? trip?.startDate}
              minDate={trip?.startDate ? new Date(trip.startDate) : undefined}
              error={!!errors?.startDate?.message}
              errorMessage={errors?.startDate?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória",
            },
          }}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              placeholder="Data final"
              selected={value}
              onChange={onChange}
              openToDate={value ?? trip?.endDate}
              minDate={trip?.startDate ? new Date(trip.startDate) : undefined}
              maxDate={trip?.endDate ? new Date(trip.endDate) : undefined}
              error={!!errors?.endDate?.message}
              errorMessage={errors?.endDate?.message}
            />
          )}
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder={`Nº de hóspedes (max: ${trip?.maxGuests})`}
          {...register("guests", {
            required: {
              value: true,
              message: "Número de hóspedes é obrigatório",
            },
            max: {
              value: trip?.maxGuests,
              message: `Número de hóspedes não pode ser maior que ${trip?.maxGuests}`,
            },
          })}
          error={!!errors?.guests}
          errorMessage={errors?.guests?.message}
        />
      </div>

      <div className="flex justify-between mt-4">
        <p className="font-medium text-sm text-gray-800">Total:</p>
        <p className="font-medium text-sm text-gray-800">{totalPrice}</p>
      </div>

      <Button
        className="mt-4 w-full"
        disabled={isLoading}
        onClick={handleSubmit(handleCreateTripReservation)}
      >
        {isLoading ? "Aguarde..." : "Reservar agora"}
      </Button>
    </form>
  );
}
