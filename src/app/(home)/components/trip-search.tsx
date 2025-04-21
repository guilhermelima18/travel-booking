"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import Button from "@/components/button";
import Input from "@/components/input";

type TripSearchForm = {
  location: string;
};

export function TripSearch() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchForm>();

  async function handleSearchTrip(data: TripSearchForm) {
    router.push(`/trips/search?text=${data.location}`);
  }

  return (
    <form
      className="container mx-auto p-5 flex flex-col items-center"
      onSubmit={handleSubmit(handleSearchTrip)}
    >
      <h1 className="font-semibold text-2xl">
        Encontre sua próxima <span className="text-purple-600">viagem!</span>
      </h1>

      <div className="w-full flex flex-col gap-4 mt-4">
        <Input
          placeholder="Onde você quer ir?"
          {...register("location", {
            required: {
              value: true,
              message: "Lugar é obrigatório.",
            },
          })}
          error={!!errors?.location?.message}
          errorMessage={errors?.location?.message}
        />

        <Button className="w-full" type="submit">
          Buscar
        </Button>
      </div>
    </form>
  );
}
