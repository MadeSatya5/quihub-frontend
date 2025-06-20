"use client";

import { useGetLeaderboard } from "@/app/soal/[id]/result/hooks/useGetLeaderboard";
import MainLayout from "@/components/layouts/Layout";
import Typography from "@/components/ui/Typography";
import { getUser } from "@/lib/cookies";
import { useParams } from "next/navigation";
import { MoonLoader } from "react-spinners";

function LeaderboardList() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { data, isLoading } = useGetLeaderboard(id);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MoonLoader />
      </div>
    );

  const getMyName = getUser();

  return (
    <MainLayout withNavbar withFooter={false} classname="min-h-screen">
      {/* Leaderboard */}
      <div className="px-3">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 mx-auto flex flex-col mt-24">
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
                <div className="text-sm sm:text-base md:text-lg text-gray-800 flex items-center gap-3 ">
                  <Typography
                    variant="p"
                    weight="bold"
                    className=" text-white text-center bg-main-black rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center "
                  >
                    {index + 1}
                  </Typography>
                  <div className="text-sm sm:text-base text-gray-800 break-words max-w-[180px] sm:max-w-none">
                    {data[index].email === getMyName ? (
                      <>
                        {data[index].email}{" "}
                        <span className="text-xs sm:text-sm">(Anda)</span>
                      </>
                    ) : (
                      data[index].email
                    )}
                  </div>
                </div>
                <span className="text-sm sm:text-base md:text-lg text-black">
                  {data[index].score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default LeaderboardList;
