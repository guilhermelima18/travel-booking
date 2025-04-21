import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { NextAuthProvider } from "@/providers/auth";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
        <NextAuthProvider>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            {children}
            <Footer />
            <ToastContainer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
