import { NextResponse } from "next/server";
import { checkTripReservationIsAvailable } from "@/services/trips";
import { prisma } from "@/lib/prisma";
import { differenceInDays } from "date-fns";

export async function POST(req: Request) {
  const { tripId, startDate, endDate } = await req.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      }),
      {
        status: 400,
      }
    );
  }

  const tripReservations = await checkTripReservationIsAvailable({
    tripId,
    startDate,
    endDate,
  });

  if (tripReservations && tripReservations?.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      }),
      {
        status: 400,
      }
    );
  }

  const differenceInDaysCount = differenceInDays(endDate, startDate);
  const total = Number(trip?.pricePerDay) * differenceInDaysCount;

  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice: total,
    }),
    {
      status: 200,
    }
  );
}
