"use client";

import { Trip } from "@prisma/client";

import DatePicker from "@/components/date-picker";
import Input from "@/components/input";
import Button from "@/components/button";
import { Controller, useForm } from "react-hook-form";

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
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripReservationForm>();

  const handleCreateTripReservation = (data: CreateTripReservationForm) => {
    console.log(data);
  };

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
        <p className="font-medium text-sm text-gray-800">R$ 2.500,00</p>
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
