"use client";

import MainLayout from "@/components/layouts/Layout";
import QuizScrollItem from "@/app/dashboard/components/QuizScrollItem";
import RotatingText from "@/components/ui/RotatingText";
import Typography from "@/components/ui/Typography";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import MoonLoader from "react-spinners/MoonLoader";
import { useGetAllQuiz } from "./hooks/useGetAllQuiz";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: quizzes, isLoading } = useGetAllQuiz();

  // Filter Function
  const filteredQuizzes = useMemo(() => {
    if (!searchTerm) return quizzes;
    return quizzes?.filter((quiz) =>
      quiz.mata_kuliah.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [quizzes, searchTerm]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MoonLoader />
      </div>
    );

  return (
    <MainLayout withNavbar={true} withFooter={false} classname="min-h-screen">
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

        {/* Search Bar */}
        <div className="bg-main-black my-5 mx-5 py-3 px-10 rounded-full  md:w-[600px] lg:w-[900px] flex gap-5">
          <Search />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
        <AnimatePresence mode="wait">
          {filteredQuizzes?.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <QuizScrollItem
                id={quiz.id}
                index={index + 1}
                mata_kuliah={quiz.mata_kuliah}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${quiz.src}`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
