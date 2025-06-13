"use client";

import MainLayout from "@/components/layouts/Layout";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useGetLeaderboard } from "./hooks/useGetLeaderboard";
import { getUser } from "@/lib/cookies";
import Typography from "@/components/ui/Typography";
import { MoonLoader } from "react-spinners";

export default function Result() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score"));
  const pathname = usePathname();

  // Ekstrak ID Soal dari URL
  const parts = pathname.split("/");

  //   contoh URL: http://localhost:3000/soal/we7agh/result?score=0
  const soalId = parts[2];

  const { data, isLoading } = useGetLeaderboard(soalId);

  const getMyName = getUser();
  //   console.log(data);
  //   console.log(soalId);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MoonLoader />
      </div>
    );

  return (
    <MainLayout withFooter={false} withNavbar>
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-20 px-4 py-12">
        {/* Skor Anda */}
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-4">Skor Anda</h1>
          <p
            className={`text-6xl font-extrabold ${
              score >= 80 ? "text-[#218438]" : "text-[#9b0000]"
            } mb-4`}
          >
            {score}
          </p>
          <p className="text-gray-600 mb-6">
            Terimakasih karena telah mengerjakan!
          </p>
          <Link
            href="/"
            className="inline-block bg-main-black text-white px-6 py-2 rounded-lg hover:bg-neutral-700 transition"
          >
            Kembali ke Dashboard
          </Link>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Leaderboard
          </h2>
          <div className="space-y-4">
            {data?.map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                  data[index].email === getMyName
                    ? "bg-[#e6f5e8] font-semibold"
                    : "bg-gray-100"
                }`}
              >
                <div className="text-lg text-gray-800 flex items-center gap-3">
                  <Typography
                    variant="p"
                    weight="bold"
                    className="text-white text-center bg-main-black rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    {index + 1}
                  </Typography>
                  {data[index].email === getMyName ? (
                    <>
                      {data[index].email} <>(Anda)</>
                    </>
                  ) : (
                    data[index].email
                  )}
                </div>
                <span className="text-lg text-black">{data[index].score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
