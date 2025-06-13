"use client"

import { useGetLeaderboard } from "@/app/soal/[id]/result/hooks/useGetLeaderboard";
import MainLayout from "@/components/layouts/Layout";
import Typography from "@/components/ui/Typography";
import { getUser } from "@/lib/cookies";
import { useParams } from "next/navigation";

function LeaderboardList() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { data } = useGetLeaderboard(id);

  const getMyName = getUser();

  return (
    <MainLayout withNavbar withFooter={false} classname="min-h-screen">
      {/* Leaderboard */}
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
    </MainLayout>
  );
}

export default LeaderboardList;
