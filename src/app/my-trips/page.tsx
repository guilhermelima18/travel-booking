/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { getTripsReservationsByUser } from "@/services/trips";

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
    <div>
      <h1>Minhas viagens</h1>
    </div>
  );
}
