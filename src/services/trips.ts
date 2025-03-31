import { prisma } from "@/lib/prisma";

export async function getTrips() {
  try {
    const trips = await prisma.trip.findMany();

    return trips;
  } catch (error) {
    console.log(error);
  }
}
