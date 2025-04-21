import { NextResponse } from "next/server";

import { getTripsBySearchParams } from "@/services/trips";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text") as string;

  const trips = await getTripsBySearchParams({
    text,
  });

  if (!trips) {
    return NextResponse.json(
      { message: "Viagens não encontrada!" },
      { status: 404 }
    );
  }

  return NextResponse.json(trips);
}
