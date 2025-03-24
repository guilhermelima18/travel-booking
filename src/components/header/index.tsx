"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";

export function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { data, status } = useSession();

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
    <header className="container h-[92px] mx-auto flex items-center justify-end px-5">
      {/* <div className="relative w-[182px] h-[32px]">
        <Image src="" alt="Full Stack Week" fill />
      </div> */}

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
          className="flex items-center border border-gray-300 p-2 rounded-md gap-4 relative cursor-pointer"
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
            <div className="absolute top-16 left-0 w-full h-full bg-white rounded-full flex flex-col justify-center items-center shadow-2xl cursor-pointer">
              <button
                className="text-purple-600 text-sm font-semibold cursor-pointer"
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
