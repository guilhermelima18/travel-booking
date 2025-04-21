import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const { tripId, userId, startDate, endDate, totalPaid, guests } =
    await req.json();

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

  const existingReservation = await prisma.tripReservation.findFirst({
    where: {
      tripId,
      userId,
      AND: [
        {
          startDate: { lte: new Date(endDate) },
        },
        {
          endDate: { gte: new Date(startDate) },
        },
      ],
    },
  });

  if (existingReservation) {
    return new NextResponse(
      JSON.stringify({
        error: { code: "RESERVATION_DATE_CONFLICT" },
      }),
      { status: 400 }
    );
  }

  await prisma.tripReservation.create({
    data: {
      tripId,
      userId,
      startDate,
      endDate,
      totalPaid: new Prisma.Decimal(totalPaid),
      guests,
    },
  });

  return new NextResponse(
    JSON.stringify({
      success: true,
      message: "Reserva efetuada com sucesso!",
    }),
    {
      status: 201,
    }
  );
}
