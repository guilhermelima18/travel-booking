/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getTripsReservationsByUser } from "@/services/trips";
import { TripReservationItem } from "./components/trip-reservation-item";

export default async function MyTrips() {
  const user = await getServerSession(authOptions);

  if (!user) {
    return redirect("/");
  }

  const tripsReservations = await getTripsReservationsByUser({
    userId: (user?.user as any).id,
  });

  if (!tripsReservations) return;

  console.log(tripsReservations);

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-semibold text-gray-900 text-xl">Minhas viagens</h1>

      {tripsReservations.map((reservation) => (
        <TripReservationItem
          key={reservation.id}
          reservation={reservation}
          trip={reservation.trip}
        />
      ))}
    </div>
  );
}
