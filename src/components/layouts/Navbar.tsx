"use client";

import Link from "next/link";
import Typography from "../ui/Typography";
import { CircleUserRound, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useLogout } from "@/app/(auth)/login/hooks/useLogout";
import { useGetMe } from "@/app/(auth)/login/hooks/useGetMe";
import { MoonLoader } from "react-spinners";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isLoading } = useGetMe();

  // Get Username from Email
  const username = data?.split("@")[0] || "Guest";

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MoonLoader />
      </div>
    );

  return (
    <>
      <div className="border-t-2 border-main-black border-b-2 mt-5 w-full flex sticky top-5 bg-main-white z-50">
        <div className="bg-main-black my-5 mx-5 py-3 px-10 rounded-full w-full lg:w-2/3 flex justify-between">
          {/* LOGO */}
          <Link href="/" className="text-white text-lg font-semibold">
            <Typography variant="btn" className="text-white">
              QuiHub
            </Typography>
          </Link>

          {/* Hamburger (Mobile Only) */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* NAVBAR MENU */}
          <Link
            href="/list-soal"
            className="text-white text-lg font-semibold hidden lg:block"
          >
            <Typography variant="btn" className="text-white">
              List Soal
            </Typography>
          </Link>

          <Link
            href="/leaderboard"
            className="text-white text-lg font-semibold hidden lg:block"
          >
            <Typography variant="btn" className="text-white">
              Leaderboard
            </Typography>
          </Link>

          {/* <Link
            href="/"
            className="text-white text-lg font-semibold hidden lg:block"
          >
            <Typography variant="btn" className="text-white">
              Result
            </Typography>
          </Link> */}
        </div>

        {/* ACCOUNT INFO */}
        <div className="bg-main-black my-5 py-3 px-4 rounded-full w-fit justify-end hidden lg:flex gap-3">
          <CircleUserRound />
          <Typography
            variant="btn"
            className="text-white text-sm"
            weight="bold"
          >
            Hi, {username}!
          </Typography>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="bg-red-700 my-5 mx-5 py-3 px-10 rounded-full w-fit justify-end hidden lg:flex">
          <Link
            href="/"
            className="text-white text-lg font-semibold flex gap-3"
            onClick={useLogout}
          >
            <Typography variant="btn" className="text-white">
              Logout
            </Typography>
            <LogOut />
          </Link>
        </div>
      </div>

      {/* DROPDOWN MENU (Mobile Only) */}
      {isMenuOpen && (
        <div className="fixed left-0 right-0 flex flex-col bg-main-black text-white px-7 py-8 gap-5 rounded-2xl mx-5 mb-4 lg:hidden z-10">
          <div className="flex items-center gap-3 pt-2">
            <CircleUserRound />
            <Typography variant="btn" className="text-white" weight="bold">
              Hi, {username}!
            </Typography>
          </div>

          <Link href="/list-soal" className="text-white text-lg font-semibold">
            <Typography variant="btn" className="text-white">
              List Soal
            </Typography>
          </Link>
          <Link href="/leaderboard" className="text-white text-lg font-semibold">
            <Typography variant="btn" className="text-white">
              Leaderboard
            </Typography>
          </Link>
          

          <Link
            href="/"
            className="flex items-center gap-3 bg-red-700 px-4 py-2 rounded-full w-fit"
            onClick={useLogout}
          >
            <Typography variant="btn" className="text-white">
              Logout
            </Typography>
            <LogOut />
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
