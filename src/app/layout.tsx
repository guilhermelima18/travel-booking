import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { NextAuthProvider } from "@/providers/auth";

import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Travel Booking",
  description: "Sistema de reserva de viagens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.className} antialiased`}
        cz-shortcut-listen="true"
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
