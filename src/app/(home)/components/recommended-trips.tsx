import { TripItem } from "@/components/trip-item";
import { getTrips } from "@/services/trips";

export async function RecommendedTrips() {
  const trips = await getTrips();

  return (
    <div className="container mx-auto p-5">
      <div className="w-full flex items-center gap-2">
        <span className="bg-gray-200 w-full h-[2px]" />
        <h4 className="whitespace-nowrap">Destinos recomendados</h4>
        <span className="bg-gray-200 w-full h-[2px]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {!!trips?.length &&
          trips?.length > 0 &&
          trips.map((trip) => <TripItem key={trip?.id} trip={trip} />)}
      </div>
    </div>
  );
}
