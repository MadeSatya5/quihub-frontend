"use client";

import MainLayout from "@/components/layouts/Layout";
import CategorySelector from "@/app/list-soal/components/CategorySelector";
import ExpandableCard from "@/app/list-soal/components/ExpandableCard";
import { Reveal } from "@/app/list-soal/components/Reveal";
import { useState } from "react";
import { useGetAllQuiz } from "../dashboard/hooks/useGetAllQuiz";

function ListSoal() {
  const { data } = useGetAllQuiz();

  const categories = data?.map((item) => item.mata_kuliah) ?? [];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <MainLayout withNavbar={true} withFooter={false} classname="min-h-screen">
      <div className="page-max-width pt-20">
        <div className="flex justify-center">
          <Reveal delay={0.15}>
            <span className="text-2xl font-bold text-black">Kategori: </span>
          </Reveal>
        </div>
        <div className="flex mb-5 mt-5 md:justify-center overflow-x-scroll hide-scrollbar">
          <Reveal delay={0.25}>
            <CategorySelector
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </Reveal>
        </div>
        <div className="flex justify-center">
          <ExpandableCard selectedCategories={selectedCategories} />
        </div>
      </div>
    </MainLayout>
  );
}

export default ListSoal;
