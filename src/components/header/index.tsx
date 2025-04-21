"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";

export function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();

  const handleSignIn = useCallback(async () => {
    await signIn("google");
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, []);

  const handleShowMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <header className="container h-[92px] mx-auto flex items-center justify-between px-5">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <h1 className="text-purple-600 font-semibold">Travel Booking</h1>
      </div>

      {status === "unauthenticated" && (
        <button
          className="bg-purple-600 flex items-center gap-1 text-sm text-white p-2 rounded-lg cursor-pointer"
          onClick={handleSignIn}
        >
          <FaSignInAlt />
          Login
        </button>
      )}

      {status === "authenticated" && (
        <div
          className="min-w-32 flex items-center justify-center border border-gray-300 py-1 rounded-md gap-4 relative cursor-pointer"
          onClick={handleShowMenu}
        >
          <AiOutlineMenu size={18} />

          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={data.user?.image || ""}
            alt={data.user?.name || ""}
          />

          {menuIsOpen && (
            <div className="absolute top-13 right-0 w-full h-full min-h-20 bg-white rounded-md flex flex-col justify-center items-center gap-2 shadow-2xl cursor-pointer">
              <button
                className="w-[300px] text-purple-600 text-sm font-semibold cursor-pointer hover:underline"
                onClick={() => router.push("/my-trips")}
              >
                Minhas viagens
              </button>

              <button
                className="text-purple-600 text-sm font-semibold cursor-pointer hover:underline"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
