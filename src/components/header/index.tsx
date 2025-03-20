"use client";

import { useCallback } from "react";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";

export function Header() {
  const { data, status } = useSession();

  const handleSignIn = useCallback(async () => {
    await signIn("google");
  }, []);

  return (
    <header className="container mx-auto flex justify-end p-5">
      {status === "unauthenticated" && (
        <button
          className="bg-purple-600 text-sm text-white p-2 rounded-md"
          onClick={handleSignIn}
        >
          Login
        </button>
      )}

      {status === "authenticated" && (
        <div className="flex items-center border border-gray-300 p-2 rounded-md gap-4">
          <AiOutlineMenu size={18} />

          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={data.user?.image || ""}
            alt={data.user?.name || ""}
          />
        </div>
      )}
    </header>
  );
}
