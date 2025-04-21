import { deleteTripReservation } from "@/services/trips";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  {
    params,
  }: {
    params: { tripReservationId: string };
  }
) {
  const tripReservationId = params?.tripReservationId;

  if (!tripReservationId) {
    return NextResponse.json(
      { message: "ID da reserva não existe!" },
      { status: 404 }
    );
  }

  const trip = await deleteTripReservation({ tripReservationId });

  if (!trip) {
    return NextResponse.json(
      { message: "Reserva não encontrada!" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Reserva deletada com sucesso!" },
    { status: 200 }
  );
}
