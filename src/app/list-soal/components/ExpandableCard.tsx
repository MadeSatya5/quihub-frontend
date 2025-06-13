"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import Typography from "@/components/ui/Typography";
import { useGetAllQuiz } from "@/app/dashboard/hooks/useGetAllQuiz";
import { useRouter } from "next/navigation";

export default function ExpandableCard() {
  const router = useRouter();
  const id = useId();

  const { data } = useGetAllQuiz();

  return (
    <ul className="max-w-2xl mx-auto w-full gap-4">
      {data?.map((quiz, index) => (
        <Reveal width="100%" delay={index * 0.35} key={index}>
          <motion.div
            layoutId={`card-${quiz.mata_kuliah}-${id}`}
            key={`card-${quiz.mata_kuliah}-${id}`}
            className="p-4 flex flex-row justify-between items-center bg-main-black hover:bg-neutral-700 rounded-xl cursor-pointer  mb-3"
            onClick={() => router.push(`/soal/${quiz.id}`)}
          >
            <div className="flex gap-4 flex-row items-center">
              <motion.div layoutId={`image-${quiz.mata_kuliah}-${id}`}>
                <Typography
                  variant="p"
                  weight="bold"
                  className="text-black text-center bg-main-white rounded-full w-10 h-10 flex items-center justify-center"
                >
                  {index + 1}
                </Typography>
              </motion.div>
              <div className="flex-1">
                <motion.h3
                  layoutId={`title-${quiz.mata_kuliah}-${id}`}
                  className="font-medium font-utendo text-neutral-800 dark:text-neutral-200 text-left text-sm md:text-lg"
                >
                  {quiz.mata_kuliah} | 15 Menit
                </motion.h3>
              </div>
            </div>
            <motion.button
              layoutId={`button-${quiz.mata_kuliah}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold font-utendo bg-main-white text-black hover:text-white-soft mt-4 md:mt-0"
            >
              Kerjakan
            </motion.button>
          </motion.div>
        </Reveal>
      ))}
    </ul>
  );
}
