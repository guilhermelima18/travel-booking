"use client";

import { useMemo } from "react";
import { Trip } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";

import DatePicker from "@/components/date-picker";
import Input from "@/components/input";
import Button from "@/components/button";

type TripReservationFormProps = {
  trip: Trip;
};

type CreateTripReservationForm = {
  startDate: Date | null;
  endDate: Date | null;
  guests: string;
};

export function TripReservationForm({ trip }: TripReservationFormProps) {
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripReservationForm>();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const handleCreateTripReservation = (data: CreateTripReservationForm) => {
    console.log(data);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const totalPrice = useMemo(() => {
    if (startDate && endDate) {
      const diffInMs = differenceInDays(endDate, startDate);

      return formatPrice(Number(trip?.pricePerDay) / diffInMs);
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
        onClick={handleSubmit(handleCreateTripReservation)}
      >
        Reservar agora
      </Button>
    </form>
  );
}
