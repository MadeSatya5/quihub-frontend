"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetQuizById } from "../hooks/useGetQuizById";
import Typography from "@/components/ui/Typography";
import { useEffect, useState } from "react";
import Image from "next/image";
import MainLayout from "@/components/layouts/Layout";
import { useSubmitQuizMutation } from "../hooks/useSubmitQuizMutation";
import { MoonLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Soal() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";

  const [isActiveNavigation, setIsActiveNavigation] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const { data, isLoading } = useGetQuizById(id);

  const { mutate } = useSubmitQuizMutation();

  // Logic Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Formatter Timer
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <MoonLoader />
      </div>
    );

  if (!data)
    return <div className="text-center text-black mt-20">Quiz not found</div>;

  const currentQuestion = data?.[currentQuestionIndex];
  const totalQuestions = data?.length;

  if (isLoading)
    return <div className="text-center text-black mt-20">Loading...</div>;

  function handleSubmit() {
    if (!data) return;

    let benar = 0;
    let score = 0;

    data.forEach((question, index) => {
      const jawabanUser = answers[index];

      // Cari jawaban yang benar
      const jawabanBenar = question.opsi.find((opsi) => opsi.value === true);

      if (jawabanUser === jawabanBenar?.text) {
        benar++;
      }
    });
    score = (benar / totalQuestions) * 100;

    // Kirim ke Backend
    mutate({
      id_subject: id,
      score: score,
    });
    router.push(`/soal/${id}/result?score=${score}`);
  }

  return (
    <MainLayout withNavbar={true} withFooter={false} classname="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between gap-x-6 px-6">
        {/* Nomer Soal */}
        <section className="p-6 mt-10 bg-white rounded-2xl shadow-lg text-black h-fit w-full md:w-1/4">
          <Typography variant="p" className="text-start">
            Soal No. <strong>{currentQuestionIndex + 1}</strong>
          </Typography>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (Object.keys(answers).length / totalQuestions) * 100
                }%`,
              }}
            ></div>
          </div>
          {/* Timer */}
          <div className="mt-4">
            <Typography variant="p" className="mb-1">
              Sisa Waktu:{" "}
            </Typography>
            <Typography variant="p" weight="bold">
              {formatTime(timeLeft)}
            </Typography>
          </div>
        </section>

        <section className="p-6 mt-10 bg-white rounded-2xl shadow-lg w-full md:w-2/4">
          {/* Soal */}
          <div className="mb-6">
            <Typography
              variant="p"
              weight="semibold"
              className="bg-gray-100 text-black p-4 rounded-md text-sm font-mono mb-4"
            >
              {currentQuestion.judul_soal}
            </Typography>

            {/* Jika Soal ada Gambar */}
            {currentQuestion.src && (
              <div className="text-black mb-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${currentQuestion.src}`}
                  alt="Gambar soal"
                  width={300}
                  height={300}
                />
              </div>
            )}

            {/* Pilihan jawaban */}
            <div className="space-y-3">
              {currentQuestion.opsi.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option.text}
                    checked={answers[currentQuestionIndex] === option.text}
                    className="accent-blue-500"
                    onChange={() => {
                      console.log(option.value);
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestionIndex]: option.text,
                      }));
                    }}
                  />
                  <span className="text-black">{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/*Button Navigasi soal */}
          <div className="flex justify-between items-center mt-8">
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 disabled:invisible"
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Sebelumnya
            </button>

            <button
              className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 disabled:invisible"
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              disabled={currentQuestionIndex === totalQuestions - 1}
            >
              Selanjutnya
            </button>
          </div>

          {/* Tombol submit */}
          {currentQuestionIndex === totalQuestions - 1 && (
            <div className="text-center mt-10">
              <button
                className="bg-main-black text-white px-6 py-2 rounded-lg hover:bg-neutral-800"
                onClick={handleSubmit}
              >
                Kumpulkan Jawaban
              </button>
            </div>
          )}
        </section>


        {/* Toggle Navigasi Nomor Soal Mobile */}
        <div className="flex">
          <button
            className={`
              fixed md:hidden right-0 top-1/2 -translate-y-1/2 bg-main-black h-9 w-6 rounded-l-full flex items-center justify-center z-50
              transform transition-transform duration-300 ease-in-out
              ${isActiveNavigation ? '-translate-x-[75vw]' : 'translate-x-0'}
            `}
            onClick={() => setIsActiveNavigation((prev) => !prev)}
          >
            {isActiveNavigation ? <ChevronRight /> : <ChevronLeft />}
          </button>

          {/* Navigasi Nomor Soal Mobile */}
          <section
            className={`
            fixed top-1/2 right-0 p-6 bg-white rounded-l-2xl shadow-lg text-black h-fit w-3/4 z-40
            transform transition-transform duration-300 ease-in-out -translate-y-1/2 border border-main-black
            ${isActiveNavigation ? "translate-x-0" : "translate-x-full"}
          `}
          >
            <Typography variant="p" className="text-center" weight="bold">
              Navigasi Soal
            </Typography>
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.from({ length: totalQuestions }, (_, index) => (
                <button
                  key={index}
                  className={`h-7 w-7 rounded-sm text-white text-sm hover:underline ${
                    index === currentQuestionIndex
                      ? "bg-blue-800"
                      : answers[index]
                      ? "bg-blue-600"
                      : "bg-gray-400"
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/*Navigasi Nomor Soal Desktop*/}
        <section className="hidden md:block p-6 mt-10 bg-white rounded-2xl shadow-lg text-black h-fit w-1/4">
          <Typography variant="p" className="text-center" weight="bold">
            Navigasi Soal
          </Typography>
          <div className="flex flex-wrap gap-2 mt-4">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <button
                key={index}
                className={`h-7 w-7 rounded-sm text-white text-sm hover:underline ${
                  index === currentQuestionIndex
                    ? "bg-blue-800"
                    : answers[index]
                    ? "bg-blue-600"
                    : "bg-gray-400"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Soal;
