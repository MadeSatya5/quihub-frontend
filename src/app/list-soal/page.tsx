"use client";

import MainLayout from "@/components/layouts/Layout";
import ExpandableCard from "@/app/list-soal/components/ExpandableCard";

function ListSoal() {
  return (
    <MainLayout withNavbar={true} withFooter={false} classname="min-h-screen">
      <div className="page-max-width pt-20">
        <div className="flex justify-center mb-4">
            <span className="text-2xl font-bold text-black">List Soal: </span>
        </div>
        <div className="flex justify-center">
        </div>
        <div className="flex justify-center p-4">
          <ExpandableCard />
        </div>
      </div>
    </MainLayout>
  );
}

export default ListSoal;
