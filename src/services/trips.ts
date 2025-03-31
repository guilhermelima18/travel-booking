import { prisma } from "@/lib/prisma";

export async function getTrips() {
  try {
    const trips = await prisma.trip.findMany();

    return trips;
  } catch (error) {
    console.log(error);
  }
}

export async function getTripByID({ tripId }: { tripId: string }) {
  try {
    const trip = await prisma.trip.findFirst({
      where: {
        id: tripId,
      },
    });

    return trip;
  } catch (error) {
    console.log(error);
  }
}
