"use client";

import MainLayout from "@/components/layouts/Layout";
import QuizScrollItem from "@/app/dashboard/components/QuizScrollItem";
import RotatingText from "@/components/ui/RotatingText";
import SearchBar from "@/components/ui/SearchBar";
import Typography from "@/components/ui/Typography";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import MoonLoader from "react-spinners/MoonLoader";
import { useGetAllQuiz } from "./hooks/useGetAllQuiz";

function Dashboard() {
  const { data: quizzes, isLoading } = useGetAllQuiz();

  return (
    <MainLayout withNavbar={true} withFooter={false} classname="min-h-screen">
      {/* Search Bar */}
      <div className="flex flex-col items-center justify-center h-full gap-5 mt-10">
        <div className="flex items-center gap-1">
          <Typography variant="h4" weight="bold" className="text-5xl">
            Qui
          </Typography>
          <RotatingText
            texts={["Hub", "Smart", "Learn"]}
            mainClassName="px-4 bg-main-black font-bold text-white overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg text-4xl"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
        <SearchBar />
      </div>

      {/* List Soal */}
      <div className="flex justify-between lg:w-[1200px] px-5 lg:mx-auto mt-10 border-b-2 border-main-black pb-4">
        <Typography variant="p">List Soal</Typography>

        <Link href="/list-soal" className="flex items-center">
          <Typography variant="p">Lihat Semua</Typography>
          <ChevronRight className="text-black" />
        </Link>
      </div>

      <div className="flex gap-5 h-[350px] w-4/5 mx-auto mt-5 overflow-x-auto">
        {isLoading && (
          <div className="flex items-center justify-center w-full h-full">
            <MoonLoader />
          </div>
        )}
        {quizzes?.map((quiz, index) => (
          <QuizScrollItem
            key={quiz.id}
            id={quiz.id}
            index={index + 1}
            mata_kuliah={quiz.mata_kuliah}
            // src={quiz.src}
          />
        ))}
      </div>
    </MainLayout>
  );
}

export default Dashboard;
