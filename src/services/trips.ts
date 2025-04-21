import { prisma } from "@/lib/prisma";

type CheckTripReservationIsAvailableParams = {
  tripId: string;
  startDate: Date;
  endDate: Date;
};

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

export async function checkTripReservationIsAvailable({
  tripId,
  startDate,
  endDate,
}: CheckTripReservationIsAvailableParams) {
  try {
    const tripReservations = await prisma.tripReservation.findMany({
      where: {
        tripId,
        startDate: {
          lte: new Date(endDate),
        },
        endDate: {
          gte: new Date(startDate),
        },
      },
    });

    return tripReservations;
  } catch (error) {
    console.log(error);
  }
}
