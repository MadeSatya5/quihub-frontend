"use client";

import MainLayout from "@/components/layouts/Layout";
import Typography from "@/components/ui/Typography";
import { useGetAllQuiz } from "../dashboard/hooks/useGetAllQuiz";
import { MoonLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";

function Leaderboard() {
  const { data, isLoading } = useGetAllQuiz();
    console.log(data);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MoonLoader />
      </div>
    );

  return (
    <MainLayout withNavbar withFooter={false} classname="min-h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-5 mt-10">
        <Typography
          variant="h3"
          weight="bold"
          className="text-4xl text-main-black mb-6"
        >
          Pilih Mata Kuliah
        </Typography>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-10">
          {data?.map((item, index) => (
            <Link
              key={index}
              href={`/leaderboard/${item.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden w-[300px]"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.src}`}
                  alt={item.mata_kuliah}
                  fill
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <Typography
                  variant="p"
                  weight="semibold"
                  className="text-lg text-gray-800"
                >
                  {item.mata_kuliah}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Leaderboard;
