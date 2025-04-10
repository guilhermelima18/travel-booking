"use client";

import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-gray-100 w-full flex flex-col items-center gap-1 p-4">
      <h1
        className="text-purple-600 font-semibold text-lg cursor-pointer"
        onClick={() => router.push("/")}
      >
        Travel Booking
      </h1>
      <h4 className="text-xs">&copy; Todos os direitos reservados - 2025</h4>
    </footer>
  );
}
