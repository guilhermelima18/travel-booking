import Image from "next/image";

export function QuickSearch() {
  return (
    <div className="container mx-auto p-5 flex flex-col">
      <div className="w-full flex items-center gap-2">
        <span className="bg-gray-200 w-full h-[2px]" />
        <h4 className="min-w-40 whitespace-nowrap">Tente pesquisar por</h4>
        <span className="bg-gray-200 w-full h-[2px]" />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col items-center gap-1">
          <Image width={30} height={30} src="/hotel-icon.png" alt="Hotel" />
          <p className="text-sm text-gray-600">Hotel</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Image width={30} height={30} src="/farm-icon.png" alt="Fazenda" />
          <p className="text-sm text-gray-600">Fazenda</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Image width={30} height={30} src="/cottage-icon.png" alt="Chalé" />
          <p className="text-sm text-gray-600">Chalé</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Image width={30} height={30} src="/inn-icon.png" alt="Pousada" />
          <p className="text-sm text-gray-600">Pousada</p>
        </div>
      </div>
    </div>
  );
}
