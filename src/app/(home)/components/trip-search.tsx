"use client";

import Button from "@/components/button";
import DatePicker from "@/components/date-picker";
import Input from "@/components/input";
import CurrencyInput from "@/components/input-currency";

export function TripSearch() {
  return (
    <div className="container mx-auto p-5 flex flex-col items-center">
      <h1 className="font-semibold text-2xl">
        Encontre sua próxima <span className="text-purple-600">viagem!</span>
      </h1>

      <div className="w-full flex flex-col gap-4 mt-4">
        <Input placeholder="Onde você quer ir?" />
        <DatePicker placeholder="Data de ida" />
        <CurrencyInput placeholder="Orçamento" />

        <Button className="w-full">Buscar</Button>
      </div>
    </div>
  );
}
