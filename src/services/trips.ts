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

export async function getTripsBySearchParams({ text }: { text: string }) {
  try {
    const trips = await prisma.trip.findMany({
      where: {
        OR: [
          { name: { contains: text, mode: "insensitive" } },
          { description: { contains: text, mode: "insensitive" } },
          { location: { contains: text, mode: "insensitive" } },
        ],
      },
    });

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

export async function getTripsReservationsByUser({
  userId,
}: {
  userId: string;
}) {
  try {
    const tripsReservations = await prisma.tripReservation.findMany({
      where: {
        userId,
      },
      include: {
        trip: true,
      },
    });

    return tripsReservations;
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

export async function deleteTripReservation({
  tripReservationId,
}: {
  tripReservationId: string;
}) {
  try {
    const trip = await prisma.tripReservation.delete({
      where: {
        id: tripReservationId,
      },
    });

    return trip;
  } catch (error) {
    console.log(error);
  }
}
